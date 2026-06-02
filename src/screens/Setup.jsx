import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Setup({ onComplete }) {
  const [form, setForm] = useState({
    cigarettesPerDay: 10,
    pricePerPouch: 18.50,
    cigarettesPerPouch: 30,
    weeklyReduction: 1,
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: parseFloat(value) || 0 }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onComplete({
      ...form,
      startDate: new Date().toISOString(),
    })
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(201,168,76,0.3)',
    borderRadius: 8,
    color: '#f5e6c8',
    fontSize: 16,
    fontFamily: 'system-ui, sans-serif',
    outline: 'none',
    marginTop: 6,
  }

  const labelStyle = {
    display: 'block',
    color: '#c9a84c',
    fontSize: 12,
    fontFamily: 'Cinzel, serif',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
    }}>
      {/* Decorative background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: 390 }}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⚔️</div>
          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 28,
            fontWeight: 900,
            color: '#c9a84c',
            margin: 0,
            textShadow: '0 0 20px rgba(201,168,76,0.5)',
            letterSpacing: '0.1em',
          }}>
            SMOKESLAYER
          </h1>
          <p style={{
            color: '#f5e6c8',
            fontSize: 13,
            marginTop: 8,
            opacity: 0.7,
            fontFamily: 'Cinzel, serif',
          }}>
            Commence ta quête de libération
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 16,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}>
            <div>
              <label style={labelStyle}>Cigarettes par jour</label>
              <input
                type="number"
                name="cigarettesPerDay"
                value={form.cigarettesPerDay}
                onChange={handleChange}
                min={1}
                max={60}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Prix par paquet (€)</label>
              <input
                type="number"
                name="pricePerPouch"
                value={form.pricePerPouch}
                onChange={handleChange}
                min={1}
                step={0.5}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Cigarettes par paquet</label>
              <input
                type="number"
                name="cigarettesPerPouch"
                value={form.cigarettesPerPouch}
                onChange={handleChange}
                min={1}
                max={40}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Réduction hebdomadaire (cig/semaine)</label>
              <input
                type="number"
                name="weeklyReduction"
                value={form.weeklyReduction}
                onChange={handleChange}
                min={0}
                max={10}
                step={1}
                style={inputStyle}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            style={{
              marginTop: 24,
              width: '100%',
              padding: '16px 0',
              background: 'linear-gradient(135deg, #c9a84c, #f97316)',
              border: 'none',
              borderRadius: 12,
              color: '#0a0a0a',
              fontFamily: 'Cinzel, serif',
              fontWeight: 900,
              fontSize: 16,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(201,168,76,0.4)',
            }}
          >
            COMMENCER LA QUÊTE ⚔️
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
