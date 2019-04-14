import React, { useContext, useState, useEffect, useRef } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { types } from '../../context/reducers'
import './SnakeCanvas.css'

import { updateGameFrame } from '../../utilities/snake'

function SnakeCanvas () {
	const { state, dispatch, actions } = useContext(StoreContext)
	const canvas = useRef(null)

	useEffect(() => {
		document.addEventListener('keydown', actions.moveSnake)
		requestAnimationFrame(updateGameFrame(state, document.getElementById('SnakeCanvas')))
	}, [])

	return (
		<canvas id="SnakeCanvas" ref={canvas}></canvas>
	)
}

export default SnakeCanvas