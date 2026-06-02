import React from 'react'
import { motion } from 'framer-motion'
import HeroPortrait from '../components/HeroPortrait.jsx'
import { HEROES, RARITY_ORDER, RARITY_COLORS, RARITY_LABELS } from '../data/heroes.js'

function HeroCell({ hero, owned, isActive, onClick }) {
  const color = RARITY_COLORS[hero.rarity]
  const border = isActive ? '#c9a84c' : (owned ? color : 'rgba(255,255,255,0.08)')
  return (
    <motion.button
      whileTap={owned ? { scale: 0.93 } : {}}
      onClick={() => owned && onClick(hero.id)}
      style={{
        background: owned ? `${color}10` : 'rgba(255,255,255,0.02)',
        border: `${isActive ? 2 : 1.5}px solid ${border}`,
        borderRadius: 10,
        padding: '10px 6px 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        cursor: owned ? 'pointer' : 'default',
        minWidth: 0,
        position: 'relative',
        boxShadow: isActive
          ? '0 0 14px rgba(201,168,76,0.6)'
          : (owned ? `0 0 8px ${color}40` : 'none'),
      }}
    >
      {isActive && (
        <span style={{
          position: 'absolute',
          top: 4,
          right: 4,
          fontSize: 7,
          fontFamily: 'Cinzel, serif',
          fontWeight: 900,
          color: '#0a0a0a',
          background: '#c9a84c',
          borderRadius: 4,
          padding: '2px 4px',
          letterSpacing: '0.05em',
        }}>
          ACTIF
        </span>
      )}
      <HeroPortrait hero={hero} size={64} locked={!owned} />
      <span style={{
        fontSize: 8,
        fontFamily: 'Cinzel, serif',
        color: owned ? color : '#4b5563',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: '0.02em',
      }}>
        {owned ? hero.name : '???'}
      </span>
    </motion.button>
  )
}

export default function Sac({ state, setActiveHero }) {
  const ownedHeroes = state.ownedHeroes || []
  const activeHero = state.activeHero
  const ownedCount = ownedHeroes.length
  const totalCount = HEROES.length

  return (
    <div style={{
      height: 'calc(100dvh - 60px)',
      overflowY: 'auto',
      padding: '16px 16px 100px',
      background: '#0a0a0a',
      boxSizing: 'border-box',
    }}>
      {/* Title */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 20,
          fontWeight: 900,
          color: '#c9a84c',
          margin: 0,
          letterSpacing: '0.1em',
          textShadow: '0 0 15px rgba(201,168,76,0.4)',
        }}>
          PANTHÉON DES HÉROS
        </h2>
        <div style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'Cinzel, serif', marginTop: 4 }}>
          {ownedCount} / {totalCount} héros découverts
        </div>
      </div>

      {RARITY_ORDER.map(rarity => {
        const heroesOfRarity = HEROES.filter(h => h.rarity === rarity)
        if (heroesOfRarity.length === 0) return null
        const color = RARITY_COLORS[rarity]
        return (
          <div key={rarity} style={{ marginBottom: 18 }}>
            <div style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 11,
              fontWeight: 700,
              color,
              letterSpacing: '0.12em',
              marginBottom: 10,
              textShadow: `0 0 8px ${color}50`,
            }}>
              ◆ {RARITY_LABELS[rarity]}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
            }}>
              {heroesOfRarity.map(hero => (
                <HeroCell
                  key={hero.id}
                  hero={hero}
                  owned={ownedHeroes.includes(hero.id)}
                  isActive={activeHero === hero.id}
                  onClick={setActiveHero}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
