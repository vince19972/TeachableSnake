const initialState = {
	globalValues: {
		xVelocity: 0,
		yVelocity: 0,
		unit: 1
	},
	players: [
		{
			name: 'player 1',
			color: 'red',
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
			if (!action.payload.keepMoving) {
				state.globalValues.xVelocity = action.payload.xVelocity
				state.globalValues.yVelocity = action.payload.yVelocity
			}

			const updatePlayer = state.players[action.payload.playerId]
			state.players[action.payload.playerId] = {
				...updatePlayer,
				xPosition: updatePlayer.xPosition + state.globalValues.xVelocity,
				yPosition: updatePlayer.yPosition + state.globalValues.yVelocity
			}

			console.log(state.players[0].xPosition)
			console.log(state.players[0].yPosition)

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