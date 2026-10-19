import { Injected } from '@airport/direction-indicator'
import {
	ICubeEventListener,
	IMutationApi,
	IValuesOutCallback
} from '@votecube/cube-logic'
import {
	ICubeFactorPositionDefault,
	ICubePosition,
	ICubeReasonDefault,
} from '@votecube/model'

export interface ICubeLogic {

	getDefaultCubePositions(): ICubePosition[]

	getReasonDefault(): ICubeReasonDefault

	shutDownCubeListener(
		cubeEventListener: ICubeEventListener,
	): void

	setCubeAdjustment(
		cubeEventListener: ICubeEventListener,
		enableCubeAdjustment: boolean
	): void

	setCubeViewPort(
		cubeEventListener: ICubeEventListener,
		setMutationApi: (mutationApi: IMutationApi) => void,
		callback: IValuesOutCallback
	): void

}

@Injected()
export class CubeLogic
	implements ICubeLogic {

	getDefaultCubePositions(): ICubePosition[] {
		return [{
			axis: 'x',
			dir: 1
		}, {
			axis: 'y',
			dir: 1
		}, {
			axis: 'z',
			dir: 1
		}, {
			axis: 'y',
			dir: -1
		}, {
			axis: 'z',
			dir: -1
		}, {
			axis: 'x',
			dir: -1
		}]
	}

	getReasonDefault(): ICubeReasonDefault {
		const defaultCubePositions = this.getDefaultCubePositions()
		return {
			1: this.getFactorPositionDefault(
				defaultCubePositions[0],
				defaultCubePositions[5],
			),
			2: this.getFactorPositionDefault(
				defaultCubePositions[1],
				defaultCubePositions[3],
			),
			3: this.getFactorPositionDefault(
				defaultCubePositions[2],
				defaultCubePositions[4],
			)
		}
	}

	shutDownCubeListener(
		cubeEventListener: ICubeEventListener,
	): void {
		// stopResizeInterval(page)
		this.setCubeViewPort(
			cubeEventListener,
			(
				mutationApi
			) => {
				// Nothing to do
			},
			null
		)
		cubeEventListener.setPositionData(null)
	}

	setCubeAdjustment(
		cubeEventListener: ICubeEventListener,
		enableCubeAdjustment: boolean
	): void {
		if (enableCubeAdjustment) {
			cubeEventListener.addCubeAdjustment()
		} else {
			cubeEventListener.clearCubeAdjustment()
		}
	}

	setCubeViewPort(
		cubeEventListener: ICubeEventListener,
		setMutationApi: (mutationApi: IMutationApi) => void,
		callback: IValuesOutCallback
	): void {
		const mutationApi = cubeEventListener.setViewPort(true, callback)
		setMutationApi(mutationApi)
	}

	private getFactorPositionDefault(
		cubePosition1: ICubePosition,
		cubePosition2: ICubePosition,
	): ICubeFactorPositionDefault {
		return {
			axis: cubePosition1.axis,
			positions: {
				A: {
					dir: cubePosition1.dir
				},
				B: {
					dir: cubePosition2.dir
				},
			}
		}
	}

}
