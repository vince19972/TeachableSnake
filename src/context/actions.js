import { types } from './reducers'

const keys = {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40
}

export const useActions = (state, dispatch) => {

	function moveSnake(event) {
		const { players, globalValues } = state
		const { unit } = globalValues
		const { LEFT, UP, RIGHT, DOWN } = keys
		const keyCode = event ? event.keyCode : null

		switch(keyCode) {
			case LEFT:
				dispatch({ type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						xVelocity: -1 * unit,
						yVelocity: 0
					}
				})
				return
			case UP:
				dispatch({ type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						xVelocity: 0,
						yVelocity: -1 * unit,
					}
				})
				return
			case RIGHT:
				dispatch({ type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						xVelocity: 1 * unit,
						yVelocity: 0
					}
				})
				return
			case DOWN:
				dispatch({ type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						xVelocity: 0,
						yVelocity: 1 * unit,
					}
				})
				return
			default:
				dispatch({ type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						keepMoving: true
					}
				})
				return
		}
	}

	return {
		moveSnake
	}
}