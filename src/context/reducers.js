import { generateSnakePosition } from '../utilities/snake'

const initialState = {
	globalValues: {
		ctx: '',
		unit: 20,
		snakeCanvas: {
			isResized: false,
			widthPortion: 0.85,
			heightPortion: 0.6
		},
		isGameOver: false
	},
	players: [
		{
			name: 'player 1',
			color: '#00701a',
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
	UPDATE_FOOD: 'UPDATE_FOOD',
	UPDATE_GAME_STATUS: 'UPDATE_GAME_STATUS',
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
		case types.UPDATE_GAME_STATUS: {
			state.globalValues.isGameOver = !state.globalValues.isGameOver

			alert('GAME OVER')

			return { ...state }
		}
		default:
			return
	}

}

export { initialState, types, reducer, directions }