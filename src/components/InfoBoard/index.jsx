import React, { useContext } from 'react'
import './InfoBoard.scss'
import papers from '../../assets/icons/papers.gif'

function InfoBoard () {

	return (
		<div id="InfoBoard">
			<div className="tutorial">
				<div className="top">
					<div className="indication">
						<span>how to play the game</span>
					</div>
					<div className="image">
						<img src={papers} alt="papers"/>
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