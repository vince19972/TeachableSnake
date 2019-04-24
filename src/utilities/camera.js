/**
 *
 * The code is revised from https://github.com/tensorflow/tfjs-models/tree/master/posenet/demos
 *
*/

import isMobile from './deviceDetect'

const canvasWidth = window.innerWidth * 0.15
const canvasHeight = window.innerHeight * 0.125

export async function setupCamera(videoElement) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available')
  }

  videoElement.width = canvasWidth
  videoElement.height = canvasHeight

  const mobile = isMobile()
  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: mobile ? undefined : canvasWidth,
      height: mobile ? undefined : canvasHeight,
    },
  })
  videoElement.srcObject = stream

  return new Promise((resolve) => {
    videoElement.onloadedmetadata = () => {
      resolve(videoElement)
    }
  })
}

export default async function loadVideo(videoElement) {
	const video = await setupCamera(videoElement)
  video.play()

  return video
}