import { Injected } from '@airport/direction-indicator'
import {PositionPercent}  from './CubeMovement'

export enum MoveIncrement {
	FORTY_FIVE = 45,
	FIFTEEN    = 15,
	FIVE       = 5,
}

export type NumDivisions = 72

export type ZoomIndex = 0 | 1 | 2

export type PositionValues = [
	PositionPercent, PositionPercent, PositionPercent,
	PositionPercent, PositionPercent, PositionPercent
]

export type MatrixIndex =
	0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
	10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 |
	20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 |
	30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 |
	40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 |
	50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 |
	60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 |
	70 | 71

export type ValueArrayPosition = 0 | 1 | 2 | 3 | 4 | 5

export type PositionValueTemplate = [
	PositionPercent, PositionPercent, PositionPercent
]

export interface ICubeMoveMatrix {

	MOVE_INCREMENTS: MoveIncrement[]
	MV_INC_IDX: { [key: string]: ZoomIndex }
	NUM_DIVISIONS: NumDivisions
	NUM_VALS: number
	STEP_DEGS: number
	VALUE_MATRIX: PositionValues[][]

}

@Injected()
export class CubeMoveMatrix
	implements ICubeMoveMatrix {

	MOVE_INCREMENTS = [
		MoveIncrement.FORTY_FIVE,
		MoveIncrement.FIFTEEN,
		MoveIncrement.FIVE
	]

	MV_INC_IDX: { [key: string]: ZoomIndex } = {
		[MoveIncrement.FORTY_FIVE]: 0,
		[MoveIncrement.FIFTEEN]: 1,
		[MoveIncrement.FIVE]: 2,
	}

	NUM_DIVISIONS: NumDivisions = 72
	// NUM_DIVS: NumDivisions = 72

	NUM_VALS  = 6
	STEP_DEGS = 5

	VALUE_MATRIX: PositionValues[][] = []

	/* tslint:disable:max-line-length */
	//  4   0   1
	private fiveDegreeValueTemplate: PositionValueTemplate[][] = [
		[[0, 0, 100], [0, 0, 100], [0, 0, 100], [6, 0, 94], [13, 0, 87], [20, 0, 80], [28, 0, 72], [35, 0, 65], [42, 0, 58], [50, 0, 50]],
		[[0, 0, 100], [0, 0, 100], [0, 0, 100], [6, 0, 94], [13, 0, 87], [20, 0, 80], [28, 0, 72], [35, 0, 65], [42, 0, 58], [50, 0, 50]],
		[[0, 0, 100], [0, 0, 100], [0, 0, 100], [6, 0, 94], [13, 0, 87], [20, 0, 80], [28, 0, 72], [35, 0, 65], [42, 0, 58], [50, 0, 50]],
		[[0, 6, 94], [0, 6, 94], [0, 6, 94], [5, 6, 89], [12, 6, 82], [19, 6, 75], [26, 6, 68], [33, 6, 61], [40, 6, 54], [47, 6, 47]],
		[[0, 13, 87], [0, 13, 87], [0, 13, 87], [5, 13, 82], [11, 13, 76], [18, 13, 69], [26, 12, 62], [31, 12, 57], [37, 12, 51], [44, 12, 44]],
		[[0, 20, 80], [0, 21, 79], [0, 21, 79], [4, 21, 75], [10, 20, 70], [16, 20, 64], [22, 19, 59], [28, 19, 53], [34, 19, 47], [40, 20, 40] /*41,19,41*/],
		[[0, 28, 72], [0, 28, 72], [0, 28, 72], [3, 28, 69], [9, 27, 64], [14, 27, 59], [20, 26, 54], [26, 26, 48], [31, 26, 43], [37, 26, 37]],
		[[0, 35, 65], [0, 35, 65], [0, 36, 64], [2, 35, 63], [7, 35, 58], [13, 34, 53], [18, 33, 49], [23, 33, 44], [28, 33, 39], [34, 32, 34] /*34, 33, 34*/],
		[[0, 42, 58], [0, 43, 57], [0, 43, 57], [1, 43, 56], [6, 42, 52], [11, 41, 48], [16, 41, 43], [20, 40, 40], [25, 40, 35], [30, 40, 30]],
		[[0, 50, 50], [0, 50, 50], [0, 51, 49], [0, 51, 49], [4, 50, 46], [9, 49, 42], [13, 49, 38], [17, 48, 35], [22, 48, 30], [26, 48, 26]],
		[[0, 57, 43], [0, 57, 43], [0, 58, 42], [0, 59, 41], [3, 58, 39], [7, 57, 36], [11, 56, 33], [14, 56, 30], [18, 56, 26], [22, 56, 22]],
		[[0, 65, 35], [0, 65, 35], [0, 65, 35], [0, 66, 34], [1, 66, 33], [5, 65, 30], [8, 65, 27], [11, 64, 25], [15, 64, 21], [18, 64, 18]],
		[[0, 72, 28], [0, 72, 28], [0, 73, 27], [0, 73, 27], [0, 74, 26], [2, 74, 24], [5, 73, 22], [8, 72, 20], [11, 72, 17], [14, 72, 14]],
		[[0, 79, 21], [0, 79, 21], [0, 80, 20], [0, 80, 20], [0, 81, 19], [0, 82, 18], [2, 82, 16], [5, 81, 14], [7, 81, 12], [9, 82, 9]],
		[[0, 86, 14], [0, 86, 14], [0, 87, 13], [0, 87, 13], [0, 88, 12], [0, 89, 11], [0, 90, 10], [1, 90, 9], [3, 90, 7], [5, 90, 5]],
		[[0, 93, 7], [0, 93, 7], [0, 94, 6], [0, 94, 6], [0, 95, 5], [0, 95, 5], [0, 96, 4], [0, 97, 3], [0, 98, 2], [0, 100, 0]],
		[[0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0]],
		[[0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0]],
		[[0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0], [0, 100, 0]],
	]
	/* tslint:enable:max-line-length */

// always starting at perpendicular x (due to 7 positions defined)
// starting from full square and going towards 45/45 (in y)
// same for every 4 MATRIX_TEMPLATE_DIRECTED POSITIONS
	private matrixMoveXY = [
		// right side up
		// 4 sequential positions for each entry, repeating (16 total)
		[-1, 1], // left top right
		[-1, -1], // right top left
		[1, 1],  // left bottom left
		[1, -1]   // right bottom left
		// next 16 - upside down, repeats in movement
	]

// right side up
// (in x & y directions specified by the move matrix)
	private matrixTemplateDirectedPositions = [
		// right side up
		// left top right, x-axis start, y-axis start
		[4, 0, 1, 8, 8],
		[3, 0, 4, 8, 2],
		[2, 0, 3, 8, 4],
		[1, 0, 2, 8, 6],
		// right top left
		[1, 0, 4, 8, 2],
		[4, 0, 3, 8, 4],
		[3, 0, 2, 8, 6],
		[2, 0, 1, 8, 8],

		// next 8 - top and bottom are flipped (5 instead of 0)

		// next 16 - upside down, second is flipped (5 to 0 and back),
		// initial offset 180 abs(-12), 180 (+12%24)

	]
// 4 sequential positions for each entry, repeating (16 total)
	private tempMatrixMoveXY                = []

	constructor() {
		for (let i = 0; i < 4; i++) {
			for (let _ = 0; _ < 4; _++) {
				this.tempMatrixMoveXY.push(this.matrixMoveXY[i])
			}
		}

// next 16 - upside down, repeats in movement
		for (let i = 0; i < 16; i++) {
			this.tempMatrixMoveXY.push(this.tempMatrixMoveXY[i])
		}
		this.matrixMoveXY = this.tempMatrixMoveXY

// next 8 - top and bottom are flipped (5 instead of 0)
		for (let i = 0; i < 8; i++) {
			const template = this.matrixTemplateDirectedPositions[i]
			this.matrixTemplateDirectedPositions.push(
				[template[0], 5, template[2], template[3], template[4]])
		}

// next 16 - upside down, second is flipped (5 to 0 and back),
// initial offset -180 abs(-12), 180 (12)
		for (let i = 0; i < 16; i++) {
			const template = this.matrixTemplateDirectedPositions[i]
			const upDown   = template[1] === 0 ? 5 : 0
			this.matrixTemplateDirectedPositions.push([
				template[0], upDown, template[2], Math.abs(template[3] - 12),
				template[4] + 12])
		}

		this.populateValueMatrix(19, 10,
			this.fiveDegreeValueTemplate, this.NUM_DIVISIONS,
			9, this.VALUE_MATRIX)
	}

	private populateValueMatrix(
		endX: number,
		endY: number,
		matrixValueTemplate: PositionValueTemplate[][],
		numDivisions: NumDivisions,
		indexStartMultiplier: 9,
		valueMatrix: PositionValues[][]
	): void {
		for (let i = 0; i < numDivisions; i++) {
			valueMatrix.push([] as any)
		}

		for (let i = 0; i < 32; i++) {
			const subMatrixPositions = this.matrixTemplateDirectedPositions[i]
			const moveSubMatrix      = this.matrixMoveXY[i]

			const positionStartX       = subMatrixPositions[3] * indexStartMultiplier
			const positionStartY       = subMatrixPositions[4] * indexStartMultiplier
			const loopEndX             = moveSubMatrix[0] === 1 ? endX : -endX
			const isPositiveDirectionX = moveSubMatrix[0] === 1 ? 1 : 0
			for (
				let x = 0;
				isPositiveDirectionX ? x < loopEndX : x > loopEndX;
				isPositiveDirectionX ? x++ : x--) {
				const loopEndY             = moveSubMatrix[1] === 1 ? endY : -endY
				const isPositiveDirectionY = moveSubMatrix[1] === 1 ? 1 : 0
				const xValueTemplate       = matrixValueTemplate[Math.abs(x)]
				for (
					let y = 0;
					isPositiveDirectionY ? y < loopEndY : y > loopEndY;
					isPositiveDirectionY ? y++ : y--) {
					const yValueTemplate                    = xValueTemplate[Math.abs(y)]
					const values: PositionValues            = [0, 0, 0, 0, 0, 0]
					values[subMatrixPositions[0]]           = yValueTemplate[0]
					values[subMatrixPositions[1]]           = yValueTemplate[1]
					values[subMatrixPositions[2]]           = yValueTemplate[2]
					valueMatrix[(positionStartX + x) % numDivisions]
						[(positionStartY + y) % numDivisions] = values
				}
			}
		}
	}
}
