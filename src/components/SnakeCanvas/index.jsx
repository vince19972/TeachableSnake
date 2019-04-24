import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { types } from '../../context/reducers'
import './SnakeCanvas.css'

import { updateGameFrame } from '../../utilities/snake'

function SnakeCanvas () {
	const { state, dispatch, actions } = useContext(StoreContext)

	useEffect(() => {
		const snakeCanvas = document.getElementById('SnakeCanvas')
		const ctx = snakeCanvas.getContext('2d')

		document.addEventListener('keydown', actions.updateSnakePosition)
		requestAnimationFrame(updateGameFrame(
			state,
			snakeCanvas,
			{
				updateFood: actions.updateFoodPosition,
				updateSnakePosition: actions.updateSnakePosition,
				updateSnakeLength: (playerId) => dispatch({ type: types.UPDATE_LENGTH, payload: { playerId }}),
				updateUnit: () => dispatch({ type: types.UPDATE_UNIT, payload: { ctx }}),
			}
		))
	}, [])

	return (
		<canvas id="SnakeCanvas"></canvas>
	)
}

export default SnakeCanvas