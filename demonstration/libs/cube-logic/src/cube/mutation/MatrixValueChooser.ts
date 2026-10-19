import { Inject, Injected } from '@airport/direction-indicator'
import { ICubeUtils } from '../../utils/CubeUtils'
import {
	ICubeMoveMatrix,
	PositionValues,
	ValueArrayPosition
} from '../CubeMoveMatrix'
import {
	ICubeAgreement,
	ICubeAgreementDimension
} from '../CubeMovement'
import { IViewport } from '../Viewport'
import {
	DistanceFromClosestMatrixPosition,
	IMatrixPosition
} from './types'

const MAX_DIST = 12

export interface IMatrixValueChooser {

	getClosestMatrixPosition(
	): IMatrixPosition

}

@Injected()
export class MatrixValueChooser
	implements IMatrixValueChooser {

	@Inject()
	cubeMoveMatrix: ICubeMoveMatrix

	@Inject()
	cubeUtils: ICubeUtils

	@Inject()
	viewport: IViewport

	getClosestMatrixPosition(
	): IMatrixPosition {
		const x = this.viewport.pd.x
		if (x.value === 100
			&& x.outcome === 'B') {

			return {
				// FIXME: errored out in this position
				// i: 30,
				// j: 36,
				i: 20,
				j: 36,
				values: this.cubeMoveMatrix.VALUE_MATRIX[20][36]
			}
		}
		const positionsWithZeroes = this.getZeroedPositions()
		const matrixPosition = this.getClosestPositionByDistanceAndMedian(
			positionsWithZeroes)

		matrixPosition.numNonZeroPos = 0 as any
		for (let k = 0; k < this.cubeMoveMatrix.NUM_VALS; k++) {
			if (!positionsWithZeroes[k]) {
				matrixPosition.numNonZeroPos++
			}
		}

		return matrixPosition
	}

	private getClosestPositionByDistanceAndMedian(
		positionsWithZeroes: boolean[]
	): IMatrixPosition {
		// need to find the percentages that best endPoint the specified ones
		const valueMatrix = this.cubeMoveMatrix.VALUE_MATRIX

		const newPositionData: ICubeAgreement = this.viewport.pd

		let lowestLargest = 50
		let lowestMedian = 33
		let lowestSum = 100
		let currentlyUpsideDown = 1
		let position: IMatrixPosition

		for (let i = 0; i < valueMatrix.length; i++) {
			const dimensionMatrix = valueMatrix[i]
			value_loop:
			for (let j = 0; j < dimensionMatrix.length; j++) {
				const values = dimensionMatrix[j]
				for (let k = 0; k < this.cubeMoveMatrix.NUM_VALS; k++) {
					if (positionsWithZeroes[k]) {
						if (values[k]) {
							continue value_loop
						}
					} else {
						if (!values[k]) {
							continue value_loop
						}
					}
				}

				const xDistance = this.getDimensionDistance(newPositionData.x,
					values, 0, 5, positionsWithZeroes)
				if (xDistance === undefined) {
					continue
				}

				const yDistance = this.getDimensionDistance(newPositionData.y,
					values, 1, 3, positionsWithZeroes)
				if (yDistance === undefined) {
					continue
				}

				const zDistance = this.getDimensionDistance(newPositionData.z,
					values, 2, 4, positionsWithZeroes)
				if (zDistance === undefined) {
					continue
				}

				const sortedValues = [xDistance, yDistance, zDistance].sort()
				const median = sortedValues[1]
				const largest = sortedValues[2]
				const sum = xDistance + yDistance + zDistance
				const upsideDown = i > 18 && i < 54 ? 1 : 0
				if (this.cubeUtils.secondIsGreaterShortCircuit([
					[sum, lowestSum],
					[median, lowestMedian],
					[largest, lowestLargest],
					[upsideDown, currentlyUpsideDown]
				])) {
					lowestLargest = largest
					lowestMedian = median
					lowestSum = sum
					currentlyUpsideDown = upsideDown
					position = {
						i,
						j,
						values
					}
				}
			}
		}

		return position
	}

	private getZeroedPositions(
	): boolean[] {
		const positionData = this.viewport.pd

		const zeroedPositions: boolean[] = []

		this.setDimZeroPositions(positionData.x, 0, 5, zeroedPositions)
		this.setDimZeroPositions(positionData.y, 1, 3, zeroedPositions)
		this.setDimZeroPositions(positionData.z, 2, 4, zeroedPositions)

		return zeroedPositions
	}

	private setDimZeroPositions(
		agreementDimension: ICubeAgreementDimension,
		plusIndex: ValueArrayPosition,
		minusIndex: ValueArrayPosition,
		zeroedPositions: boolean[]
	) {
		if (agreementDimension.value) {
			if (agreementDimension.outcome === 'A') {
				zeroedPositions[minusIndex] = true
			} else {
				zeroedPositions[plusIndex] = true
			}
		} else {
			zeroedPositions[plusIndex] = true
			zeroedPositions[minusIndex] = true
		}
	}

	private getDimensionDistance(
		newAgreementDimension: ICubeAgreementDimension,
		positionData: PositionValues,
		positiveIndex: ValueArrayPosition,
		negativeIndex: ValueArrayPosition,
		positionsWithZeroes: boolean[]
	): DistanceFromClosestMatrixPosition | undefined {
		let positiveDistance = 0
		const maximumDistance = MAX_DIST
		if (!positionsWithZeroes[positiveIndex]) {
			positiveDistance = Math.abs(positionData[positiveIndex]
				- newAgreementDimension.value)
			if (positiveDistance > maximumDistance) {
				return undefined
			}
		}
		let negativeDistance = 0
		if (!positionsWithZeroes[negativeIndex]) {
			negativeDistance = Math.abs(positionData[negativeIndex]
				- newAgreementDimension.value)
			if (negativeDistance > maximumDistance) {
				return undefined
			}
		}
		return (positiveDistance > negativeDistance
			? positiveDistance
			: negativeDistance) as DistanceFromClosestMatrixPosition
	}

}
