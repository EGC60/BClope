import React from 'react'

const tabs = [
  { id: 'autel', label: 'AUTEL', icon: '⚔️' },
  { id: 'coffre', label: 'COFFRE', icon: '📦' },
  { id: 'sac', label: 'SAC', icon: '🎒' },
  { id: 'heros', label: 'HÉROS', icon: '🏆' },
]

export default function TabBar({ active, onSelect }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 430,
      background: 'rgba(10,10,10,0.97)',
      borderTop: '1px solid rgba(201,168,76,0.3)',
      display: 'flex',
      zIndex: 100,
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          style={{
            flex: 1,
            padding: '10px 4px 14px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            color: active === tab.id ? '#c9a84c' : '#6b7280',
            borderTop: active === tab.id ? '2px solid #c9a84c' : '2px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span style={{
            fontSize: 9,
            fontFamily: 'Cinzel, serif',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
