import React from 'react'
import { motion } from 'framer-motion'
import { getLevelName, getXpProgress, LEVEL_THRESHOLDS } from '../utils/xp.js'
import { QUESTS } from '../data/quests.js'

function StatCard({ label, value, icon }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(201,168,76,0.15)',
      borderRadius: 10,
      padding: '14px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}>
      <div style={{ fontSize: 20 }}>{icon}</div>
      <div style={{
        fontFamily: 'Cinzel, serif',
        fontSize: 20,
        fontWeight: 900,
        color: '#c9a84c',
        lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{ fontSize: 10, color: '#9ca3af', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}>
        {label}
      </div>
    </div>
  )
}

export default function Heros({ state, moneySaved, daysInGame, daysUnderGoal }) {
  const { xp, level, streak, bestStreak, dailyLogs, setup, quests } = state
  const levelName = getLevelName(level)
  const xpProgress = getXpProgress(xp, level)
  const nextXp = LEVEL_THRESHOLDS[Math.min(level + 1, LEVEL_THRESHOLDS.length - 1)]
  const currentXp = LEVEL_THRESHOLDS[level] || 0

  // Count total cigarettes avoided
  let totalAvoided = 0
  Object.entries(dailyLogs).forEach(([dateStr, log]) => {
    if (!setup) return
    const { cigarettesPerDay, weeklyReduction, startDate } = setup
    const start = new Date(startDate || Date.now())
    const date = new Date(dateStr)
    const daysDiff = Math.floor((date - start) / (1000 * 60 * 60 * 24))
    const weeksDiff = Math.floor(daysDiff / 7)
    const goal = Math.max(0, cigarettesPerDay - weeksDiff * (weeklyReduction || 1))
    totalAvoided += Math.max(0, goal - log.smoked)
  })

  // 14-day calendar
  const today = new Date()
  const calendarDays = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - 13 + i)
    return d
  })

  function getDayGoal(date) {
    if (!setup) return 10
    const { cigarettesPerDay, weeklyReduction, startDate } = setup
    const start = new Date(startDate || Date.now())
    const daysDiff = Math.floor((date - start) / (1000 * 60 * 60 * 24))
    const weeksDiff = Math.floor(daysDiff / 7)
    return Math.max(0, cigarettesPerDay - weeksDiff * (weeklyReduction || 1))
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '16px 16px 100px',
      background: '#0a0a0a',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        marginBottom: 20,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: 12,
        padding: 16,
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #451a03, #92400e)',
          border: '2px solid #c9a84c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          flexShrink: 0,
        }}>
          ⚔️
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 14,
            fontWeight: 700,
            color: '#c9a84c',
            letterSpacing: '0.08em',
          }}>
            CHASSEUR DE DÉMONS
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>
            Niveau {level} — {levelName}
          </div>
          <div style={{
            height: 6,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 3,
            overflow: 'hidden',
          }}>
            <motion.div
              animate={{ width: `${xpProgress * 100}%` }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #c9a84c, #f97316)',
                borderRadius: 3,
              }}
            />
          </div>
          <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2, fontFamily: 'Cinzel, serif' }}>
            {xp - currentXp} / {nextXp - currentXp} XP
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        marginBottom: 20,
      }}>
        <StatCard label="CIGS ÉVITÉES" value={totalAvoided} icon="🚭" />
        <StatCard label="ARGENT SAUVÉ" value={`${moneySaved.toFixed(2)}€`} icon="💰" />
        <StatCard label="MEILLEURE SÉRIE" value={`${bestStreak}j`} icon="🔥" />
        <StatCard label="JOURS EN JEU" value={daysInGame} icon="📅" />
      </div>

      {/* 14-day calendar */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
      }}>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 11,
          color: '#c9a84c',
          letterSpacing: '0.12em',
          marginBottom: 10,
        }}>
          ◆ 14 DERNIERS JOURS
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 4,
        }}>
          {calendarDays.map((date, i) => {
            const key = date.toISOString().slice(0, 10)
            const todayKey = today.toISOString().slice(0, 10)
            const log = dailyLogs[key]
            const goal = getDayGoal(date)
            const isFuture = key > todayKey
            const isToday = key === todayKey

            let bg = '#1f2937' // no data
            let textColor = '#6b7280'
            if (!isFuture && log) {
              if (log.smoked <= goal) {
                bg = '#14532d'
                textColor = '#86efac'
              } else {
                bg = '#7f1d1d'
                textColor = '#fca5a5'
              }
            }
            if (isFuture) { bg = '#111'; textColor = '#374151' }

            return (
              <div
                key={i}
                style={{
                  background: bg,
                  borderRadius: 6,
                  padding: '6px 2px',
                  textAlign: 'center',
                  border: isToday ? '1px solid #c9a84c' : '1px solid transparent',
                }}
              >
                <div style={{ fontSize: 9, color: textColor, fontFamily: 'Cinzel, serif' }}>
                  {date.getDate()}
                </div>
                {log && (
                  <div style={{ fontSize: 8, color: textColor, opacity: 0.8 }}>
                    {log.smoked}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: '#14532d' }} />
            <span style={{ fontSize: 9, color: '#9ca3af' }}>Objectif</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: '#7f1d1d' }} />
            <span style={{ fontSize: 9, color: '#9ca3af' }}>Dépassé</span>
          </div>
        </div>
      </div>

      {/* Quests */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: 12,
        padding: 12,
      }}>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 11,
          color: '#c9a84c',
          letterSpacing: '0.12em',
          marginBottom: 12,
        }}>
          ◆ QUÊTES
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {QUESTS.map(questDef => {
            const q = quests.find(qq => qq.id === questDef.id) || { progress: 0, completed: false }
            const progress = Math.min(q.progress || 0, questDef.target)
            const pct = Math.min(1, progress / questDef.target)
            return (
              <div key={questDef.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{
                    fontSize: 12,
                    color: q.completed ? '#c9a84c' : '#f5e6c8',
                    fontFamily: 'Cinzel, serif',
                  }}>
                    {q.completed ? '✅ ' : ''}{questDef.label}
                  </span>
                  <span style={{ fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: 8 }}>
                    {progress}/{questDef.target}
                  </span>
                </div>
                <div style={{
                  height: 5,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}>
                  <motion.div
                    animate={{ width: `${pct * 100}%` }}
                    style={{
                      height: '100%',
                      background: q.completed
                        ? 'linear-gradient(90deg, #c9a84c, #eab308)'
                        : 'linear-gradient(90deg, #3b82f6, #a855f7)',
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
