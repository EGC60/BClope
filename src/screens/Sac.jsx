import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SLOTS, SLOT_LABELS, SLOT_ICONS, RARITY_COLORS } from '../data/items.js'
import RarityBadge from '../components/RarityBadge.jsx'

function SlotCell({ slotKey, item, onClick }) {
  const color = item ? RARITY_COLORS[item.rarity] : null
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => onClick(slotKey, item)}
      style={{
        background: item ? `${color}10` : 'rgba(255,255,255,0.02)',
        border: `1.5px solid ${item ? color : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 10,
        padding: '10px 6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        cursor: 'pointer',
        minWidth: 0,
        boxShadow: item ? `0 0 8px ${color}30` : 'none',
        transition: 'all 0.2s',
      }}
    >
      <span style={{ fontSize: 22 }}>{SLOT_ICONS[slotKey]}</span>
      <span style={{
        fontSize: 8,
        fontFamily: 'Cinzel, serif',
        color: item ? color : '#4b5563',
        letterSpacing: '0.03em',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        {SLOT_LABELS[slotKey].toUpperCase()}
      </span>
      {item && (
        <span style={{ fontSize: 7, color: color, fontFamily: 'Cinzel, serif', opacity: 0.8 }}>
          +{item.statValue}
        </span>
      )}
    </motion.button>
  )
}

function InventoryItem({ item, onClick }) {
  const color = RARITY_COLORS[item.rarity]
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => onClick(item)}
      style={{
        background: `${color}10`,
        border: `1px solid ${color}50`,
        borderRadius: 8,
        padding: '8px 6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        cursor: 'pointer',
        minWidth: 0,
      }}
    >
      <span style={{ fontSize: 20 }}>{SLOT_ICONS[item.slot]}</span>
      <span style={{ fontSize: 8, color, fontFamily: 'Cinzel, serif', textAlign: 'center', lineHeight: 1.2 }}>
        {item.name.length > 12 ? item.name.slice(0, 10) + '…' : item.name}
      </span>
      <span style={{ fontSize: 7, color: '#9ca3af' }}>+{item.statValue} {item.stat}</span>
    </motion.button>
  )
}

export default function Sac({ state, equipItem, unequipSlot }) {
  const { equipped, inventory } = state
  const [modal, setModal] = useState(null) // { type: 'slot'|'item', slot?, item? }

  const equippedCount = SLOTS.filter(s => equipped[s]).length
  const unequippedInventory = inventory.filter(item => {
    const eq = equipped[item.slot]
    return !eq || eq.id !== item.id
  })

  function handleSlotClick(slotKey, item) {
    setModal({ type: 'slot', slot: slotKey, item })
  }

  function handleItemClick(item) {
    setModal({ type: 'item', item })
  }

  function handleEquipFromModal(item) {
    equipItem(item)
    setModal(null)
  }

  function handleUnequip(slot) {
    unequipSlot(slot)
    setModal(null)
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '16px 16px 100px',
      background: '#0a0a0a',
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
          SAC & ÉQUIPEMENT
        </h2>
        <div style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'Cinzel, serif', marginTop: 4 }}>
          {inventory.length} objets · {equippedCount}/8 équipés
        </div>
      </div>

      {/* Equipped section */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
      }}>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 11,
          color: '#c9a84c',
          letterSpacing: '0.12em',
          marginBottom: 10,
        }}>
          ◆ PORTÉ
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
        }}>
          {SLOTS.map(slot => (
            <SlotCell
              key={slot}
              slotKey={slot}
              item={equipped[slot]}
              onClick={handleSlotClick}
            />
          ))}
        </div>
      </div>

      {/* Inventory section */}
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
          marginBottom: 10,
        }}>
          ◆ RÉSERVE ({unequippedInventory.length})
        </div>
        {unequippedInventory.length === 0 ? (
          <div style={{ color: '#4b5563', fontSize: 12, fontFamily: 'Cinzel, serif', textAlign: 'center', padding: '16px 0' }}>
            Ouvre des coffres pour obtenir des objets !
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
            maxHeight: 300,
            overflowY: 'auto',
          }}>
            {unequippedInventory.map(item => (
              <InventoryItem key={item.id} item={item} onClick={handleItemClick} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              zIndex: 200,
              padding: '0 0 20px',
            }}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#111',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: '16px 16px 0 0',
                padding: 24,
                width: '100%',
                maxWidth: 430,
              }}
            >
              {modal.type === 'slot' && modal.item && (
                <>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: 14, color: '#c9a84c', marginBottom: 12 }}>
                    {modal.item.name}
                  </div>
                  <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>
                    +{modal.item.statValue} {modal.item.stat}
                  </div>
                  <RarityBadge rarity={modal.item.rarity} />
                  <button
                    onClick={() => handleUnequip(modal.slot)}
                    style={{
                      marginTop: 16,
                      width: '100%',
                      padding: '12px 0',
                      background: 'rgba(220,38,38,0.15)',
                      border: '1px solid rgba(220,38,38,0.4)',
                      borderRadius: 8,
                      color: '#f87171',
                      fontFamily: 'Cinzel, serif',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    DÉSÉQUIPER
                  </button>
                </>
              )}
              {modal.type === 'slot' && !modal.item && (
                <div style={{ color: '#6b7280', fontFamily: 'Cinzel, serif', fontSize: 13, textAlign: 'center', padding: '8px 0' }}>
                  Emplacement vide — {SLOT_LABELS[modal.slot]}
                </div>
              )}
              {modal.type === 'item' && modal.item && (
                <>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: 14, color: RARITY_COLORS[modal.item.rarity], marginBottom: 8 }}>
                    {modal.item.name}
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                    <RarityBadge rarity={modal.item.rarity} />
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>{SLOT_LABELS[modal.item.slot]}</span>
                  </div>
                  <div style={{ fontSize: 15, color: '#f5e6c8', fontWeight: 700, marginBottom: 16 }}>
                    +{modal.item.statValue} <span style={{ color: RARITY_COLORS[modal.item.rarity] }}>{modal.item.stat}</span>
                  </div>
                  <button
                    onClick={() => handleEquipFromModal(modal.item)}
                    style={{
                      width: '100%',
                      padding: '12px 0',
                      background: 'linear-gradient(135deg, #92400e, #c9a84c)',
                      border: 'none',
                      borderRadius: 8,
                      color: '#0a0a0a',
                      fontFamily: 'Cinzel, serif',
                      fontWeight: 900,
                      cursor: 'pointer',
                      fontSize: 14,
                    }}
                  >
                    ÉQUIPER
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
