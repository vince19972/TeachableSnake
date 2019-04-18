import { types } from './reducers'
import { generateFoodPosition } from '../utilities/snake'

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

	function updateSnakePosition(event) {
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
				dispatch({
					type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						xVelocity: -1 * unit,
						yVelocity: 0
					}
				})
				return
			case UP:
			case arrowUp:
				dispatch({
					type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						xVelocity: 0,
						yVelocity: -1 * unit,
					}
				})
				return
			case RIGHT:
			case arrowRight:
				dispatch({
					type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						xVelocity: 1 * unit,
						yVelocity: 0
					}
				})
				return
			case DOWN:
			case arrowDown:
				dispatch({
					type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						xVelocity: 0,
						yVelocity: 1 * unit,
					}
				})
				return
			default:
				dispatch({
					type: types.MOVE_SNAKE,
					payload: {
						playerId: 0,
						keepMoving: true
					}
				})
				return
		}
	}

	function updateFoodPosition(foodId = null) {
		const { foods } = state
		const newFood = generateFoodPosition(state)
		newFood.id = generateFoodId()

		dispatch({ type: types.UPDATE_FOOD, payload: { newFood } })

		function generateFoodId() {
			return foodId !== null ? foodId : foods.length
		}
	}

	function snakeEatingFood() {

	}

	return {
		updateSnakePosition,
		updateFoodPosition,
		snakeEatingFood
	}
}