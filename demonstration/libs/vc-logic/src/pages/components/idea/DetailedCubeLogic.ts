import {
	Inject
} from '@airport/direction-indicator'
import { Injected } from '@airport/direction-indicator'
import {
	Factor_Axis,
	Outcome_Ordinal,
} from '@votecube/cube-logic'
import type {
	ICubePosition,
	IUiFactor,
	IUiPosition,
	IUiIdea,
} from '@votecube/model'
import { ICubeLogic } from '../../../idea/CubeLogic'
import { ILogicUtils } from '../../../LogicUtils'

export type Position_Dir = -1 | 1

export interface ICubeSide
	extends ICubePosition {

	colorRGB: string
	factor: IUiFactor
	outcome: Outcome_Ordinal
	position: IUiPosition
	textColorRGB: string

}

export interface ICubeSideMap {
	x: {
		1?: ICubeSide
		'-1'?: ICubeSide
	},
	y: {
		1?: ICubeSide
		'-1'?: ICubeSide
	},
	z: {
		1?: ICubeSide
		'-1'?: ICubeSide
	},
}

export type SwitchToDefinition = ['x' | 'y' | 'z', -1 | 1]

interface ISwitchPositionMap {
	x: {
		1?: 0
		'-1'?: 1
	},
	y: {
		1?: 2
		'-1'?: 3
	},
	z: {
		1?: 4
		'-1'?: 5
	},
}

interface ISwitchRecord {
	from: {
		axis: Factor_Axis
		dir: Position_Dir
	},
	to: {
		axis: Factor_Axis
		dir: Position_Dir
	}
}

export interface IDetailedCubeLogic {

	getCubeSides(
		idea: IUiIdea
	): Promise<{
		cubeSideMap: ICubeSideMap
		cubeSides: ICubeSide[]
	}>

	move(
		cubeSideMap: ICubeSideMap,
		cubeSide: ICubeSide,
		switchToDefinitions
	): void

	switchPoles(
		cubeSideMap: ICubeSideMap,
		cubeSide: ICubeSide
	): void

}

@Injected()
export class DetailedCubeLogic
	implements IDetailedCubeLogic {

	@Inject()
	cubeLogic: ICubeLogic

	@Inject()
	logicUtils: ILogicUtils

	async getCubeSides(
		idea: IUiIdea
	): Promise<{
		cubeSideMap: ICubeSideMap
		cubeSides: ICubeSide[]
	}> {
		const cubeSides: ICubeSide[] =
			this.cubeLogic.getDefaultCubePositions() as ICubeSide[]

		const cubeSideMap: ICubeSideMap = {
			x: {},
			y: {},
			z: {}
		}

		for (const cubeSide of cubeSides) {
			cubeSideMap[cubeSide.axis][cubeSide.dir]
				= cubeSide
		}

		for (const factorNumber in idea.factors) {
			const factor: IUiFactor = idea.factors[factorNumber]

			for (const outcome in factor.positions) {
				const position: IUiPosition = factor.positions[outcome]

				const cubeSide: ICubeSide = cubeSideMap[factor.axis][position.dir]

				cubeSide.colorRGB = this.logicUtils.getColor(factor.color)
				cubeSide.factor = factor
				cubeSide.outcome = outcome as Outcome_Ordinal
				cubeSide.position = position
				cubeSide.textColorRGB = this.logicUtils.getTextColor(factor.color)
			}
		}

		return {
			cubeSideMap,
			cubeSides
		}
	}

	move(
		cubeSideMap: ICubeSideMap,
		cubeSide: ICubeSide,
		switchToDefinitions: SwitchToDefinition[]
	): void {
		const switchPositions = this.getSwitchArray(cubeSide.axis, cubeSide.dir, switchToDefinitions)

		this.moveFactorPair(switchPositions[0], cubeSideMap)
		this.movePositionPair(switchPositions[0], cubeSideMap)
		this.movePositionPair(switchPositions[1], cubeSideMap)
	}

	switchPoles(
		cubeSideMap: ICubeSideMap,
		cubeSide: ICubeSide
	): void {
		const axis = cubeSide.axis
		const dir = cubeSide.dir
		const switchPositions = [{
			axis,
			dir
		},
		{
			axis,
			dir: dir === 1 ? -1 : 1
		}]

		const cubeSideFrom = cubeSideMap[switchPositions[0].axis][switchPositions[0].dir]
		const cubeSideTo = cubeSideMap[switchPositions[1].axis][switchPositions[1].dir]

		const toDir = cubeSideTo.position.dir
		cubeSideTo.position.dir = cubeSideFrom.position.dir
		cubeSideFrom.position.dir = toDir
	}

	private getSwitchArray(
		axis: Factor_Axis,
		dir: Position_Dir,
		switchToDefinitions: SwitchToDefinition[]
	): ISwitchRecord[] {
		const switchPositionMap: ISwitchPositionMap
			= {
			x: {
				'-1': 1,
				'1': 0,
			},
			y: {
				'-1': 3,
				'1': 2,
			},
			z: {
				'-1': 5,
				'1': 4,
			}
		}
		const to = switchToDefinitions[switchPositionMap[axis][dir]]

		const [toAxis, toDir] = to
		const oppositeDir = dir === 1 ? -1 : 1
		const toOppositeDir = toDir === 1 ? -1 : 1

		return [{
			from: {
				axis,
				dir
			},
			to: {
				axis: toAxis,
				dir: toDir
			}
		}, {
			from: {
				axis,
				dir: oppositeDir
			},
			to: {
				axis: toAxis,
				dir: toOppositeDir
			}
		}]
	}

	private moveFactorPair(
		switchPosition: ISwitchRecord,
		cubeSideMap: ICubeSideMap
	) {
		const cubeSideFrom = cubeSideMap[switchPosition.from.axis][switchPosition.from.dir]
		const cubeSideTo = cubeSideMap[switchPosition.to.axis][switchPosition.to.dir]

		const toAxis = cubeSideTo.factor.axis
		cubeSideTo.factor.axis = cubeSideFrom.factor.axis
		cubeSideFrom.factor.axis = toAxis
	}

	private movePositionPair(
		switchPosition: ISwitchRecord,
		cubeSideMap: ICubeSideMap
	) {
		const cubeSideFrom = cubeSideMap[switchPosition.from.axis][switchPosition.from.dir]
		const cubeSideTo = cubeSideMap[switchPosition.to.axis][switchPosition.to.dir]

		const toDir = cubeSideTo.position.dir
		cubeSideTo.position.dir = cubeSideFrom.position.dir
		cubeSideFrom.position.dir = toDir
	}

}
