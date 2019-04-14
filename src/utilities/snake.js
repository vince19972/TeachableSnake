export function initCanvas(canvas) {
	const ctx = canvas.getContext('2d')

	ctx.fillStyle = 'black'
	ctx.canvas.width = window.innerWidth * 0.9
	ctx.canvas.height = window.innerHeight * 0.9
	ctx.fillRect(0, 0, canvas.width, canvas.height)
}

export function updateGameFrame(state, canvas, moveSnake) {
	const ctx = canvas.getContext('2d')

	return () => {
		initCanvas(canvas)
		moveSnake()

		state.players.forEach((player, index) => {
			const { xPosition, yPosition, color } = player
			ctx.fillStyle = color
			ctx.fillRect(xPosition, yPosition, 10, 10)
		})

		requestAnimationFrame(updateGameFrame(state, canvas, moveSnake))
	}
}