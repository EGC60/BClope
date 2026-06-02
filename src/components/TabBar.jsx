import React from 'react'
import { Flame, Archive, Users, BarChart3 } from 'lucide-react'

const tabs = [
  { id: 'autel', label: 'AUTEL', Icon: Flame },
  { id: 'coffre', label: 'COFFRE', Icon: Archive },
  { id: 'sac', label: 'HÉROS', Icon: Users },
  { id: 'heros', label: 'PROFIL', Icon: BarChart3 },
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
      background: 'rgba(8,6,4,0.98)',
      borderTop: '1px solid rgba(201,168,76,0.3)',
      display: 'flex',
      zIndex: 100,
      backdropFilter: 'blur(10px)',
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id
        const color = isActive ? '#c9a84c' : '#4a4a4a'
        return (
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
              gap: 3,
              color,
              borderTop: isActive ? '2px solid #c9a84c' : '2px solid transparent',
              transition: 'all 0.2s',
            }}
          >
            <tab.Icon
              size={22}
              color={color}
              style={{
                filter: isActive ? 'drop-shadow(0 0 6px #c9a84c)' : 'none',
                transition: 'filter 0.2s',
              }}
            />
            <span style={{
              fontSize: 9,
              fontFamily: 'Cinzel, serif',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
