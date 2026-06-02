import { useState, useCallback } from 'react'
import { getLevel } from '../utils/xp.js'
import { QUESTS } from '../data/quests.js'

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
  equipped: { helmet: null, armor: null, weapon: null, boots: null, gloves: null, ring: null, amulet: null, shield: null },
  inventory: [],
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
    return {
      ...DEFAULT_STATE,
      ...parsed,
      quests: [...(parsed.quests || []), ...missingQuests],
      equipped: { ...DEFAULT_STATE.equipped, ...(parsed.equipped || {}) },
    }
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
    const { dailyLogs, streak, bestStreak, chestsOpened, inventory, setup } = newState
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
      if (def.type === 'itemsObtained') progress = inventory.length
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

  function openChest(item) {
    setState(prev => {
      const newInventory = [...prev.inventory, item]
      const newChests = (prev.chestsOpened || 0) + 1
      const base = {
        ...prev,
        keys: Math.max(0, prev.keys - 1),
        inventory: newInventory,
        chestsOpened: newChests,
      }
      return { ...base, quests: computeQuestProgress(base) }
    })
  }

  function equipItem(item) {
    setState(prev => {
      const newEquipped = { ...prev.equipped, [item.slot]: item }
      return { ...prev, equipped: newEquipped }
    })
  }

  function unequipSlot(slot) {
    setState(prev => {
      const newEquipped = { ...prev.equipped, [slot]: null }
      return { ...prev, equipped: newEquipped }
    })
  }

  function completeSetup(setupData) {
    setState(prev => ({
      ...prev,
      setup: setupData,
      startDate: new Date().toISOString(),
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
    equipItem,
    unequipSlot,
    completeSetup,
    resetGame,
    getDailyGoal,
  }
}
