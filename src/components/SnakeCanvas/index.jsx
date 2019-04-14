import React, { useContext, useState, useEffect, useRef } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { types } from '../../context/reducers'
import './SnakeCanvas.css'

function SnakeCanvas () {
	const { state, dispatch, actions } = useContext(StoreContext)
	const ctx = useRef(null)
	// const [ctx, setCtx] = useState(() => document.getElementById('SnakeCanvas').getContext('2d'))

	useEffect(() => {
		console.log(ctx)
		document.addEventListener('keydown', actions.moveSnake)
	}, [])

	return (
		<canvas id="SnakeCanvas" ref={ctx}></canvas>
	)
}

export default SnakeCanvas