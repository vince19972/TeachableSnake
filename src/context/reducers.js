import { generateSnakePosition } from '../utilities/snake'

const initialState = {
	globalValues: {
		ctx: '',
		unit: 10,
		snakeCanvas: {
			isResized: false,
			widthPortion: 0.9,
			heightPortion: 0.65
		}
	},
	players: [
		{
			name: 'player 1',
			color: 'red',
			xVelocity: 0,
			yVelocity: 0,
			xPosition: 0,
			yPosition: 0
		}
	],
	foods: []
}

const types = {
	MOVE_SNAKE: 'MOVE_SNAKE',
	UPDATE_UNIT: 'UPDATE_UNIT',
	UPDATE_FOOD: 'UPDATE_FOOD'
}

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case types.MOVE_SNAKE:
			const updatePlayer = state.players[action.payload.playerId]

			if (!action.payload.keepMoving) {
				updatePlayer.xVelocity = action.payload.xVelocity
				updatePlayer.yVelocity = action.payload.yVelocity
			}

			const { newXPosition, newYPosition } = generateSnakePosition({
				xPosition: updatePlayer.xPosition,
				yPosition: updatePlayer.yPosition
			}, {
				xVelocity: updatePlayer.xVelocity,
				yVelocity: updatePlayer.yVelocity
			})

			state.players[action.payload.playerId] = {
				...updatePlayer,
				xPosition: newXPosition,
				yPosition: newYPosition
			}

			return {
				...state
			}
		case types.UPDATE_UNIT:
			const { ctx } = action.payload
			// state.globalValues.unit = Math.floor(ctx.canvas.width / 120)
			state.globalValues.ctx = ctx

			return {
				...state
			}
		case types.UPDATE_FOOD:
			const { newFood } = action.payload
			state.foods[newFood.id] = newFood

			return {
				...state
			}
		default:
			return
	}

}

export { initialState, types, reducer }