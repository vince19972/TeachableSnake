import { types } from './reducers'

export const useActions = (state, dispatch) => {

	function moveSnake(event) {
		const { players } = state

		switch(event.keyCode) {
			case 37:
				dispatch({ type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						xPosition: players[0].xPosition -= 1
					}
				})
				return
			case 38:
				dispatch({ type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						yPosition: players[0].yPosition -= 1
					}
				})
				return
			case 39:
				dispatch({ type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						xPosition: players[0].xPosition += 1
					}
				})
				return
			case 40:
				dispatch({ type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						yPosition: players[0].yPosition += 1,
					}
				})
				return
			default:
				return
		}
	}

	return {
		moveSnake
	}
}