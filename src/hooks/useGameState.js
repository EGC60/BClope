import { useState, useCallback } from 'react'
import { getLevel } from '../utils/xp.js'
import { QUESTS } from '../data/quests.js'
import { rollHero } from '../utils/loot.js'
import { STARTER_HERO_ID, DUPLICATE_XP } from '../data/heroes.js'

const STORAGE_KEY = 'smokeslayer_state'

const DEFAULT_STATE = {
  setup: null,
  startDate: null,
  dailyLogs: {},
  xp: 0,
  level: 0,
  keys: 0,
  streak: 0,
  bestStreak: 0,
  ownedHeroes: [STARTER_HERO_ID],
  activeHero: STARTER_HERO_ID,
  quests: QUESTS.map(q => ({ id: q.id, completed: false, progress: 0 })),
  chestsOpened: 0,
  dailyResists: {},
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_STATE }
    const parsed = JSON.parse(raw)
    // Ensure quests array is complete
    const questIds = QUESTS.map(q => q.id)
    const existingIds = (parsed.quests || []).map(q => q.id)
    const missingQuests = QUESTS.filter(q => !existingIds.includes(q.id)).map(q => ({ id: q.id, completed: false, progress: 0 }))
    // Backward-compat: ensure hero collection fields exist
    const ownedHeroes = Array.isArray(parsed.ownedHeroes) && parsed.ownedHeroes.length > 0
      ? parsed.ownedHeroes
      : [STARTER_HERO_ID]
    const activeHero = parsed.activeHero && ownedHeroes.includes(parsed.activeHero)
      ? parsed.activeHero
      : STARTER_HERO_ID
    const merged = {
      ...DEFAULT_STATE,
      ...parsed,
      quests: [...(parsed.quests || []), ...missingQuests],
      ownedHeroes,
      activeHero,
    }
    // Drop legacy equipment fields if present
    delete merged.equipped
    delete merged.inventory
    return merged
  } catch {
    return { ...DEFAULT_STATE }
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function useGameState() {
  const [state, setStateRaw] = useState(loadState)

  const setState = useCallback((updater) => {
    setStateRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      saveState(next)
      return next
    })
  }, [])

  function getDailyGoal(dateStr) {
    if (!state.setup) return 10
    const { cigarettesPerDay, weeklyReduction, startDate } = state.setup
    if (!startDate) return cigarettesPerDay
    const start = new Date(startDate)
    const date = new Date(dateStr)
    const daysDiff = Math.floor((date - start) / (1000 * 60 * 60 * 24))
    const weeksDiff = Math.floor(daysDiff / 7)
    return Math.max(0, cigarettesPerDay - weeksDiff * weeklyReduction)
  }

  function computeStreak(logs, setup) {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      const log = logs[key]
      if (!log) {
        if (i === 0) continue // today not yet logged
        break
      }
      const goal = getDailyGoal(key)
      if (log.smoked <= goal) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  function computeQuestProgress(newState) {
    const { dailyLogs, streak, bestStreak, chestsOpened, ownedHeroes, setup } = newState
    const pricePerCig = setup ? setup.pricePerPouch / setup.cigarettesPerPouch : 0

    let daysUnderGoal = 0
    let moneySaved = 0
    Object.entries(dailyLogs).forEach(([dateStr, log]) => {
      const goal = getDailyGoalFromSetup(setup, dateStr)
      if (log.smoked <= goal) daysUnderGoal++
      const avoided = Math.max(0, goal - log.smoked)
      moneySaved += avoided * pricePerCig
    })

    return newState.quests.map(q => {
      const def = QUESTS.find(qd => qd.id === q.id)
      if (!def || q.completed) return q
      let progress = 0
      if (def.type === 'daysUnderGoal') progress = daysUnderGoal
      if (def.type === 'streak') progress = Math.max(streak, bestStreak)
      if (def.type === 'chestsOpened') progress = chestsOpened || 0
      if (def.type === 'heroesCollected') progress = (ownedHeroes || []).length
      if (def.type === 'moneySaved') progress = moneySaved
      const completed = progress >= def.target
      return { ...q, progress: Math.min(progress, def.target), completed }
    })
  }

  function getDailyGoalFromSetup(setup, dateStr) {
    if (!setup) return 10
    const { cigarettesPerDay, weeklyReduction, startDate } = setup
    if (!startDate) return cigarettesPerDay
    const start = new Date(startDate)
    const date = new Date(dateStr)
    const daysDiff = Math.floor((date - start) / (1000 * 60 * 60 * 24))
    const weeksDiff = Math.floor(daysDiff / 7)
    return Math.max(0, cigarettesPerDay - weeksDiff * (weeklyReduction || 1))
  }

  function logSmoked() {
    setState(prev => {
      const today = todayKey()
      const log = prev.dailyLogs[today] || { smoked: 0, resisted: 0 }
      const newLog = { ...log, smoked: log.smoked + 1 }
      const newXp = Math.max(0, prev.xp - 20)
      const newLevel = getLevel(newXp)
      const newLogs = { ...prev.dailyLogs, [today]: newLog }
      const newStreak = computeStreak(newLogs, prev.setup)
      const newBest = Math.max(prev.bestStreak, newStreak)
      const base = {
        ...prev,
        xp: newXp,
        level: newLevel,
        dailyLogs: newLogs,
        streak: newStreak,
        bestStreak: newBest,
      }
      return { ...base, quests: computeQuestProgress(base) }
    })
  }

  function logResisted() {
    setState(prev => {
      const today = todayKey()
      const log = prev.dailyLogs[today] || { smoked: 0, resisted: 0 }

      // Max 5 resist keys per day
      const dailyResists = prev.dailyResists || {}
      const todayResists = dailyResists[today] || 0
      const keysToAdd = todayResists < 5 ? 1 : 0

      const newLog = { ...log, resisted: log.resisted + 1 }
      const newXp = prev.xp + 50
      const newLevel = getLevel(newXp)
      const newLogs = { ...prev.dailyLogs, [today]: newLog }
      const newStreak = computeStreak(newLogs, prev.setup)
      const newBest = Math.max(prev.bestStreak, newStreak)
      const newDailyResists = { ...dailyResists, [today]: todayResists + 1 }
      const base = {
        ...prev,
        xp: newXp,
        level: newLevel,
        dailyLogs: newLogs,
        streak: newStreak,
        bestStreak: newBest,
        keys: prev.keys + keysToAdd,
        dailyResists: newDailyResists,
      }
      return { ...base, quests: computeQuestProgress(base) }
    })
  }

  function openChest() {
    if (state.keys < 1) return null

    // Roll the hero once and capture the result, then commit state.
    const hero = rollHero()
    const duplicate = state.ownedHeroes.includes(hero.id)
    const xpGained = duplicate ? (DUPLICATE_XP[hero.rarity] || 0) : 0
    const result = duplicate ? { hero, duplicate: true, xpGained } : { hero, duplicate: false }

    setState(prev => {
      const newChests = (prev.chestsOpened || 0) + 1
      let base
      if (prev.ownedHeroes.includes(hero.id)) {
        const newXp = prev.xp + xpGained
        base = {
          ...prev,
          keys: Math.max(0, prev.keys - 1),
          chestsOpened: newChests,
          xp: newXp,
          level: getLevel(newXp),
        }
      } else {
        base = {
          ...prev,
          keys: Math.max(0, prev.keys - 1),
          chestsOpened: newChests,
          ownedHeroes: [...prev.ownedHeroes, hero.id],
        }
      }
      return { ...base, quests: computeQuestProgress(base) }
    })

    return result
  }

  function setActiveHero(heroId) {
    setState(prev => {
      if (!prev.ownedHeroes.includes(heroId)) return prev
      return { ...prev, activeHero: heroId }
    })
  }

  function completeSetup(setupData) {
    setState(prev => ({
      ...prev,
      setup: setupData,
      startDate: new Date().toISOString(),
      ownedHeroes: prev.ownedHeroes && prev.ownedHeroes.length > 0 ? prev.ownedHeroes : [STARTER_HERO_ID],
      activeHero: prev.activeHero || STARTER_HERO_ID,
    }))
  }

  function resetGame() {
    localStorage.removeItem(STORAGE_KEY)
    setStateRaw({ ...DEFAULT_STATE })
  }

  // Compute derived data
  const today = todayKey()
  const todayLog = state.dailyLogs[today] || { smoked: 0, resisted: 0 }
  const todayGoal = getDailyGoal(today)

  const pricePerCig = state.setup ? state.setup.pricePerPouch / state.setup.cigarettesPerPouch : 0
  let totalAvoided = 0
  let daysUnderGoal = 0
  Object.entries(state.dailyLogs).forEach(([dateStr, log]) => {
    const goal = getDailyGoalFromSetup(state.setup, dateStr)
    const avoided = Math.max(0, goal - log.smoked)
    totalAvoided += avoided
    if (log.smoked <= goal) daysUnderGoal++
  })
  const moneySaved = totalAvoided * pricePerCig

  const daysInGame = state.startDate
    ? Math.floor((Date.now() - new Date(state.startDate)) / (1000 * 60 * 60 * 24)) + 1
    : 0

  return {
    state,
    todayLog,
    todayGoal,
    moneySaved,
    daysUnderGoal,
    daysInGame,
    logSmoked,
    logResisted,
    openChest,
    setActiveHero,
    completeSetup,
    resetGame,
    getDailyGoal,
  }
}
