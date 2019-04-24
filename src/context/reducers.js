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

const directions = {
	LEFT: 'left',
	UP: 'up',
	RIGHT: 'right',
	DOWN: 'down',
}

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case types.MOVE_SNAKE: {
			const { playerId, xVelocity: newXVelocity, yVelocity: newYVelocity, keepMoving, isBackWrapping } = action.payload
			const updatePlayer = state.players[playerId]

			if (!keepMoving && !isBackWrapping) {
				updatePlayer.xVelocity = newXVelocity
				updatePlayer.yVelocity = newYVelocity
			}

			const newTrails = generateSnakePosition({
				currentLength: updatePlayer.length,
				currentTrails: updatePlayer.trails,
				currentXYVelocity: {
					xVelocity: updatePlayer.xVelocity,
					yVelocity: updatePlayer.yVelocity
				}
			})

			state.players[playerId] = {
				...updatePlayer,
				trails: newTrails
			}

			return { ...state }
		}
		case types.UPDATE_UNIT: {
			const { ctx } = action.payload
			state.globalValues.ctx = ctx

			return { ...state }
		}
		case types.UPDATE_LENGTH: {
			const { playerId } = action.payload
			state.players[playerId] = {
				...state.players[playerId],
				length: state.players[playerId].length += 1
			}

			return { ...state }
		}
		case types.UPDATE_FOOD: {
			const { newFood } = action.payload
			state.foods[newFood.id] = newFood

			return { ...state }
		}
		default:
			return
	}

}

export { initialState, types, reducer, directions }