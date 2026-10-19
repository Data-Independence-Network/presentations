import {PositionValues} from '../CubeMoveMatrix'

export type DistanceFromClosestMatrixPosition =
	0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
	10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 |
	20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 |
	30 | 31 | 32 | 33 | 24 | 35 | 36

export type PositionAlignmentScore =
	-3 | -2 | -1 | 0 | 1 | 2 | 3

export type PercentChange = 5 | 20 | 33

export interface IFinalPosition {
	x: number
	y: number
}

export type NumberOfNonZeroPositions = 1 | 2 | 3

export type Outcome_Ordinal = 'A' | 'B'

export type Factor_Number = 1 | 2 | 3

export interface IMatrixPosition {
	done?: boolean
	i: number
	j: number
	key?: string
	numNonZeroPos?: NumberOfNonZeroPositions
	values: PositionValues
}
