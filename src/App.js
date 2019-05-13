import React, { useContext } from 'react'
import { StoreContext } from './context/StoreContext'
import './App.scss'
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
      <div className="media-warn">
        <h2>Sorry! Only support desktop experience at this moment.</h2>
      </div>
    </div>
  )

}

export default App
