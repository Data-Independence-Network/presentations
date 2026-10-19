import { Inject, Injected } from '@airport/direction-indicator'
import { ICubeUtils } from '../../utils/CubeUtils'
import {
	ICubeMoveMatrix,
	MatrixIndex,
	PositionValues,
	ValueArrayPosition
} from '../CubeMoveMatrix'
import {
	Direction,
	ICubeMovement,
	ICubeAgreementDimension,
	PositionPercent
} from '../CubeMovement'
import { IViewport } from '../Viewport'
import {
	DistanceFromClosestMatrixPosition,
	IFinalPosition,
	IMatrixPosition,
	PositionAlignmentScore
} from './types'

export interface INeighborDistance {
	valueDists: DistanceFromClosestMatrixPosition[],
	dist: DistanceFromClosestMatrixPosition,
	maxDistIndex: ValueArrayPosition
}

export interface IMatrixPositionMatch {
	alignScore: PositionAlignmentScore,
	dimDists: DistanceFromClosestMatrixPosition[]
	dimShifts: NumberOfDimensionShifts
	dist: DistanceFromClosestMatrixPosition
	iShift: MatrixPositionShift
	jShift: MatrixPositionShift
	shiftScore: MatrixShiftScore
	values: PositionValues
}

export interface IVectorPosition {
	exactMatches: Map<string, IMatrixPosition>
	endPoint: IMatrixPositionMatch
}

export interface IEndPointPosition {
	match: IMatrixPositionMatch
	neighborDists: INeighborDistance[][]
}

export type MatrixPositionShift = -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5
export type MatrixShiftScore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type NumberOfDimensionShifts = 0 | 1 | 2

export interface IFinalPositionFinder {

	findFinalPosition(
		closestMatrixPosition: IMatrixPosition,
	): IFinalPosition

}

@Injected()
export class FinalPositionFinder
	implements IFinalPositionFinder {

	@Inject()
	viewport: IViewport

	@Inject()
	cubeUtils: ICubeUtils

	@Inject()
	cubeMoveMatrix: ICubeMoveMatrix

	@Inject()
	cubeMovement: ICubeMovement

	findFinalPosition(
		closestMatrixPosition: IMatrixPosition,
	): IFinalPosition {
		const positionData = this.viewport.pd

		const [xPos, xNeg] = this.getDirectionVals(positionData.x)
		const [yPos, yNeg] = this.getDirectionVals(positionData.y)
		const [zPos, zNeg] = this.getDirectionVals(positionData.z)
		const newPosition: PositionValues = [
			xPos,
			yPos,
			zPos,
			yNeg,
			zNeg,
			xNeg,
		]
		const matrixStepDegrees = this.cubeMoveMatrix.STEP_DEGS
		if (this.matrixPositionsMatch(closestMatrixPosition.values, newPosition)) {
			return {
				x: closestMatrixPosition.i * matrixStepDegrees,
				y: closestMatrixPosition.j * matrixStepDegrees
			}
		}

		const vectorPosition: IVectorPosition = {
			endPoint: {
				alignScore: -1,
				dist: 100
			},
			exactMatches: new Map()
		} as any
		this.findVectorEndPoint(
			{}, newPosition, closestMatrixPosition,
			vectorPosition)
		const directionVectorMatch = vectorPosition.endPoint

		return this.get2DOffsetFinalPosition(
			closestMatrixPosition, directionVectorMatch)
	}

	private getDirectionVals(
		agreementDimension: ICubeAgreementDimension
	): [PositionPercent, PositionPercent] {
		return agreementDimension.outcome === 'A'
			? [agreementDimension.value, 0]
			: [0, agreementDimension.value]
	}

	private findVectorEndPoint(
		processedMatches: { [key: string]: IEndPointPosition },
		newPosition: PositionValues,
		closestMatrixPosition: IMatrixPosition,
		vectorPosition: IVectorPosition
	): void {
		const closestMatrixPositionKey = closestMatrixPosition.i + ':' + closestMatrixPosition.j
		closestMatrixPosition.key = closestMatrixPositionKey
		vectorPosition.exactMatches.set(closestMatrixPositionKey, closestMatrixPosition)
		const endPointPosition = this.findEndPointPosition(
			newPosition, closestMatrixPosition, vectorPosition.exactMatches)
		closestMatrixPosition.done = true

		const newMatch = endPointPosition.match
		if (this.positionIsABetterMatch(
			vectorPosition.endPoint,
			newMatch.alignScore,
			newMatch.shiftScore,
			newMatch.dist,
			newMatch.dimShifts
		)) {
			vectorPosition.endPoint = newMatch
		}
		for (const [key, exactMatchPosition] of vectorPosition.exactMatches) {
			if (!exactMatchPosition.done) {
				this.findVectorEndPoint(
					processedMatches, newPosition, exactMatchPosition,
					vectorPosition)
			}
		}
	}

	private matrixPositionsMatch(
		vals1: PositionValues,
		vals2: PositionValues
	) {
		for (let i = 0; i < this.cubeMoveMatrix.NUM_VALS; i++) {
			if (vals1[i] !== vals2[i]) {
				return false
			}
		}

		return true
	}

	private findEndPointPosition(
		newPosition: PositionValues,
		closestMatrixPosition: IMatrixPosition,
		exactMatches: Map<string, IMatrixPosition>
	): IEndPointPosition {
		const numValuesInArray = this.cubeMoveMatrix.NUM_VALS
		let dimensionMismatchInClosestPosition = false
		const closestValues = closestMatrixPosition.values
		const directionFromClosestPosition: Array<Direction | 0> = []
		for (let k = 0; k < numValuesInArray; k++) {
			if (!!closestValues[k] !== !!newPosition[k]) {
				// TODO: see if this is necessary
				dimensionMismatchInClosestPosition = true
			}
			directionFromClosestPosition[k] = this.getPositionDiffDirection(
				newPosition, closestValues, k as ValueArrayPosition)
		}

		let matrixPositionMatch: IMatrixPositionMatch
		const neighborDists: INeighborDistance[][] = [[], [], [], [], [], []]
		neighborDists[-1] = []
		neighborDists[-2] = []
		neighborDists[-3] = []
		neighborDists[-4] = []
		neighborDists[-5] = []
		const numberOfNonZeroPositions = closestMatrixPosition.numNonZeroPos

		for (
			let verticalMatrixShift: MatrixPositionShift = -5;
			verticalMatrixShift <= 5;
			verticalMatrixShift++) {
			position_loop: for (
				let horizontalMatrixShift: MatrixPositionShift = -5;
				horizontalMatrixShift <= 5;
				horizontalMatrixShift++) {
				if (verticalMatrixShift === 0 && horizontalMatrixShift === 0) {
					continue
				}
				const neighborI = this.base72Pos(
					closestMatrixPosition.i, verticalMatrixShift)
				const neighborJ = this.base72Pos(
					closestMatrixPosition.j, horizontalMatrixShift)

				const neighborPositionKey = neighborI + ':' + neighborJ
				if (exactMatches.has(neighborPositionKey)) {
					continue
				}
				const values = this.cubeMoveMatrix.VALUE_MATRIX[neighborI][neighborJ]

				let maxDistance: DistanceFromClosestMatrixPosition = 0
				const neighborDistance: INeighborDistance = {
					dist: maxDistance,
					maxDistIndex: null,
					valueDists: []
				}
				neighborDists[verticalMatrixShift][horizontalMatrixShift] = neighborDistance

				let exactMatch = true
				let numInRangePositions = 0
				let numOutOfRangePositions = 0
				for (let k = 0; k < numValuesInArray; k++) {
					const currentValue = values[k]
					if (closestValues[k] !== currentValue) {
						exactMatch = false
					}

					// 17 82 1
					const directionFromNeighbor = this.getPositionDiffDirection(
						newPosition, values, k as ValueArrayPosition)
					if (!currentValue && !newPosition[k]) {
						// positions are either not applicable or are equal => does not count
					} else {
						const directionFromClosest = directionFromClosestPosition[k]
						if (!directionFromClosest) {
							numInRangePositions++
						} else if (directionFromClosest === directionFromNeighbor) {
							numOutOfRangePositions++
						} else {
							numInRangePositions++
						}
					}
				}
				if (exactMatch) {
					exactMatches.set(neighborPositionKey, {
						i: neighborI,
						j: neighborJ,
						key: neighborPositionKey,
						values
					})
					continue
				}

				const alignScore = numInRangePositions
					- numOutOfRangePositions as PositionAlignmentScore
				if (
					alignScore < 0
					|| (numberOfNonZeroPositions < 3
						&& (numInRangePositions !== numberOfNonZeroPositions
							|| numOutOfRangePositions))
				) {
					continue
				}
				const dimDists: DistanceFromClosestMatrixPosition[] = []
				for (let k = 0; k < numValuesInArray; k++) {
					const currentDistance = Math.abs(newPosition[k]
						- values[k]) as DistanceFromClosestMatrixPosition
					neighborDistance.valueDists.push(currentDistance)
					dimDists.push(currentDistance)
					if (currentDistance > maxDistance) {
						maxDistance = currentDistance as DistanceFromClosestMatrixPosition
						neighborDistance.dist = maxDistance
						neighborDistance.maxDistIndex = k as ValueArrayPosition
					}
				}
				const [numberOfDimensionShifts, shiftScore] = this.getDimensionShift(
					verticalMatrixShift as MatrixPositionShift,
					horizontalMatrixShift as MatrixPositionShift)
				if (this.positionIsABetterMatch(
					matrixPositionMatch,
					alignScore,
					shiftScore,
					maxDistance,
					numberOfDimensionShifts
				)) {
					matrixPositionMatch = {
						alignScore,
						dimDists,
						dimShifts: numberOfDimensionShifts,
						dist: maxDistance,
						iShift: verticalMatrixShift as MatrixPositionShift,
						jShift: horizontalMatrixShift as MatrixPositionShift,
						shiftScore,
						values
					}
				}
			}
		}

		return {
			match: matrixPositionMatch,
			neighborDists
		}
	}

	private positionIsABetterMatch(
		preivousMatrixPositionMatch: IMatrixPositionMatch,
		newAlignScore: PositionAlignmentScore,
		newMatrixShiftScore: MatrixShiftScore,
		newDistance: DistanceFromClosestMatrixPosition,
		newNumberOfDimensionShifts: NumberOfDimensionShifts
	): boolean {
		return !preivousMatrixPositionMatch
			|| this.cubeUtils.secondIsGreaterShortCircuit([
				[preivousMatrixPositionMatch.alignScore, newAlignScore],
				[newMatrixShiftScore, preivousMatrixPositionMatch.shiftScore],
				[newDistance, preivousMatrixPositionMatch.dist],
				[newNumberOfDimensionShifts, preivousMatrixPositionMatch.dimShifts]
			])
	}

	private getDimensionShift(
		verticalMatrixShift: MatrixPositionShift,
		horizontalMatrixShift: MatrixPositionShift,
	): [NumberOfDimensionShifts, MatrixShiftScore] {
		const verticalCellDifference = Math.abs(verticalMatrixShift)
		const horizontalCellDifference = Math.abs(horizontalMatrixShift)
		const verticalDimensionShift = verticalCellDifference ? 1 : 0
		const horizontalDimensionShift = horizontalCellDifference ? 1 : 0

		return [
			verticalDimensionShift + horizontalDimensionShift as NumberOfDimensionShifts,
			verticalCellDifference + horizontalCellDifference as MatrixShiftScore
		]
	}

	private get2DOffsetFinalPosition(
		// newPosition: PositionValues,
		closestMatrixPosition: IMatrixPosition,
		directionVectorMatch: IMatrixPositionMatch
	): IFinalPosition {
		// 0 & 5 determine x movement
		// 1,2,3,4 determine y movement
		// need to take the distances from newPosition and apply them accordingly
		const separations = this.get2DDegreeSeparations(
			closestMatrixPosition, directionVectorMatch)
		const stepDegrees = this.cubeMoveMatrix.STEP_DEGS

		return {
			x: this.getFinalPositionOfDimension(
				closestMatrixPosition.i * stepDegrees,
				directionVectorMatch.iShift,
				separations.i
			),
			y: this.getFinalPositionOfDimension(
				closestMatrixPosition.j * stepDegrees,
				directionVectorMatch.jShift,
				separations.j
			)
		}
	}

	private getFinalPositionOfDimension(
		closestMatrixPositionDegrees: number,
		separationPositionShift: MatrixPositionShift,
		separation: number
	): number {
		// TODO: see if this should be > 0, with a special case for === 0
		if (separationPositionShift >= 0) {
			closestMatrixPositionDegrees += separation > 0
				? separation
				: -separation
			// } else if (separationDirection === -1) {
		} else {
			closestMatrixPositionDegrees -= separation > 0
				? separation
				: -separation
		}

		return closestMatrixPositionDegrees
	}

	private get2DDegreeSeparations(
		closestMatrixPosition: IMatrixPosition,
		directionVectorMatch: IMatrixPositionMatch
	): {
		i: number,
		j: number
	} {
		const cellSeparationDistances = this.getDirectionalDists(
			closestMatrixPosition, directionVectorMatch.values)
		const [largestIDistIndex, largestIDist] = this.getLargestDistAndIdx(
			[0, 5], cellSeparationDistances)
		const [largestJDistIndex, largestJDist] = this.getLargestDistAndIdx(
			[1, 2, 3, 4], cellSeparationDistances)

		const iDistance = directionVectorMatch.dimDists[largestIDistIndex]
		const iRatio = largestIDist ? 1 - iDistance / largestIDist : 0
		const jDistance = directionVectorMatch.dimDists[largestJDistIndex]
		const jRatio = largestJDist ? 1 - jDistance / largestJDist : 0

		return {
			i: this.getDegreeShift(directionVectorMatch.iShift, iRatio),
			j: this.getDegreeShift(directionVectorMatch.jShift, jRatio)
		}
	}

	private getDegreeShift(
		matrixCellShift: MatrixPositionShift,
		ratio: number
	): DistanceFromClosestMatrixPosition {
		const matrixStepDegrees = this.cubeMoveMatrix.STEP_DEGS
		let exactShift
		// if (matrixCellShift) {
		exactShift = (matrixStepDegrees * matrixCellShift) * ratio
		// } else {
		// 	exactShift = matrixStepDegrees * ratio
		// }

		return Math.round(exactShift) as DistanceFromClosestMatrixPosition
	}

	private getDirectionalDists(
		closestMatrixPosition: IMatrixPosition,
		directionVectorPositionValues: PositionValues
	): number[] {
		const distances = []
		for (let k = 0; k < this.cubeMoveMatrix.NUM_VALS; k++) {
			const currentDistance = Math.abs(
				directionVectorPositionValues[k]
				- closestMatrixPosition.values[k]) as DistanceFromClosestMatrixPosition
			distances.push(currentDistance)
		}

		return distances
	}

	private getLargestDistAndIdx(
		indexes: ValueArrayPosition[],
		dists: number[]
	): [ValueArrayPosition, DistanceFromClosestMatrixPosition] {
		let largestDist
		let largestDistIndex
		for (const index of indexes) {
			const dist = dists[index]
			if (!largestDist || largestDist < dist) {
				largestDist = dist
				largestDistIndex = index
			}
		}

		return [largestDistIndex, largestDist]
	}

	private base72Pos(
		matrixPosition: number,
		offset: number
	): MatrixIndex {
		const base72Position = (matrixPosition + offset) % this.cubeMoveMatrix.NUM_DIVISIONS

		return this.cubeMovement.normMatrixIdx(base72Position)
	}

	private getPositionDiffDirection(
		from: PositionValues,
		to: PositionValues,
		index: ValueArrayPosition
	): Direction | 0 {
		let direction: Direction | 0 = 0
		const positionDifference = from[index] - to[index]
		if (positionDifference > 0) {
			direction = 1
		} else if (positionDifference < 0) {
			direction = -1
		}

		return direction
	}

}
