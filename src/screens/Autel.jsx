import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Character from '../components/Character.jsx'
import { getLevelName, getXpProgress, LEVEL_THRESHOLDS } from '../utils/xp.js'
import { FlameIcon, KeyIcon, SmokeIcon, ResistIcon } from '../components/Icons.jsx'

export default function Autel({ state, todayLog, todayGoal, logSmoked, logResisted }) {
  const { xp, level, keys, streak, equipped } = state
  const levelName = getLevelName(level)
  const xpProgress = getXpProgress(xp, level)
  const nextXp = LEVEL_THRESHOLDS[Math.min(level + 1, LEVEL_THRESHOLDS.length - 1)]
  const currentXp = LEVEL_THRESHOLDS[level] || 0

  // Diamond icons for today's cigarettes
  const displayCount = Math.max(todayGoal, todayLog.smoked)
  const diamonds = Array.from({ length: displayCount }, (_, i) => i < todayLog.smoked)

  return (
    <div style={{
      minHeight: '100vh',
      padding: '16px 16px 100px',
      display: 'flex',
      flexDirection: 'column',
      background: '#0a0a0a',
      position: 'relative',
    }}>
      {/* Ambient background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 20%, rgba(201,168,76,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Top bar: streak + keys */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: 20,
          padding: '6px 14px',
        }}>
          <FlameIcon
            size={20}
            color="#f97316"
            className={streak > 0 ? 'flame-pulse' : ''}
            style={{ flexShrink: 0 }}
          />
          <span style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 15, color: '#f97316' }}>
            {streak}
          </span>
          <span style={{ fontSize: 10, color: '#9ca3af', fontFamily: 'Cinzel, serif' }}>JOURS</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: 20,
          padding: '6px 14px',
        }}>
          <span style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 15, color: '#c9a84c' }}>
            {keys}
          </span>
          <KeyIcon size={20} color="#c9a84c" style={{ flexShrink: 0 }} />
        </div>
      </div>

      {/* Character name & level */}
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 11,
          letterSpacing: '0.2em',
          color: '#9ca3af',
          textTransform: 'uppercase',
        }}>
          CHASSEUR DE DÉMONS
        </div>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 14,
          fontWeight: 700,
          color: '#c9a84c',
          letterSpacing: '0.1em',
          marginTop: 2,
          textShadow: '0 0 10px rgba(201,168,76,0.4)',
        }}>
          ◆ NIVEAU {level} — {levelName} ◆
        </div>
      </div>

      {/* Character SVG */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '8px 0',
        position: 'relative',
      }}>
        {/* Glow behind character */}
        <div style={{
          position: 'absolute',
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, transparent 70%)',
        }} />
        <Character equipped={equipped} />
      </div>

      {/* Cigarette diamonds */}
      <div style={{ textAlign: 'center', marginBottom: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
          {diamonds.length === 0 ? (
            <span style={{ color: '#4b5563', fontSize: 12, fontFamily: 'Cinzel, serif' }}>Pas encore fumé aujourd'hui</span>
          ) : (
            diamonds.map((smoked, i) => (
              <motion.span
                key={i}
                initial={smoked ? { scale: 1.4, opacity: 0 } : {}}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  fontSize: 18,
                  color: smoked ? '#f97316' : '#374151',
                  filter: smoked ? 'drop-shadow(0 0 4px #f97316)' : 'none',
                }}
              >
                ◆
              </motion.span>
            ))
          )}
        </div>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 12,
          color: todayLog.smoked > todayGoal ? '#dc2626' : '#9ca3af',
          letterSpacing: '0.05em',
        }}>
          {todayLog.smoked} / {todayGoal} CIGARETTES
        </div>
      </div>

      {/* XP Bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 4,
          fontSize: 10,
          color: '#9ca3af',
          fontFamily: 'Cinzel, serif',
        }}>
          <span>XP {xp - currentXp}</span>
          <span>{nextXp - currentXp}</span>
        </div>
        <div style={{
          height: 10,
          background: 'rgba(0,0,0,0.5)',
          borderRadius: 5,
          border: '1px solid rgba(201,168,76,0.25)',
          overflow: 'hidden',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #92400e, #f97316, #fbbf24)',
              borderRadius: 5,
              boxShadow: '0 0 10px rgba(249,115,22,0.6)',
            }}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={logSmoked}
          style={{
            flex: 1,
            padding: '18px 12px',
            background: 'linear-gradient(135deg, #7f1d1d, #dc2626)',
            border: '1px solid #ef4444',
            borderRadius: 12,
            color: '#fff',
            fontFamily: 'Cinzel, serif',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.5), 0 0 20px rgba(220,38,38,0.3)',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <SmokeIcon size={18} color="white" />
          J'AI FUMÉ
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={logResisted}
          style={{
            flex: 1,
            padding: '18px 12px',
            background: 'linear-gradient(135deg, #78350f, #c9a84c)',
            border: '1px solid #eab308',
            borderRadius: 12,
            color: '#0a0a0a',
            fontFamily: 'Cinzel, serif',
            fontWeight: 900,
            fontSize: 13,
            cursor: 'pointer',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.35)',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <ResistIcon size={18} color="#0a0a0a" />
          J'AI RÉSISTÉ
        </motion.button>
      </div>
    </div>
  )
}
