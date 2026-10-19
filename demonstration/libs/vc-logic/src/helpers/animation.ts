import type { TransitionConfig } from 'svelte/transition'

export type TransitionFunction = (
	node: Element,
	params: unknown,
	options: { direction: 'in' | 'out' | 'both' }
) => TransitionConfig

const FRAME_MILLIS = 1000 / 60

function toKeyframeProperties(
	cssText: string
): Record<string, string> {
	const properties: Record<string, string> = {}
	for (const declaration of cssText.split(';')) {
		const separatorIndex = declaration.indexOf(':')
		if (separatorIndex < 0) {
			continue
		}
		const name = declaration.slice(0, separatorIndex).trim()
			.replace(/-([a-z])/g, (_match, letter: string) => letter.toUpperCase())
		properties[name] = declaration.slice(separatorIndex + 1).trim()
	}

	return properties
}

/**
 * Plays the intro of a Svelte transition on an element outside of a component
 * (svelte/internal, that used to provide this, is gone in Svelte 5).
 */
export function runIntroTransition(
	element: Element,
	transitionFunction: TransitionFunction,
	params: unknown
): void {
	const {
		delay = 0,
		duration = 300,
		easing = (t: number) => t,
		css,
		tick
	} = transitionFunction(element, params, { direction: 'in' })

	if (css) {
		const numFrames = Math.max(1, Math.ceil(duration / FRAME_MILLIS))
		const keyframes: Keyframe[] = []
		for (let frame = 0; frame <= numFrames; frame++) {
			const progress = frame / numFrames
			const t = easing(progress)
			keyframes.push({
				offset: progress,
				...toKeyframeProperties(css(t, 1 - t))
			})
		}
		element.animate(keyframes, { delay, duration, fill: 'backwards' })
	} else if (tick) {
		const start = performance.now() + delay
		const step = (now: number) => {
			const progress = Math.min(1, Math.max(0, (now - start) / duration))
			const t = easing(progress)
			tick(t, 1 - t)
			if (progress < 1) {
				requestAnimationFrame(step)
			}
		}
		requestAnimationFrame(step)
	}
}

export function transition(
	_component: unknown,
	elementId: string,
	transitionFunction: TransitionFunction,
	options: unknown
): void {
	const domElementToTransition = document.getElementById(elementId)
	if (!domElementToTransition) {
		return
	}
	runIntroTransition(domElementToTransition, transitionFunction, options)
}
