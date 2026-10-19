import { Inject, Injected } from '@airport/direction-indicator'
import type {
	IUiAgreement,
	IUiAgreementFactor,
	AgreementFactor_Value
} from '@votecube/model'
import {
	ICubeMoveMatrix,
	MatrixIndex
} from './CubeMoveMatrix'

export enum Bool {
	False = 0,
	True = 1
}

export enum Move {
	Down = -1,
	None = 0,
	Up = 1
}

export type Direction = -1 | 0 | 1

export type PositionPercent = AgreementFactor_Value

export interface IPosition {

	x: number
	y: number

}

export interface IMousePosition {

	last?: IPosition
	start: IPosition

}

export interface ICubeAgreement {

	// axisToFactorMapping: {
	// 	x: Factor_Number
	// 	y: Factor_Number
	// 	z: Factor_Number
	// }
	factorToAxisMapping: IFactorToAxisMapping
	agreement: IUiAgreement
	x: ICubeAgreementDimension
	y: ICubeAgreementDimension
	z: ICubeAgreementDimension

}

export type Factor_Axis = 'x' | 'y' | 'z'

export interface IFactorToAxisMapping {

	1: Factor_Axis
	2: Factor_Axis
	3: Factor_Axis

}

export interface ICubeAgreementDimension
	extends IUiAgreementFactor {
	valid: boolean
}

export type IValuesOutCallback =
	(agreement: IUiAgreement) => void

export type IValuesThruCallback =
	(agreement: ICubeAgreement) => void

export interface ICubeMovement {

	mouse: IMousePosition

	getMatrixIdxFromDeg(
		rotationDegrees: number,
	): MatrixIndex

	moveCoordinates(
		// zoomIndex: ZoomIndex,
		currentDegree: number,
		move: Move,
	): [number, MatrixIndex]

	normMatrixIdx(
		signedMatrixIndex: number,
	): MatrixIndex

}

@Injected()
export class CubeMovement
	implements ICubeMovement {

	@Inject()
	cubeMoveMatrix: ICubeMoveMatrix

	mouse: IMousePosition = {
		start: { x: undefined, y: undefined }
	}

	/*
	export function getModXAbsRemainder(
		num: number,
		moveIncrement: MoveIncrement
	): number {
		const axis     = MV_INC_IDX[moveIncrement]
		const divisions = NUM_DIVISIONS[axis]
		let remainder   = num % divisions
		if (remainder < 0) {
			remainder = divisions + remainder
		}

		return remainder
	}
	*/

	getMatrixIdxFromDeg(
		rotationDegrees: number
	): MatrixIndex {
		const signedMatrixIndex = Math.floor(rotationDegrees % 360 / this.cubeMoveMatrix.STEP_DEGS)

		return this.normMatrixIdx(signedMatrixIndex)
	}

	moveCoordinates(
		// zoomIndex: ZoomIndex,
		currentDegree: number,
		move: Move,
	): [number, MatrixIndex] {
		// not needed checked higher
		// if (!move) {
		// 	return [currentDegree, null]
		// }

		// let zoomMultiplier = 9
		// if (zoomIndex === 1) {
		// 	zoomMultiplier = 3
		// } else if (zoomIndex === 2) {
		// 	zoomMultiplier = 1
		// }

		const degreeChange = this.cubeMoveMatrix.STEP_DEGS
		// * zoomMultiplier
		let zoomedMatrixIndex = Math.floor(
			currentDegree % 360 / degreeChange
		)

		const currentDegreeRemainder = currentDegree % degreeChange
		if (move > 0) {
			zoomedMatrixIndex++
		} else {
			if (!currentDegreeRemainder) {
				zoomedMatrixIndex--
			}
		}

		let page = Math.floor(currentDegree / 360)
		if (currentDegree < 0) {
			page = -Math.floor(Math.abs(currentDegree) / 360)
		}

		const rotation = page * 360 + zoomedMatrixIndex * degreeChange
		const matrixIndex = this.normMatrixIdx(zoomedMatrixIndex
			// * zoomMultiplier
		)

		return [rotation, matrixIndex]
	}

	normMatrixIdx(
		signedMatrixIndex: number,
	): MatrixIndex {
		const numberOfMatrixDivisions = this.cubeMoveMatrix.NUM_DIVISIONS

		let normalizedMatrixIndex = signedMatrixIndex
		if (signedMatrixIndex < 0) {
			normalizedMatrixIndex = numberOfMatrixDivisions + signedMatrixIndex as MatrixIndex
		}

		return (normalizedMatrixIndex % numberOfMatrixDivisions) as MatrixIndex
	}

}
