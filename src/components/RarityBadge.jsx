import React from 'react'
import { RARITY_COLORS, RARITY_LABELS } from '../data/items.js'

export default function RarityBadge({ rarity, size = 'sm' }) {
  const color = RARITY_COLORS[rarity] || '#9ca3af'
  const label = RARITY_LABELS[rarity] || rarity?.toUpperCase()
  const fontSize = size === 'lg' ? 13 : 10

  return (
    <span style={{
      color,
      border: `1px solid ${color}`,
      borderRadius: 4,
      padding: size === 'lg' ? '3px 10px' : '2px 6px',
      fontSize,
      fontFamily: 'Cinzel, serif',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textShadow: `0 0 8px ${color}60`,
      boxShadow: `0 0 6px ${color}30`,
    }}>
      {label}
    </span>
  )
}
