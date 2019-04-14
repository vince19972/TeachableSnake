import React, { useState } from 'react'
import './GameBoard.css'

import SnakeCanvas from '../SnakeCanvas'

function GameBoard () {
	return (
		<div id="GameBoard">
			<SnakeCanvas/>
		</div>
	)
}

export default GameBoard