import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { types } from '../../context/reducers'
import './EntryBoard.scss'
import papers from '../../assets/icons/papers.gif'

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
				<div className="tutorial">
					<div className="top">
						<div className="indication">
							<span>how to play the game</span>
						</div>
						<div className="image">
							<img src={papers} alt="papers"/>
						</div>
					</div>
					<div className="btm">
						<p className="steps">
							<span className="step">clean white paper with black arrow</span>
							<span className="step">hold the paper in front of the computer camera</span>
							<span className="step">rotate the paper to control the snake</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EntryBoard