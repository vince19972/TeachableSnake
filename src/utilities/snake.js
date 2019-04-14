

export function initCanvas(canvasNode) {
	const ctx = canvasNode.getContext('2d')
	document.addEventListener('keyDown', keyPush)

	return ctx
}

export function updateGameFrame(ctx) {

}