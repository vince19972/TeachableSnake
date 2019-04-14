import { types } from './reducers'

const keys = {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	arrowUp: 0,
	arrowRight: 1,
	arrowDown: 2,
	arrowLeft: 3,
}

export const useActions = (state, dispatch) => {

	function moveSnake(event) {
		const { globalValues } = state
		const { unit } = globalValues
		const {
			LEFT,
			UP,
			RIGHT,
			DOWN,
			arrowUp,
			arrowRight,
			arrowDown,
			arrowLeft
		} = keys
		const keyCode = event
			? event.keyCode
				? event.keyCode
				: event.predictType
			: null

		switch(keyCode) {
			case LEFT:
			case arrowLeft:
				dispatch({ type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						xVelocity: -1 * unit,
						yVelocity: 0
					}
				})
				return
			case UP:
			case arrowUp:
				dispatch({ type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						xVelocity: 0,
						yVelocity: -1 * unit,
					}
				})
				return
			case RIGHT:
			case arrowRight:
				dispatch({ type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						xVelocity: 1 * unit,
						yVelocity: 0
					}
				})
				return
			case DOWN:
			case arrowDown:
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