import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { types } from '../../context/reducers'
import './EntryBoard.scss'

import InfoBoard from '../InfoBoard'

function EntryBoard () {

	const { dispatch } = useContext(StoreContext)

	function startGame() {
		dispatch({ type: types.UPDATE_GAME_START })
	}

	return (
		<div id="EntryBoard">
			<div className="left-side -flex-column">
				<div className="left-side__top">
					<div className="main">
						<h1 className="title">Teachable Snake</h1>
						<ul className="infos">
							<li className="info">Created by <a href="https://www.vinceshao.com/">Vince MingPu Shao</a></li>
							<li className="info">Powered by <a href="https://teachablemachine.withgoogle.com/">Google's Teachable Machine</a></li>
							<li className="info">Source code on <a href="https://github.com/vince19972/TeachableSnake">GitHub</a></li>
						</ul>
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