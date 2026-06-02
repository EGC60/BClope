import React from 'react'
import { motion } from 'framer-motion'
import { RARITY_COLORS, SLOT_ICONS, SLOT_LABELS } from '../data/items.js'
import RarityBadge from './RarityBadge.jsx'

export default function ItemCard({ item, onKeep, onEquip }) {
  if (!item) return null
  const color = RARITY_COLORS[item.rarity] || '#9ca3af'

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: '#0f0f0f',
        border: `2px solid ${color}`,
        borderRadius: 16,
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        boxShadow: `0 0 30px ${color}40, 0 0 60px ${color}20`,
        width: '100%',
        maxWidth: 320,
      }}
    >
      <RarityBadge rarity={item.rarity} size="lg" />

      <div style={{
        width: 80,
        height: 80,
        borderRadius: 12,
        background: `${color}15`,
        border: `1px solid ${color}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
      }}>
        {SLOT_ICONS[item.slot]}
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 18,
          fontWeight: 700,
          color: color,
          marginBottom: 4,
          textShadow: `0 0 10px ${color}60`,
        }}>
          {item.name}
        </div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>
          {SLOT_LABELS[item.slot]}
        </div>
        <div style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#f5e6c8',
          marginTop: 8,
        }}>
          +{item.statValue} <span style={{ color: color }}>{item.stat}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, width: '100%', marginTop: 8 }}>
        <button
          onClick={onKeep}
          style={{
            flex: 1,
            padding: '12px 0',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 8,
            color: '#f5e6c8',
            fontFamily: 'Cinzel, serif',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          GARDER
        </button>
        <button
          onClick={onEquip}
          style={{
            flex: 1,
            padding: '12px 0',
            background: 'linear-gradient(135deg, #c9a84c, #f97316)',
            border: 'none',
            borderRadius: 8,
            color: '#0a0a0a',
            fontFamily: 'Cinzel, serif',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(201,168,76,0.4)',
          }}
        >
          ÉQUIPER
        </button>
      </div>
    </motion.div>
  )
}
