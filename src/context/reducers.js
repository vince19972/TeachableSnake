import { moveSnake } from '../utilities/snake'

const initialState = {
	globalValues: {
		unit: 1,
		snakeCanvas: {
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
	]
}

const types = {
	MOVE_SNAKE: 'MOVE_SNAKE',
	UPDATE_UNIT: 'UPDATE_UNIT'
}

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case types.MOVE_SNAKE:
			const updatePlayer = state.players[action.payload.playerId]

			if (!action.payload.keepMoving) {
				updatePlayer.xVelocity = action.payload.xVelocity
				updatePlayer.yVelocity = action.payload.yVelocity
			}

			const { newXPosition, newYPosition } = moveSnake({
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

			// console.log(state.players[0].xPosition)
			// console.log(state.players[0].yPosition)

			return {
				...state
			}
		case types.UPDATE_UNIT:
			state.globalValues.unit = action.payload.unit

			return {
				...state
			}
		default:
			return
	}

}

export { initialState, types, reducer }