import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroPortrait from '../components/HeroPortrait.jsx'
import { RARITY_LABELS } from '../data/heroes.js'
import { KeyIcon } from '../components/Icons.jsx'

// Animated chest SVG
function ChestSVG({ isOpening }) {
  return (
    <svg viewBox="0 0 160 130" width="200" height="163" xmlns="http://www.w3.org/2000/svg">
      {/* Glow */}
      <ellipse cx="80" cy="118" rx="60" ry="12" fill="#f97316" opacity="0.15">
        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" />
      </ellipse>

      {/* Chest body */}
      <rect x="10" y="65" width="140" height="55" rx="8" fill="#451a03" stroke="#c9a84c" strokeWidth="2" />
      {/* Metal bands */}
      <rect x="10" y="82" width="140" height="6" fill="#92400e" opacity="0.6" />
      <rect x="55" y="65" width="50" height="55" fill="#78350f" opacity="0.3" />

      {/* Lid */}
      <motion.g
        animate={isOpening ? { rotate: -45, originX: 0.5, originY: 1 } : { rotate: 0 }}
        style={{ transformOrigin: '80px 65px' }}
      >
        <rect x="10" y="30" width="140" height="36" rx="8" fill="#7c2d12"
          stroke="#c9a84c" strokeWidth="2"
        />
        <rect x="10" y="52" width="140" height="8" fill="#92400e" opacity="0.5" />
        {/* Lid ribs */}
        <path d="M55 30 L55 66" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />
        <path d="M105 30 L105 66" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />
        {/* Curved lid top */}
        <path d="M10 42 Q80 18 150 42" fill="#92400e" opacity="0.4" />
      </motion.g>

      {/* Lock */}
      <rect x="68" y="58" width="24" height="20" rx="4" fill="#c9a84c" />
      <path d="M73 58 Q73 50 80 50 Q87 50 87 58" fill="none" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />
      <circle cx="80" cy="68" r="3" fill="#451a03" />

      {/* Corner rivets */}
      <circle cx="20" cy="75" r="4" fill="#c9a84c" opacity="0.8" />
      <circle cx="140" cy="75" r="4" fill="#c9a84c" opacity="0.8" />
      <circle cx="20" cy="110" r="4" fill="#c9a84c" opacity="0.8" />
      <circle cx="140" cy="110" r="4" fill="#c9a84c" opacity="0.8" />

      {/* Glow particles when opening */}
      {isOpening && (
        <>
          <circle cx="80" cy="40" r="3" fill="#fbbf24" opacity="0.8">
            <animate attributeName="cy" values="40;10;40" dur="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="45" r="2" fill="#f97316" opacity="0.8">
            <animate attributeName="cy" values="45;15;45" dur="1.3s" repeatCount="indefinite" />
            <animate attributeName="cx" values="60;50;60" dur="1.3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="1.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="45" r="2" fill="#a855f7" opacity="0.8">
            <animate attributeName="cy" values="45;15;45" dur="0.9s" repeatCount="indefinite" />
            <animate attributeName="cx" values="100;110;100" dur="0.9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="0.9s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  )
}

export default function Coffre({ state, openChest, setActiveHero }) {
  const { keys } = state
  const [phase, setPhase] = useState('idle') // idle | opening | reveal
  const [result, setResult] = useState(null) // { hero, duplicate, xpGained }

  function handleOpen() {
    if (keys < 1 || phase !== 'idle') return
    setPhase('opening')
    setTimeout(() => {
      const res = openChest()
      if (!res) {
        setPhase('idle')
        return
      }
      setResult(res)
      setPhase('reveal')
    }, 800)
  }

  function handleClose() {
    setResult(null)
    setPhase('idle')
  }

  function handleIncarner() {
    if (result?.hero) {
      setActiveHero(result.hero.id)
    }
    handleClose()
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '16px 16px 100px',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Ambient */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(249,115,22,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 8, width: '100%' }}>
        <h2 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 20,
          fontWeight: 900,
          color: '#c9a84c',
          margin: 0,
          letterSpacing: '0.1em',
          textShadow: '0 0 15px rgba(201,168,76,0.4)',
        }}>
          COFFRE DE LA FORGE
        </h2>
        <div style={{
          fontSize: 12,
          color: '#9ca3af',
          fontFamily: 'Cinzel, serif',
          marginTop: 4,
          letterSpacing: '0.05em',
        }}>
          {keys} CLÉ{keys !== 1 ? 'S' : ''} EN RÉSERVE
        </div>
      </div>

      {/* Chest */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        width: '100%',
      }}>
        <motion.div
          animate={phase === 'opening' ? { scale: [1, 1.15, 1], rotate: [-2, 2, -2, 0] } : {}}
          transition={{ duration: 0.8 }}
          className={keys > 0 && phase === 'idle' ? 'chest-breathe' : ''}
        >
          <ChestSVG isOpening={phase === 'opening'} />
        </motion.div>

        {/* Key icons display */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 200 }}>
          {Array.from({ length: Math.min(keys, 10) }, (_, i) => (
            <KeyIcon key={i} size={22} color="#c9a84c" />
          ))}
          {keys > 10 && <span style={{ color: '#c9a84c', fontFamily: 'Cinzel, serif', fontSize: 12 }}>+{keys - 10}</span>}
        </div>

        {/* Open button */}
        <AnimatePresence>
          {phase !== 'reveal' && (
            <motion.button
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              disabled={keys < 1 || phase === 'opening'}
              style={{
                padding: '16px 40px',
                background: keys < 1 ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #92400e, #c9a84c)',
                border: keys < 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                borderRadius: 12,
                color: keys < 1 ? '#4b5563' : '#0a0a0a',
                fontFamily: 'Cinzel, serif',
                fontWeight: 900,
                fontSize: 15,
                cursor: keys < 1 ? 'not-allowed' : 'pointer',
                boxShadow: keys >= 1 ? '0 0 20px rgba(201,168,76,0.35)' : 'none',
                letterSpacing: '0.08em',
                transition: 'all 0.3s',
              }}
            >
              {phase === 'opening' ? 'OUVERTURE...' : keys < 1 ? 'PAS DE CLÉ' : (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <KeyIcon size={18} color="#0a0a0a" />
                  OUVRIR LE COFFRE
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {keys < 1 && (
          <p style={{ color: '#6b7280', fontSize: 12, fontFamily: 'Cinzel, serif', textAlign: 'center', maxWidth: 260 }}>
            Résiste à une cigarette pour gagner une clé !
          </p>
        )}
      </div>

      {/* Reveal overlay */}
      <AnimatePresence>
        {phase === 'reveal' && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.88)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 200,
              padding: 24,
            }}
          >
            <RevealCard
              result={result}
              onIncarner={handleIncarner}
              onClose={handleClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function RevealCard({ result, onIncarner, onClose }) {
  const { hero, duplicate, xpGained } = result
  const color = hero.color || '#9ca3af'

  const darkBtn = {
    flex: 1,
    padding: '13px 0',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 8,
    color: '#f5e6c8',
    fontFamily: 'Cinzel, serif',
    fontWeight: 700,
    fontSize: 13,
    cursor: 'pointer',
    letterSpacing: '0.05em',
  }
  const goldBtn = {
    flex: 1,
    padding: '13px 0',
    background: 'linear-gradient(135deg, #c9a84c, #f97316)',
    border: 'none',
    borderRadius: 8,
    color: '#0a0a0a',
    fontFamily: 'Cinzel, serif',
    fontWeight: 900,
    fontSize: 13,
    cursor: 'pointer',
    boxShadow: '0 0 15px rgba(201,168,76,0.4)',
    letterSpacing: '0.05em',
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
      style={{
        background: 'linear-gradient(135deg, rgba(20,10,0,0.95), rgba(5,3,0,0.98))',
        border: `2px solid ${color}`,
        borderRadius: 16,
        padding: '26px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        width: '100%',
        maxWidth: 320,
        boxShadow: `0 0 30px ${color}40, 0 0 60px ${color}20`,
      }}
    >
      {/* Hero portrait */}
      <div style={{ opacity: duplicate ? 0.5 : 1 }}>
        <HeroPortrait hero={hero} size={130} />
      </div>

      {duplicate ? (
        <>
          <div style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 13,
            fontWeight: 700,
            color: '#9ca3af',
            letterSpacing: '0.1em',
          }}>
            DÉJÀ POSSÉDÉ
          </div>
          <div style={{ fontSize: 13, color: '#f5e6c8', fontFamily: 'Cinzel, serif', opacity: 0.8 }}>
            {hero.name}
          </div>
          <div style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 30,
            fontWeight: 900,
            color: '#fbbf24',
            textShadow: '0 0 18px rgba(251,191,36,0.7)',
          }}>
            +{xpGained} XP
          </div>
          <button onClick={onClose} style={{ ...goldBtn, width: '100%', flex: 'unset' }}>
            CONTINUER
          </button>
        </>
      ) : (
        <>
          <div style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 13,
            fontWeight: 700,
            color,
            letterSpacing: '0.12em',
            textShadow: `0 0 12px ${color}, 0 0 20px ${color}80`,
          }}>
            {RARITY_LABELS[hero.rarity] || hero.rarity?.toUpperCase()}
          </div>
          <div style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 18,
            fontWeight: 700,
            color,
            textAlign: 'center',
            textShadow: `0 0 10px ${color}60`,
          }}>
            {hero.name}
          </div>
          <div style={{ display: 'flex', gap: 12, width: '100%', marginTop: 4 }}>
            <button onClick={onClose} style={darkBtn}>PLUS TARD</button>
            <button onClick={onIncarner} style={goldBtn}>INCARNER</button>
          </div>
        </>
      )}
    </motion.div>
  )
}
