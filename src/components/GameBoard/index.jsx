import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './GameBoard.scss'

import SnakeCanvas from '../SnakeCanvas'
import loadVideo from '../../utilities/camera'
import staticStore from '../../context/staticStore'

function GameBoard () {
	const { actions } = useContext(StoreContext)

	const tm = window.tm
	const [userWebCam, setUserWebCam] = useState(null)
	const [model, setModel] = useState(null)

	async function loadModel() {
		const loadedModel = await tm.mobilenet.load(staticStore.model.checkPoint)
		setModel(loadedModel)
	}

	async function predictVideo(image) {
		if (model) {
			const prediction = await model.predict(image, 4)
			const predictType = prediction[0].className

			actions.moveSnake({ predictType })

			predictVideo(userWebCam)
		}
	}

	// load the model (only once as component is mounted)
	useEffect(() => {
		loadModel()
	}, [])

	// load the video (only once as component is mounted)
	useEffect(() => {
		try {
			const video = loadVideo(document.getElementById('userWebCam'))
			video.then((resolvedVideo) => {
				setUserWebCam(resolvedVideo)
			})
		} catch (err) {
			throw err
		}
	}, [])

	// make prediction (as userWebCam and model is set)
	useEffect(() => {
		if (userWebCam) {
			predictVideo(userWebCam)
		}
	}, [userWebCam, model])

	return (
		<div id="GameBoard">
			<div className="info-bar">
				<h1 className="game-title">Teachable Snake</h1>
				<video id="userWebCam"></video>
			</div>
			<div className="main-canvas">
				<SnakeCanvas/>
			</div>
		</div>
	)
}

export default GameBoard