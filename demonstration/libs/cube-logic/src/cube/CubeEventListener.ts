import {
	IUiAgreement
} from '@votecube/model'
import { Factor_Number } from './mutation/types'
import { IEventListenerMap, IPerElementEventListenerMap } from '../utils/EventListenerMap'
import {
	Bool,
	IFactorToAxisMapping,
	IPosition,
	ICubeAgreement,
	ICubeAgreementDimension,
	IValuesOutCallback,
	Move,
	ICubeMovement
} from './CubeMovement'
import { IMutationApi } from './mutation/MutationApi'
import { IViewport } from './Viewport'
import { ICubeUtils } from '../utils/CubeUtils'
import { Inject, Injected } from '@airport/direction-indicator'
import { ICubeDirection } from './CubeDirection'

export type MovementDirection = -1 | 0 | 1;
export type ChangeInPixels = number;
// export type Range = -1 | 1;
export type DirectionVector = [MovementDirection, ChangeInPixels
	// , Range
];

export interface ICubeEventListener {

	addCubeAdjustment(): void

	clearCubeAdjustment(): void

	clearView(
		elementId: string
	): void

	resumeInteraction(): void

	setPositionData(
		agreement: IUiAgreement,
		factorNumbers?: Factor_Number[]
	): boolean

	setPositionDataAndMove(
		agreement: IUiAgreement
	): void

	setView(
		elementId: string
	): void

	setViewPort(
		forCube: boolean,
		cb?: IValuesOutCallback
	): IMutationApi

	suspendInteraction(): void

}

export const TOUCH = document.ontouchmove !== undefined

@Injected()
export class CubeEventListener
	implements ICubeEventListener {

	@Inject()
	cubeDirection: ICubeDirection

	@Inject()
	cubeMovement: ICubeMovement

	@Inject()
	cubeUtils: ICubeUtils

	@Inject()
	eventListenerMap: IEventListenerMap

	@Inject()
	mutationApi: IMutationApi

	@Inject()
	viewport: IViewport

	// document listener map
	private dLM: IPerElementEventListenerMap
	private lastMove = 0
	private suspended = false

	addCubeAdjustment(): void {
		if (this.suspended) {
			return
		}
		// let moveSpeed = 256
		if (this.dLM) {
			this.addCubeAdjustmentToELM(this.dLM)
		} else {
			this.dLM = this.eventListenerMap.ad(document)
			this.addCubeAdjustmentToELM(this.dLM)
		}
	}

	addCubeAdjustmentToELM(
		eventListenerMap: IPerElementEventListenerMap
	): void {
		eventListenerMap.ad('keydown',
			ev => {
				if (this.suspended) {
					return
				}
				this.rmMmTm()
				switch (ev.keyCode) {
					case 37: // left
						this.viewport.move(Bool.False, Move.None, Bool.True, Move.Down)
						break

					case 38: // up
						// prevent default
						this.cubeUtils.pD(ev)
						this.viewport.move(Bool.True, Move.Up)
						break

					case 39: // right
						this.viewport.move(Bool.False, Move.None, Bool.True, Move.Up)
						break

					case 40: // down
						// prevent default
						this.cubeUtils.pD(ev)
						this.viewport.move(Bool.True, Move.Down)
						break

					case 27: // esc
						this.viewport.reset()
						break
					// case 109:
					// 	if (!viewport.el) {
					// 		return
					// 	}
					// 	if (moveSpeed > 128) {
					// 		moveSpeed /= 2
					// 	}
					// 	break
					// case 107:
					// 	if (!viewport.el) {
					// 		return
					// 	}
					// 	if (moveSpeed < 4096) {
					// 		moveSpeed *= 2
					// 	}
					// 	break

					default:
						break
				}

			})
			('mousedown',
				event => this.safeOMdTs(event))
			('touchstart',
				event => {
					// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/
					// Supporting_both_TouchEvent_and_MouseEvent
					try {
						event.preventDefault()
					} catch (_) {
					}
					this.safeOMdTs(event)
				})
			('mouseup',
				_ => this.safeRmMmTm())
			('touchend',
				_ => this.safeRmMmTm())
	}

	clearCubeAdjustment(): void {
		this.dLM.rm('keydown')
			('mousedown')
			('touchstart')
			('mouseup')
			('touchend')
	}

	clearView(
		elementId: string
	): void {
		delete this.viewport.el[elementId]
	}

	resumeInteraction(): void {
		this.suspended = false
	}

	setPositionData(
		agreement: IUiAgreement,
		factorNumbers: Factor_Number[] = [1, 2, 3]
	): boolean {
		const factorToAxisMapping: IFactorToAxisMapping = {
			1: null,
			2: null,
			3: null
		}
		factorToAxisMapping[factorNumbers[0]] = 'x'
		factorToAxisMapping[factorNumbers[1]] = 'y'
		factorToAxisMapping[factorNumbers[2]] = 'z'

		this.viewport.pd = {
			// axisToFactorMapping: {
			// 	x: factorNumbers[0],
			// 	y: factorNumbers[1],
			// 	z: factorNumbers[2]
			// },
			factorToAxisMapping,
			agreement,
			x: this.getUIUiAgreementDimension(1,
				// 'x',
				agreement
				// , 100
			),
			y: this.getUIUiAgreementDimension(2,
				// 'y',
				agreement),
			z: this.getUIUiAgreementDimension(3,
				// 'z',
				agreement),
		}

		return !!agreement
	}

	setPositionDataAndMove(
		agreement: IUiAgreement
	): void {
		if (this.setPositionData(agreement)) {
			this.viewport.moveToDegree()
		}
	}

	setView(
		elementId: string
	): void {
		this.viewport.el[elementId] = this.cubeUtils.gQ('#' + elementId)
	}

	setViewPort(
		forCube: boolean,
		cb?: IValuesOutCallback
	): IMutationApi {
		this.viewport.reset()
		this.viewport.cb = (
			uIUiAgreement: ICubeAgreement
		) => {
			// this.populateAgreementFactor('x', uIUiAgreement)
			// this.populateAgreementFactor('y', uIUiAgreement)
			// this.populateAgreementFactor('z', uIUiAgreement)
			cb(uIUiAgreement.agreement)
		}

		if (forCube) {
			if (cb) {
				this.addCubeAdjustment()
			} else {
				this.clearCubeAdjustment()
			}
		}

		if (!cb) {
			return null
		}

		return this.mutationApi
	}

	suspendInteraction(): void {
		this.suspended = true
	}

	private getUIUiAgreementDimension(
		factorNumber: Factor_Number,
		// axis: Factor_Axis,
		agreement: IUiAgreement,
		// agreementFactorValue: number = 0
	): ICubeAgreementDimension {
		if (!agreement) {
			return null
		}
		// let dir: Position_Dir = 0

		// if (!agreement) {
		// 	return {
		// 		axis,
		// 		dir,
		// 		valid: true,
		// 		value
		// 	}
		// }

		const agreementFactor = agreement[factorNumber] as ICubeAgreementDimension
		// if (agreementFactor.outcome === 'A') {
		// 	dir = 1
		// } else if (agreementFactor.outcome === 'B') {
		// 	dir = -1
		// }
		// return {
		// 	axis,
		// 	dir,
		// 	valid: true,
		// 	value: agreementFactor.value
		// }
		agreementFactor.valid = true

		return agreementFactor
	}

	private moveViewport(
		event: IPosition, // event
		viewport: IViewport
	): void {
		const mouseObject = this.cubeMovement.mouse
		const startCoords = mouseObject.start
		let lastCoords = mouseObject.last


		const now: number = new Date().getTime()

		if (!this.cubeMovement.mouse.last) {
			this.cubeMovement.mouse.last = lastCoords = this.cubeMovement.mouse.start
			this.lastMove = now
		}

		const { moveX, moveY, xBy, yBy } = this.cubeDirection.getMove(startCoords, event)

		if (now - this.lastMove >= 8) {
			startCoords.x = lastCoords.x
			startCoords.y = lastCoords.y
			if (moveX || moveY) {
				viewport.move(moveX, xBy, moveY, yBy)
			}
			this.lastMove = now
		}

		lastCoords.x = event.x
		lastCoords.y = event.y
	}

	/**
	 * On mousedown or touchstart
	 */
	private oMdTs(
		ev: MouseEvent | TouchEvent, // Event
	): void {
		if (!Object.keys(this.viewport.el).length) {
			return
		}
		this.rmMmTm()

		delete this.cubeMovement.mouse.last

		// clicks on links, images, or videos
		if (this.cubeUtils.iT(ev.target as Element, 'A')('IFRAME')()) {
			return
		}

		this.populateStartCoords(ev, this.cubeMovement.mouse.start)

		this.dLM
			.ad('mousemove',
				event => {
					this.oMmTm(event)
				})
			('touchmove',
				event => {
					this.oMmTm(event)
				})
	}

	/**
	 * On mousemove or touchmove
	 */
	private oMmTm(
		ev, // event
	): void {
		if (!Object.keys(this.viewport.el).length) {
			return
		}
		const touches = ev.touches

		// Only perform rotation if one touch or mouse (e.g. still scale with pinch and zoom)
		if (!document.ontouchmove !== undefined || !(touches && touches.length > 1)) {
			try {
				ev.preventDefault()
			} catch (_) {
			}
			const point = touches ? touches[0] : ev
			// Get touch co-ords
			// ev.originalEvent.touches ? ev = ev.originalEvent.touches[0] : null
			// dispatch 'move-viewport' event
			this.moveViewport({ x: point.screenX, y: point.screenY }, this.viewport)
		}
	}

	private populateCoords(
		ev: MouseEvent | TouchEvent, // Event,
		touches: TouchList,
		start: IPosition
	): void {
		const p: MouseEvent | Touch = touches
			? touches[0]
			: ev as MouseEvent
		start.x = p.pageX
		start.y = p.pageY
	}

	private populateEndCoords(
		ev: MouseEvent | TouchEvent, // Event,
		end: IPosition
	): void {
		return this.populateCoords(ev, (ev as TouchEvent).changedTouches, end)
	}

	private populateStartCoords(
		ev: MouseEvent | TouchEvent, // Event,
		start: IPosition
	): void {
		// ev.originalEvent.touches ? ev = ev.originalEvent.touches[0] : null
		return this.populateCoords(ev, (ev as TouchEvent).touches, start)
	}

	/*
	private populateAgreementFactor(
		axis: Factor_Axis,
		uiAgreement: ICubeAgreement
	): void {
		const agreement                    = uiAgreement.agreement
		const agreementFactor: IUiAgreementFactor = agreement[uiAgreement.axisToFactorMapping[axis]]
		const agreementDimension           = uiAgreement[axis]
		agreementFactor.outcome            = null
		if (agreementDimension.dir === 1) {
			agreementFactor.outcome = 'A'
		} else if (agreementDimension.dir === -1) {
			agreementFactor.outcome = 'B'
		}
		agreementFactor.value = agreementDimension.value
	}
*/
	/**
	 * Remove mousemove or touchmove
	 */
	private rmMmTm(): void {
		if (!Object.keys(this.viewport.el).length) {
			return
		}
		this.dLM.rm('mousemove')('touchmove')
	}

	private safeOMdTs(
		event: MouseEvent | TouchEvent
	): void {
		if (this.suspended) {
			return
		}
		this.oMdTs(event)
	}

	private safeRmMmTm(): void {
		if (this.suspended) {
			return
		}

		this.rmMmTm()
	}
}
