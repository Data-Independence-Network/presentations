import { Outcome_Ordinal } from './mutation/types'
import {
	ICubeMoveMatrix,
	MoveIncrement,
	PositionValues,
	ValueArrayPosition,
	ZoomIndex
} from './CubeMoveMatrix'
import {
	Bool,
	Direction,
	ICubeAgreement,
	ICubeAgreementDimension,
	ICubeMovement,
	IValuesThruCallback,
	Move
} from './CubeMovement'
import { Inject, Injected } from '@airport/direction-indicator'

export interface IViewport {

	cb: IValuesThruCallback
	cr: ICubeRotation
	el: { [elementId: string]: Element }
	increment: MoveIncrement
	pd: ICubeAgreement
	// Recently Moved Dimension
	rmd: Dimension[]
	x: number
	// xi: number
	y: number
	// yi: number
	vd: IVisibleDirection

	// zm: ZoomIndex

	move(
		moveX: Bool,
		xBy: Move,
		moveY?: Bool,
		yBy?: Move
	): void

	moveToDegree(): void

	changeZoom(
		// zoomLevel: ZoomLevel
		zoomIndex: ZoomIndex
	): void

	reset(): void

}

export interface ICubeRotation {
	x: number,
	y: number
}

export interface IVisibleDirection {
	x: Direction,
	y: Direction,
	z: Direction
}

export type Dimension = 'x' | 'y' | 'z'

@Injected()
export class Viewport
	implements IViewport {

	@Inject()
	cubeMoveMatrix: ICubeMoveMatrix

	@Inject()
	cubeMovement: ICubeMovement

	cb = null
	cr = {
		x: 0,
		y: 0
	}
	el = {}
	increment = MoveIncrement.FIVE
	pd = null
	// Recently moved factor
	rmd = []
	vd = {
		x: 1 as Direction,
		y: 1 as Direction,
		z: 1 as Direction
	}
	x = 0
	y = 0

	// zm: MV_INC_IDX[MoveIncrement.FIFTEEN],
	changeZoom(
		zoomIndex: ZoomIndex
	): void {
		this.increment = this.cubeMoveMatrix.MOVE_INCREMENTS[zoomIndex]

		console.log('TODO: implement')
	}

	move(
		moveX: Bool,
		xBy: Move,
		moveY: Bool,
		yBy: Move
	): void {
		if (!Object.keys(this.el).length) {
			return
		}
		if (!moveX && !moveY) {
			return
		}
		let xi
		let yi
		if (moveX) {
			[this.x, xi] = this.cubeMovement.moveCoordinates(
				// this.zm,
				this.x, xBy)
		} else {
			xi = this.cubeMovement.getMatrixIdxFromDeg(this.x)
		}
		if (moveY) {
			[this.y, yi] = this.cubeMovement.moveCoordinates(
				// this.zm,
				this.y, yBy)
		} else {
			yi = this.cubeMovement.getMatrixIdxFromDeg(this.y)
		}

		const values = this.cubeMoveMatrix.VALUE_MATRIX[xi][yi]

		function getDimensionState(
			positivePosition: ValueArrayPosition,
			negativePosition: ValueArrayPosition,
			positionValues: PositionValues,
			agreementDimension: ICubeAgreementDimension
		): void {
			let outcome: Outcome_Ordinal = 'A'
			let value = positionValues[positivePosition]
			if (positionValues[negativePosition]) {
				outcome = 'B'
				value = positionValues[negativePosition]
			} else if (!value) {
				outcome = null
			}
			agreementDimension.outcome = outcome
			agreementDimension.valid = true
			agreementDimension.value = value
		}

		getDimensionState(0, 5, values, this.pd.x)
		getDimensionState(1, 3, values, this.pd.y)
		getDimensionState(2, 4, values, this.pd.z)

		this.moveToDegree()
	}

	/**
	 * Need to be able to move to a particular angle
	 */
	moveToDegree(): void {
		if (!this.cb) {
			return
		}
		// console.log('x: ' + this.x + '\t\ty: ' + this.y)
		this.cb(this.pd)

		for (const elementId in this.el) {
			this.el[elementId].style.transform = 'rotateX(' + this.x + 'deg) rotateY(' + this.y + 'deg)'
		}
	}

	reset(): void {
		if (!Object.keys(this.el).length) {
			return
		}
		this.increment = MoveIncrement.FIVE
		this.move(0, 0, 0, 0)
	}

}
