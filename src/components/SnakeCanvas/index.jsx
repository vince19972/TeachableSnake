import React, { useContext, useState, useEffect, useRef } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { types } from '../../context/reducers'
import './SnakeCanvas.css'

import { updateGameFrame } from '../../utilities/snake'

function SnakeCanvas () {
	const { state, dispatch, actions } = useContext(StoreContext)

	useEffect(() => {
		const snakeCanvas = document.getElementById('SnakeCanvas')
		const ctx = snakeCanvas.getContext('2d')

		document.addEventListener('keydown', actions.moveSnake)
		requestAnimationFrame(updateGameFrame(state, snakeCanvas, actions.moveSnake))
		dispatch({ type: types.UPDATE_UNIT, payload: { unit: ctx.canvas.width / 100 }})
	}, [])

	return (
		<canvas id="SnakeCanvas"></canvas>
	)
}

export default SnakeCanvas