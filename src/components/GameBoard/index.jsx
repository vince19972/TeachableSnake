import React, { useEffect } from 'react'
import './GameBoard.scss'

import SnakeCanvas from '../SnakeCanvas'
import loadVideo from '../../utilities/camera'

function GameBoard () {

	useEffect(() => {
		loadVideo(document.getElementById('userWebCam'))
	})

	return (
		<div id="GameBoard">
			<div className="info-bar">
				<h1 className="game-title">Teachable Snake</h1>
				<video id="userWebCam"></video>
			</div>
			<div className="main-canvas">
				<SnakeCanvas/>
			</div>
		</div>
	)
}

export default GameBoard