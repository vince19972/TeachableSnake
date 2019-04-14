const localStore = {
	canvasWidth: 0,
	canvasHeight: 0
}

export function initCanvas(canvas) {
	const ctx = canvas.getContext('2d')

	ctx.fillStyle = 'black'
	ctx.canvas.width = window.innerWidth * 0.9
	ctx.canvas.height = window.innerHeight * 0.9
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	localStore.canvasWidth = ctx.canvas.width
	localStore.canvasHeight = ctx.canvas.height
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

export function moveSnake(currentXYPosition, currentXYVelocity) {
	const { canvasWidth, canvasHeight } = localStore
	const { xPosition, yPosition } = currentXYPosition
	const { xVelocity, yVelocity } = currentXYVelocity
	const newXY = {
		newXPosition: xPosition + xVelocity,
		newYPosition: yPosition + yVelocity
	}

	// exceeding boundaries situation handling
	if (newXY.newXPosition > canvasWidth) newXY.newXPosition = 0
	if (newXY.newXPosition < 0) newXY.newXPosition = canvasWidth
	if (newXY.newYPosition > canvasHeight) newXY.newYPosition = 0
	if (newXY.newYPosition < 0) newXY.newYPosition = canvasHeight

	return newXY
}