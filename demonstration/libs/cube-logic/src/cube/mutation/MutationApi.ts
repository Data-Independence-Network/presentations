import { Inject, Injected } from '@airport/direction-indicator'
import { ICubeMoveMatrix, IDegreePositionChooser } from '../../cube-logic.index'
import { ICubeUtils } from '../../utils/CubeUtils'
import { IEventListenerMap } from '../../utils/EventListenerMap'
import {
	ICubeMovement,
	PositionPercent
} from '../CubeMovement'
import {
	Dimension,
	IViewport
} from '../Viewport'
import { IFinalPositionFinder } from './FinalPositionFinder'
import { IMatrixValueChooser } from './MatrixValueChooser'
import { IPercentagePositionChooser } from './PercentagePositionChooser'
import {
	Factor_Number,
	Outcome_Ordinal,
	PercentChange
} from './types'

export interface IMutationApi {

	/*	changeZoom(
			zoomIndex: ZoomIndex
		): void*/

	move(
		factorNumber: Factor_Number,
		outcome: Outcome_Ordinal,
		percentChange: PercentChange
	): void

	moveToValue(
		factorNumber: Factor_Number,
		value: PositionPercent
	): Promise<void>

	recompute(): Promise<void>

	toggleSurface(
		factorNumber: Factor_Number
	): void

}

@Injected()
export class MutationApi
	implements IMutationApi {

	@Inject()
	cubeMoveMatrix: ICubeMoveMatrix

	@Inject()
	cubeMovement: ICubeMovement

	@Inject()
	cubeUtils: ICubeUtils

	@Inject()
	degreePositionChooser: IDegreePositionChooser

	@Inject()
	eventListenerMap: IEventListenerMap

	@Inject()
	finalPositionFinder: IFinalPositionFinder

	@Inject()
	matrixValueChooser: IMatrixValueChooser

	@Inject()
	mutationApi: IMutationApi

	@Inject()
	percentagePositionChooser: IPercentagePositionChooser

	@Inject()
	viewport: IViewport

	/*	changeZoom(
			zoomIndex: ZoomIndex
		): void {
			// this.vp.zm = zoomIndex
		}*/

	move(
		factorNumber: Factor_Number,
		outcome: Outcome_Ordinal,
		percentChange: PercentChange
	): void {
		const dimension = this.viewport.pd.factorToAxisMapping[factorNumber]
		const dimensionPositionData = this.viewport.pd[dimension]
		if (dimensionPositionData.value === 100
			&& dimensionPositionData.outcome === outcome) {
			return
		}
		// let percentChange = this.getPercentChange()

		this.moveToPercent(dimension, null, percentChange, outcome)
	}

	async moveToValue(
		factorNumber: Factor_Number,
		value: PositionPercent
	): Promise<void> {
		const dimension = this.viewport.pd.factorToAxisMapping[factorNumber]
		const numericValue = parseInt(value as any) as PositionPercent
		this.viewport.pd[dimension].valid = !isNaN(value) && numericValue >= 0 && numericValue <= 100
		if (!this.viewport.pd[dimension].valid) {
			this.viewport.cb(this.viewport.pd)
			return
		}
		this.moveToPercent(dimension, numericValue)
	}

	async toggleSurface(
		factorNumber: Factor_Number
	): Promise<void> {
		const dimension = this.viewport.pd.factorToAxisMapping[factorNumber]
		const dimensionPositionData = this.viewport.pd[dimension]
		if (!dimensionPositionData.outcome) {
			dimensionPositionData.outcome = 'A'
		} else if (dimensionPositionData.value === 100) {
			dimensionPositionData.outcome = dimensionPositionData.outcome === 'A' ? 'B' : 'A'
		}
		switch (dimension) {
			case 'x': {
				this.viewport.pd.y.outcome = null
				this.viewport.pd.z.outcome = null
				break
			}
			case 'y': {
				this.viewport.pd.x.outcome = null
				this.viewport.pd.z.outcome = null
				break
			}
			case 'z': {
				this.viewport.pd.x.outcome = null
				this.viewport.pd.y.outcome = null
				break
			}
		}
		this.moveToPercent(dimension, 100)
	}

	async recompute(): Promise<void> {
		if (!this.viewport.pd) {
			return
		}
		const closestMatrixPosition = this.matrixValueChooser.getClosestMatrixPosition()

		const finalPosition = this.finalPositionFinder.findFinalPosition(
			closestMatrixPosition)

		this.degreePositionChooser.setFinalDegrees(finalPosition)
	}

	private moveToPercent(
		dimension: Dimension,
		newPercent: PositionPercent,
		percentChange?: PercentChange,
		outcome?: Outcome_Ordinal,
	): void {
		// First see the order of recently moved dimensions
		this.viewport.rmd = this.viewport.rmd.filter(
			changedDim => dimension !== changedDim)
		this.viewport.rmd.unshift(dimension)
		const numPreviousMoves = this.viewport.rmd.length
		if (numPreviousMoves > 3) {
			this.viewport.rmd.pop()
		}

		if (percentChange) {
			this.percentagePositionChooser.changePositionPercentages(
				dimension, percentChange, outcome)
		} else {
			this.percentagePositionChooser.setPositionPercentages(
				dimension, newPercent, this.viewport.pd[dimension].outcome)
		}

		this.recompute()
	}

	/*
	private getPercentChange(): PercentChange {
		// switch (this.vp.zm) {
		// 	case 0:
		// 		return 33
		// 	case 1:
		// 		return 20
		// 	case 2:
		return 5
		// }
	}
*/

}
