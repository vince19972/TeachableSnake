import React, { useContext } from 'react'
import { StoreContext } from './context/StoreContext'
import './App.css'
import './styles/_variables.css'

import GameBoard from './components/GameBoard'
import EntryBoard from './components/EntryBoard'

function App () {

  const { state } = useContext(StoreContext)

  return (
    <div className="App">
      {state.globalValues.isGameStarted ? (
        <GameBoard />
      ) : (
        <EntryBoard />
      )}
    </div>
  )

}

export default App
