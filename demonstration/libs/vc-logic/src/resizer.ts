import { get } from 'svelte/store'
import {
	checkSizeIntervalId,
	emInPx,
	isDesktop,
	portalHeight,
	resized,
	verticalLayout,
	windowWidth
} from '@votecube/ui-logic'

export type ViewCallback = (
	portalHeight: number,
	windowWidth: number,
	verticalLayout: boolean
) => void

let viewCallback: ViewCallback

export function setResizeCllBck(
	resizeCallback: ViewCallback
): void {
	viewCallback = resizeCallback

	if (resizeCallback) {
		resize()
	}
}

export function startResizeInterval(): void {
	resize()

	const newCheckSizeIntervalId = setInterval(() => {
		if (get(resized)) {
			resize()
		}
	}, 500)

	checkSizeIntervalId.set(newCheckSizeIntervalId)
}

/*
export function stopResizeInterval() {
	clearInterval(get(checkSizeIntervalId))
}*/

export function scheduleToResize(): void {
	resized.set(true)
}

function resize(): void {
	const theWindowWidth = window.innerWidth
	const thePortalHeight = window.innerHeight

	let theVerticalLayout = true
	if (thePortalHeight < theWindowWidth && thePortalHeight < 400) {
		theVerticalLayout = false
	}

	isDesktop.set(theWindowWidth >= get(emInPx) * 62)
	portalHeight.set(thePortalHeight)
	resized.set(false)
	verticalLayout.set(theVerticalLayout)
	windowWidth.set(theWindowWidth)

	if (viewCallback) {
		viewCallback(thePortalHeight, theWindowWidth, theVerticalLayout)
	}
}
