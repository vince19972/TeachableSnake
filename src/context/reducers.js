import { generateSnakePosition } from '../utilities/snake'

const initialState = {
	globalValues: {
		ctx: '',
		unit: 20,
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
			length: 1,
			trails: [[0,0]]
		}
	],
	foods: []
}

const types = {
	MOVE_SNAKE: 'MOVE_SNAKE',
	UPDATE_LENGTH: 'UPDATE_LENGTH',
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

			const newTrails = generateSnakePosition({
				currentLength: updatePlayer.length,
				currentTrails: updatePlayer.trails,
				currentXYVelocity: {
					xVelocity: updatePlayer.xVelocity,
					yVelocity: updatePlayer.yVelocity
				}
			})

			state.players[action.payload.playerId] = {
				...updatePlayer,
				trails: newTrails
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
		case types.UPDATE_LENGTH:
			const { playerId } = action.payload
			state.players[playerId] = {
				...state.players[playerId],
				length: state.players[playerId].length += 1
			}

			console.log(state.players[playerId].length)

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