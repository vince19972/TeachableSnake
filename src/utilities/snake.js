import { initialState } from '../context/reducers'

const snakeStore = {
	canvasWidth: 0,
	canvasHeight: 0,
	notFirstInitFrame: true,
	startedAnimationFrame: false,
	frameDebounce: 60,
	foodColor: [
		'yellow',
		'pink'
	],
	unit: 0
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

export function updateGameFrame(state, canvas, contextCallbacks) {
	const ctx = canvas.getContext('2d')
	const { updateUnit, updateFood, updateSnakePosition, updateSnakeLength } = contextCallbacks

	return (timestamp) => {
		if (!snakeStore.startedAnimationFrame) snakeStore.startedAnimationFrame = timestamp
		let progress = timestamp - snakeStore.startedAnimationFrame

		if (progress > snakeStore.frameDebounce) {
			// execute main frame function
			initCanvas(canvas)

			// from action context, dispatch reducer function
			// update the positions in global state
			updateSnakePosition()

			// draw the shapes according to global state
			redrawSnake(state, ctx)
			redrawFood(state, ctx)

			// from action context, dispatch reducer function
			snakeEating(state, updateFood, updateSnakeLength)

			// reset flag
			snakeStore.startedAnimationFrame = false

			if (snakeStore.notFirstInitFrame) {
				updateUnit()
				updateFood()
				snakeStore.unit = state.globalValues.unit
				snakeStore.notFirstInitFrame = false
			}
		}

		requestAnimationFrame(updateGameFrame(state, canvas, contextCallbacks))
	}
}

export function generateSnakePosition(requiredInfo) {
	const { currentLength, currentTrails, currentXYVelocity } = requiredInfo
	const { canvasWidth, canvasHeight } = snakeStore
	const { xVelocity, yVelocity } = currentXYVelocity
	const snakeHead = currentTrails[0]

	const [ xPosition, yPosition ] = snakeHead
	const newXY = [
		xPosition + xVelocity,
		yPosition + yVelocity
	]

	const newTrails = [newXY, ...currentTrails].slice(0, currentLength)
	// console.log(newTrails)

	// exceeding boundaries situation handling
	const fmtTrails = newTrails.map((trail) => {
		const [xPosition, yPosition] = trail
		const fmtTrail = [xPosition, yPosition]

		if (xPosition > canvasWidth) fmtTrail[0] = 0
		if (xPosition < 0) fmtTrail[0] = fmtPosition(canvasWidth, snakeStore.unit)
		if (yPosition > canvasHeight) fmtTrail[1] = 0
		if (yPosition < 0) fmtTrail[1] = fmtPosition(canvasHeight, snakeStore.unit)

		return fmtTrail
	})

	return fmtTrails
}

export function redrawSnake(state, ctx) {
	state.players.forEach((player) => {
		const { trails, color } = player
		trails.forEach(trail => {
			const [ xPosition, yPosition ] = trail
			ctx.fillStyle = color
			ctx.fillRect(xPosition, yPosition, state.globalValues.unit, state.globalValues.unit)
		})
	})
}

export function generateFoodPosition(state) {
	const { globalValues, foods } = state
	const { foodColor } = snakeStore
	const { width: canvasWidth, height: canvasHeight } = globalValues.ctx.canvas
	const newFood = {
		id: '',
		color: '',
		xPosition: 0,
		yPosition: 0
	}

	// helper functions
	const checkPositionCollision = () => {
		const { xPosition, yPosition } = newFood
		const isCollided = foods
			.filter(food => food.xPosition === xPosition, yPosition)
			.length > 0

		if (isCollided) {
			generateFood()
			checkPositionCollision()
		}

		return
	}
	const generateFood = () => {
		const randomX = getRandomInt(0, canvasWidth)
		const randomY = getRandomInt(0, canvasHeight)

		newFood.color = foodColor[0]
		newFood.xPosition = fmtPosition(randomX, globalValues.unit)
		newFood.yPosition = fmtPosition(randomY, globalValues.unit)
	}

	// generate new color, x and y position
	generateFood()

	// check if new position is collided with old position
	if (foods.length > 0) checkPositionCollision()

	return newFood
}

export function redrawFood(state, ctx) {
	state.foods.forEach((food) => {
		const { xPosition, yPosition, color } = food
		ctx.fillStyle = color
		ctx.fillRect(xPosition, yPosition, state.globalValues.unit, state.globalValues.unit)
	})
}

export function snakeEating(state, updateFoodPosition, updateSnakeLength) {
	const { players, foods } = state

	players.forEach((player, index) => {
		const { trails } = player
		const [ xPosition, yPosition ] = trails[0]
		const eatenFood = foods.filter((food) => food.xPosition === xPosition && food.yPosition === yPosition)
		const isFoodEaten = eatenFood.length > 0

		if (isFoodEaten) {
			updateFoodPosition(eatenFood[0].id)
			updateSnakeLength(index)
		}
	})
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}

function fmtPosition(position, unit) {
	return position - (position % unit)
}