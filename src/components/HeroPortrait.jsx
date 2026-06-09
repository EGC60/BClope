import React from 'react'
import { RARITY_COLORS } from '../data/heroes.js'

// A hooded dark-fantasy silhouette used as placeholder art for heroes
// without a custom image, and as a "locked / undiscovered" marker.
function Silhouette({ size, color, locked }) {
  const figureFill = locked ? '#080810' : '#0d0d1a'
  const outline = color || '#9ca3af'
  const outlineOpacity = locked ? 0.3 : 0.85
  const glow = locked
    ? 'none'
    : `drop-shadow(0 0 6px ${outline}) drop-shadow(0 0 14px ${outline}80)`

  return (
    <svg
      viewBox="0 0 120 150"
      width={size}
      height={size * 1.25}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: glow, display: 'block' }}
    >
      {/* Body / cloak */}
      <path
        d="M30 150 Q30 95 45 80 L75 80 Q90 95 90 150 Z"
        fill={figureFill}
        stroke={outline}
        strokeWidth="1.5"
        strokeOpacity={outlineOpacity}
      />
      {/* Shoulders */}
      <path
        d="M38 92 Q60 78 82 92 L82 110 Q60 100 38 110 Z"
        fill={figureFill}
        stroke={outline}
        strokeWidth="1"
        strokeOpacity={outlineOpacity * 0.6}
      />
      {/* Hood arc over the head */}
      <path
        d="M30 70 Q30 24 60 22 Q90 24 90 70 Q76 48 60 46 Q44 48 30 70 Z"
        fill={figureFill}
        stroke={outline}
        strokeWidth="1.5"
        strokeOpacity={outlineOpacity}
      />
      {/* Head */}
      <ellipse cx="60" cy="56" rx="22" ry="25" fill={figureFill} stroke={outline} strokeWidth="1" strokeOpacity={outlineOpacity * 0.5} />

      {locked ? (
        // Undiscovered: a question mark, no eye glow
        <text
          x="60"
          y="64"
          textAnchor="middle"
          fontFamily="Cinzel, serif"
          fontSize="26"
          fontWeight="900"
          fill={outline}
          fillOpacity="0.5"
        >
          ?
        </text>
      ) : (
        // Glowing rarity-colored eyes
        <>
          <ellipse cx="51" cy="56" rx="4" ry="5" fill={outline}>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="69" cy="56" rx="4" ry="5" fill={outline}>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
          </ellipse>
        </>
      )}
    </svg>
  )
}

export default function HeroPortrait({ hero, size = 120, locked = false }) {
  const color = hero ? (hero.color || RARITY_COLORS[hero.rarity]) : '#9ca3af'

  if (!locked && hero && hero.image) {
    const glow = `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 18px ${color}80)`
    return (
      <div style={{ width: size, height: size * 1.25, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <img
          src={`${import.meta.env.BASE_URL}heroes/${hero.image}`}
          alt={hero.name}
          style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: '100%', objectFit: 'contain', filter: glow, display: 'block' }}
        />
      </div>
    )
  }

  return <Silhouette size={size} color={color} locked={locked} />
}
