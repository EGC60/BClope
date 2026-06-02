import React, { useState } from 'react'
import { useGameState } from './hooks/useGameState.js'
import TabBar from './components/TabBar.jsx'
import Setup from './screens/Setup.jsx'
import Autel from './screens/Autel.jsx'
import Coffre from './screens/Coffre.jsx'
import Sac from './screens/Sac.jsx'
import Heros from './screens/Heros.jsx'

export default function App() {
  const [tab, setTab] = useState('autel')
  const {
    state,
    todayLog,
    todayGoal,
    moneySaved,
    daysUnderGoal,
    daysInGame,
    logSmoked,
    logResisted,
    openChest,
    setActiveHero,
    completeSetup,
    getDailyGoal,
  } = useGameState()

  // Show setup if not yet configured
  if (!state.setup) {
    return <Setup onComplete={completeSetup} />
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', position: 'relative' }}>
      {tab === 'autel' && (
        <Autel
          state={state}
          todayLog={todayLog}
          todayGoal={todayGoal}
          logSmoked={logSmoked}
          logResisted={logResisted}
        />
      )}
      {tab === 'coffre' && (
        <Coffre
          state={state}
          openChest={openChest}
          setActiveHero={setActiveHero}
        />
      )}
      {tab === 'sac' && (
        <Sac
          state={state}
          setActiveHero={setActiveHero}
        />
      )}
      {tab === 'heros' && (
        <Heros
          state={state}
          moneySaved={moneySaved}
          daysInGame={daysInGame}
          daysUnderGoal={daysUnderGoal}
        />
      )}
      <TabBar active={tab} onSelect={setTab} />
    </div>
  )
}
