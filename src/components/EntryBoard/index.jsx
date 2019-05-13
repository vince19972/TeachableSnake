import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { types } from '../../context/reducers'
import './EntryBoard.scss'
import papers from '../../assets/icons/papers.gif'

import InfoBoard from '../InfoBoard'

function EntryBoard () {

	const { dispatch } = useContext(StoreContext)

	function startGame() {
		dispatch({ type: types.UPDATE_GAME_START })
	}

	return (
		<div id="EntryBoard">
			<div className="left-side">
				<div className="left-side__top">
					<div className="main">
						<h1 className="title">Teachable Snake</h1>
					</div>
				</div>
				<div className="left-side__btm">
					<button className="start-btn" onClick={startGame}>START</button>
				</div>
			</div>
			<div className="right-side">
				<InfoBoard/>
			</div>
		</div>
	)
}

export default EntryBoard