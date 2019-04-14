const initialState = {
	globalValues: {
		xSpeed: 1,
		ySpeed: 1
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
	MOVE_SNAKE: "MOVE_SNAKE"
}

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case types.MOVE_SNAKE:
			const updatePlayer = state.players[action.payload.playerId]
			state.players[action.payload.playerId] = {
				...updatePlayer,
				xPosition: action.payload.xPosition ? action.payload.xPosition : updatePlayer.xPosition,
				yPosition: action.payload.yPosition ? action.payload.yPosition : updatePlayer.yPosition
			}

			console.log(state.players[0].xPosition)
			console.log(state.players[0].yPosition)

			return {
				...state,
				players: [
					...state.players
				]
			}
		default:
			return
	}

}

export { initialState, types, reducer }