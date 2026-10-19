import {
	Factor,
	Position,
	Idea,
	Reason,
	IdeaLabel,
	IdeaReason,
	SituationIdea,
	ReasonCubeDisplay
} from '@votecube/votecube'
import {
	IUiLabel,
	IUiFactor,
	IUiPosition,
	IUiIdea,
	AGE_GROUPS,
} from '@votecube/model'
import { RepositoryRecordConverter } from '@votecube/ui-logic'
import { Injected } from '@airport/direction-indicator'
import { IIdeaFormManager } from '../pages/idea/IdeaFormManager'

export interface IIdeaConverter {

	dbToUi(
		dbIdea: Idea
	): IUiIdea

	uiToDb(
		uiIdea: IUiIdea,
		dbIdea: Idea
	): Idea

}

@Injected()
export class IdeaConverter
	extends RepositoryRecordConverter
	implements IIdeaConverter {

	ideaFormManager: IIdeaFormManager

	dbToUi(
		dbIdea: Idea | SituationIdea
	): IUiIdea {
		let idea: Idea = dbIdea as Idea
		if ((dbIdea as SituationIdea).idea) {
			idea = (dbIdea as SituationIdea).idea
		}

		let ageGroups: IUiLabel[] = []
		let labels: IUiLabel[] = []
		if (idea.ideaLabels) {
			ageGroups = idea.ideaLabels.filter(ideaLabel =>
				AGE_GROUPS.includes(ideaLabel.label.name))
				.map(ageGroupLabel => this.getUiLabel(ageGroupLabel))
			labels = idea.ideaLabels.filter(ideaLabel =>
				!AGE_GROUPS.includes(ideaLabel.label.name))
				.map(ageGroupLabel => this.getUiLabel(ageGroupLabel))
		}

		return {
			...super.dbToUi(dbIdea),
			ageGroups,
			factors: {
				'1': this.getUiFactor(1, dbIdea.ideaReasons),
				'2': this.getUiFactor(2, dbIdea.ideaReasons),
				'3': this.getUiFactor(3, dbIdea.ideaReasons)
			},
			labels,
			name: idea.name,
			outcomes: {
				A: {
					_actorRecordId: null,
					actor: null,
					ageSuitability: 0,
					name: 'For',
					repository: null
				},
				B: {
					_actorRecordId: null,
					actor: null,
					ageSuitability: 0,
					name: 'Against',
					repository: null
				}
			},
			repository: idea.repository
		}
	}

	uiToDb(
		uiIdea: IUiIdea,
		dbIdea: Idea
	): Idea {
		if (!dbIdea) {
			dbIdea = {} as any
		}

		super.uiToDb(uiIdea, dbIdea)

		const factor1 = this.reasonToDb(
			uiIdea,
			dbIdea,
			1,
			'A',
		)
		this.reasonToDb(
			uiIdea,
			dbIdea,
			1,
			'B',
			factor1
		)
		const factor2 = this.reasonToDb(
			uiIdea,
			dbIdea,
			2,
			'A',
		)
		this.reasonToDb(
			uiIdea,
			dbIdea,
			2,
			'B',
			factor2
		)
		const factor3 = this.reasonToDb(
			uiIdea,
			dbIdea,
			3,
			'A',
		)
		this.reasonToDb(
			uiIdea,
			dbIdea,
			3,
			'B',
			factor3
		)

		dbIdea.name = uiIdea.name

		this.labelsToDb(uiIdea, dbIdea, uiIdea.ageGroups)
		this.labelsToDb(uiIdea, dbIdea, uiIdea.labels)

		return dbIdea
	}

	private getUiLabel(
		ideaLabel: IdeaLabel
	): IUiLabel {
		if (!ideaLabel) {
			return {
				...this.ideaFormManager.getBlankUiNamedRecord(),
				originalDbLabel: ideaLabel
			}
		}
		const label = ideaLabel.label
		return {
			...super.dbToUi(label),
			name: label.name,
			originalDbLabel: ideaLabel
		}
	}

	private getUiFactor(
		factorNumber: 1 | 2 | 3,
		ideaReasons: IdeaReason[]
	): IUiFactor {
		const matchingIdeaReasons = ideaReasons.filter(ideaReason =>
			ideaReason.reasonCubeDisplay.factorNumber === factorNumber)

		let dbIdeaReasonA: IdeaReason
		let dbIdeaReasonB: IdeaReason

		if (matchingIdeaReasons[0].isPositiveOutcome) {
			dbIdeaReasonA = matchingIdeaReasons[0]
			dbIdeaReasonB = matchingIdeaReasons[1]
		} else {
			dbIdeaReasonA = matchingIdeaReasons[1]
			dbIdeaReasonB = matchingIdeaReasons[0]
		}

		const dbFactor = dbIdeaReasonA.reason.factor

		return {
			...super.dbToUi(dbFactor),
			axis: dbIdeaReasonA.reasonCubeDisplay.axis as 'x' | 'y' | 'z',
			color: {
				blue: dbIdeaReasonA.reasonCubeDisplay.blue,
				green: dbIdeaReasonA.reasonCubeDisplay.green,
				red: dbIdeaReasonA.reasonCubeDisplay.red,
			},
			name: dbFactor.name,
			positions: {
				A: this.getUiPosition(dbIdeaReasonA),
				B: this.getUiPosition(dbIdeaReasonB),
			},
		}
	}

	private getUiPosition(
		dbIdeaReason: IdeaReason
	): IUiPosition {
		return {
			...super.dbToUi(dbIdeaReason),
			dir: dbIdeaReason.reasonCubeDisplay.dir as -1 | 1,
			name: dbIdeaReason.reason.position.text,
		}
	}

	private getUiLabels(
		ideaLabels: IdeaLabel[]
	): IUiLabel[] {
		if (!ideaLabels) {
			return []
		}
		return ideaLabels.map(ideaLabel =>
			this.getUiLabel(ideaLabel)
		)
	}

	private labelsToDb(
		uiIdea: IUiIdea,
		dbIdea: Idea,
		uiLabels: IUiLabel[],
	): void {
		let dbIdeaLabels = dbIdea.ideaLabels
		if (!dbIdeaLabels) {
			dbIdeaLabels = []
			dbIdea.ideaLabels = dbIdeaLabels
		}

		for (const uiLabel of uiLabels) {
			const matchingDbLabels = dbIdeaLabels.filter(
				dbIdeaLabel =>
					dbIdeaLabel.label.name === uiLabel.name
			)
			let dbIdeaLabel: IdeaLabel
			if (matchingDbLabels.length) {
				dbIdeaLabel = matchingDbLabels[0]
			} else {
				dbIdeaLabel = {
					label: uiLabel.originalDbLabel
				} as any
			}
			super.uiToDb(uiLabel, dbIdeaLabel)

			dbIdeaLabel.label = uiLabel.originalDbLabel.label
			dbIdeaLabels.push(dbIdeaLabel)
		}
	}

	private reasonToDb(
		uiIdea: IUiIdea,
		dbIdea: Idea | SituationIdea,
		factorNumber: 1 | 2 | 3,
		outcomeOrdinal: 'A' | 'B',
		dbFactor?: Factor
	): Factor {
		let existingFactor = !!dbFactor
		const uiFactor = uiIdea.factors[factorNumber]
		const uiPosition = uiFactor.positions[outcomeOrdinal]

		if (!dbIdea.ideaReasons) {
			dbIdea.ideaReasons = []
		}

		const matchingReasons = dbIdea.
			ideaReasons.filter(
				ideaReason =>
					ideaReason.reasonCubeDisplay.factorNumber === factorNumber
					&& ideaReason.isPositiveOutcome === (
						outcomeOrdinal === 'A' ? true : false)
			)
		let dbPosition: Position
		let dbIdeaReason: IdeaReason
		if (matchingReasons.length) {
			dbIdeaReason = matchingReasons[0]
			dbFactor = dbIdeaReason.reason.factor
			dbPosition = dbIdeaReason.reason.position
		} else {
			dbIdeaReason = new IdeaReason()
			dbIdeaReason.reasonCubeDisplay = new ReasonCubeDisplay()
			if (!existingFactor) {
				dbFactor = new Factor()
			}
			dbPosition = new Position()
			const dbReason = new Reason()
			dbReason.ideaReasons.push(dbIdeaReason)
			dbReason.factor = dbFactor
			dbReason.position = dbPosition
			dbIdeaReason.reason = dbReason
			if ((dbIdea as Idea).name) {
				dbIdeaReason.idea = dbIdea as Idea
			} else {
				dbIdeaReason.situationIdea = dbIdea as SituationIdea
			}
			dbIdea.ideaReasons.push(dbIdeaReason)
		}

		if (!existingFactor) {
			this.factorToDb(uiFactor, dbFactor)
		}
		this.positionToDb(uiPosition, dbPosition)

		super.uiToDb({} as any, dbIdeaReason)

		dbIdeaReason.reasonCubeDisplay.axis = uiFactor.axis
		dbIdeaReason.reasonCubeDisplay.blue = uiFactor.color.blue
		dbIdeaReason.reasonCubeDisplay.dir = uiPosition.dir
		dbIdeaReason.reasonCubeDisplay.factorNumber = factorNumber
		dbIdeaReason.reasonCubeDisplay.green = uiFactor.color.green
		dbIdeaReason.isPositiveOutcome =
			outcomeOrdinal === 'A' ? true : false
		dbIdeaReason.reasonCubeDisplay.red = uiFactor.color.red

		return dbFactor
	}

	private factorToDb(
		uiFactor: IUiFactor,
		dbFactor: Factor
	): void {
		super.uiToDb(uiFactor, dbFactor)
		dbFactor.name = uiFactor.name
	}

	private positionToDb(
		uiPosition: IUiPosition,
		dbPosition: Position
	): void {
		super.uiToDb(uiPosition, dbPosition)
		dbPosition.text = uiPosition.name
	}

}
