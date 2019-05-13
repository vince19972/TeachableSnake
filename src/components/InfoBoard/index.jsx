import React from 'react'
import './InfoBoard.scss'

function InfoBoard () {

	return (
		<div id="InfoBoard">
			<div className="tutorial">
				<div className="top">
					<div className="indication">
						<span>how to play the game</span>
					</div>
					<div className="image">
						<div className="sprite"></div>
					</div>
				</div>
				<div className="btm">
					<p className="steps">
						<span className="step">white paper with black arrow</span>
						<span className="step">hold the paper in front of computer camera</span>
						<span className="step">rotate the paper to control the snake</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export default InfoBoard