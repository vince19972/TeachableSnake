import { initialState } from '../context/reducers'

const snakeStore = {
	canvasWidth: 0,
	canvasHeight: 0,
	startedAnimationFrame: false,
	frameDebounce: 0,
	snakeSize: 10
}

export function initCanvas(canvas) {
	const { widthPortion, heightPortion } = initialState.globalValues.snakeCanvas
	const ctx = canvas.getContext('2d')

	ctx.fillStyle = 'black'
	ctx.canvas.width = window.innerWidth * widthPortion
	ctx.canvas.height = window.innerHeight * heightPortion
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	snakeStore.canvasWidth = ctx.canvas.width
	snakeStore.canvasHeight = ctx.canvas.height
}

export function updateGameFrame(state, canvas, moveSnake) {
	const ctx = canvas.getContext('2d')

	return (timestamp) => {
		if (!snakeStore.startedAnimationFrame) snakeStore.startedAnimationFrame = timestamp
		let progress = timestamp - snakeStore.startedAnimationFrame

		if (progress > snakeStore.frameDebounce) {
			// execute main frame function
			initCanvas(canvas)
			moveSnake()

			state.players.forEach((player, index) => {
				const { xPosition, yPosition, color } = player
				ctx.fillStyle = color
				ctx.fillRect(xPosition, yPosition, snakeStore.snakeSize, snakeStore.snakeSize)
			})

			// reset flag
			snakeStore.startedAnimationFrame = false
		}

		requestAnimationFrame(updateGameFrame(state, canvas, moveSnake))
	}
}

export function moveSnake(currentXYPosition, currentXYVelocity) {
	const { canvasWidth, canvasHeight } = snakeStore
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