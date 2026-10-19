import { Injected } from '@airport/direction-indicator'
import {
	IFormColor,
	IFormFactor,
	IFormField,
	IFormIdea,
	IUiFactor,
	IUiLabel,
	IUiNamedRecord,
	IUiRepositoryRecord,
	IUiIdea
} from '@votecube/model'


export interface IIdeaFormManager {

	fromForm(
		formIdea: IFormIdea,
		uiIdea: IUiIdea,
	): IUiIdea

	toForm(
		uiIdea: IUiIdea
	): IFormIdea

	getBlankUiRepositoryRecord(): IUiRepositoryRecord

	getBlankUiNamedRecord(): IUiNamedRecord

}

@Injected()
export class IdeaFormManager
	implements IIdeaFormManager {

	fromForm(
		formIdea: IFormIdea,
		uiIdea: IUiIdea,
	): IUiIdea {
		if (!uiIdea) {
			uiIdea = {
				...this.getBlankUiNamedRecord(),
				ageGroups: [],
				labels: [],
				factors: {
					1: this.getBlankUiFactor('x'),
					2: this.getBlankUiFactor('y'),
					3: this.getBlankUiFactor('z'),
				},
				outcomes: {
					A: this.getBlankUiNamedRecord(),
					B: this.getBlankUiNamedRecord()
				},
				repository: {
					_localId: null,
					GUID: null
				}
			}
		}

		uiIdea.name = formIdea.name
		this.transferFactorWithPositions(formIdea.factors[1], uiIdea.factors[1])
		this.transferFactorWithPositions(formIdea.factors[2], uiIdea.factors[2])
		this.transferFactorWithPositions(formIdea.factors[3], uiIdea.factors[3])

		uiIdea.ageGroups = this.formLabelsToUi(formIdea.ageGroups)
		uiIdea.labels = this.formLabelsToUi(formIdea.labels)
		uiIdea.outcomes.A.name = formIdea.outcomes.A.text
		uiIdea.outcomes.B.name = formIdea.outcomes.B.text
		return uiIdea
	}

	private transferFactorWithPositions(
		formFactor: IFormFactor,
		uiFactor: IUiFactor
	) {
		this.transferNameAndId(formFactor.name, uiFactor)
		uiFactor.color = {
			blue: parseInt(formFactor.color.blue),
			green: parseInt(formFactor.color.green),
			red: parseInt(formFactor.color.red),
		}

		const uiPositionA = uiFactor.positions.A
		this.transferNameAndId(formFactor.positions.A, uiPositionA)
		const uiPositionB = uiFactor.positions.B
		this.transferNameAndId(formFactor.positions.B, uiPositionB)
	}

	private transferNameAndId(
		formField: IFormField,
		uiNamedRecord: IUiNamedRecord,
	) {
		this.transferId(formField, uiNamedRecord)
		uiNamedRecord.name = formField.text
	}

	private transferId(
		formField: IFormField,
		uiRepositoryRecord: IUiRepositoryRecord,
	) {
		if (!formField.id) {
			// uiRepositoryRecord.actorId = null
			// uiRepositoryRecord.actorRecordId = null
			uiRepositoryRecord.ageSuitability = null
			// uiRepositoryRecord.repositoryId = null
			// uiRepositoryRecord.repositoryGUID = 'unsolved'
		} else {
			// uiRepositoryRecord.actorId = formField.id.actorId
			// uiRepositoryRecord.actorRecordId = formField.id.actorRecordId
			uiRepositoryRecord.ageSuitability = formField.id.ageSuitability
			// uiRepositoryRecord.repositoryId = formField.id.repositoryId
			// uiRepositoryRecord.repositoryGUID = formField.id.repositoryGUID
		}
	}

	private getBlankUiFactor(
		axis: 'x' | 'y' | 'z'
	): IUiFactor {
		return {
			...this.getBlankUiNamedRecord(),
			axis,
			color: {
				blue: 0,
				green: 0,
				red: 0
			},
			positions: {
				A: {
					...this.getBlankUiNamedRecord(),
					dir: 1,
				},
				B: {
					...this.getBlankUiNamedRecord(),
					dir: -1,
				}
			}
		}
	}

	private formLabelsToUi(
		labels: IFormField[]
	): IUiLabel[] {
		return labels.map(formLabel => {
			const uiLabel = this.getBlankUiLabel()
			this.transferNameAndId(formLabel, uiLabel)
			return uiLabel
		})
	}

	private getBlankUiLabel(): IUiLabel {
		return {
			...this.getBlankUiNamedRecord(),
			originalDbLabel: null
		}
	}

	getBlankUiRepositoryRecord(): IUiRepositoryRecord {
		return {
			_actorRecordId: null,
			actor: null,
			ageSuitability: 0,
			repository: null,
		}
	}

	getBlankUiNamedRecord(): IUiNamedRecord {
		return {
			...this.getBlankUiRepositoryRecord(),
			name: null
		}
	}

	toForm(
		uiIdea: IUiIdea
	): IFormIdea {
		const uiOutcomeA = uiIdea.outcomes.A
		const uiOutcomeB = uiIdea.outcomes.B

		const ageGroups = uiIdea.ageGroups.map(uiLabel =>
			this.getFormField(uiLabel))
		const labels = uiIdea.labels.map(uiLabel =>
			this.getFormField(uiLabel))

		return {
			ageGroups,
			factors: {
				1: this.uiToFormFactor(uiIdea.factors[1]),
				2: this.uiToFormFactor(uiIdea.factors[2]),
				3: this.uiToFormFactor(uiIdea.factors[3])
			},
			labels,
			name: uiIdea.name,
			outcomes: {
				A: this.getFormField(uiOutcomeA),
				B: this.getFormField(uiOutcomeB),
			},
		}
	}

	private getFormField(
		uiRepositoryRecord: IUiNamedRecord
	) {
		return {
			id: this.copyId(uiRepositoryRecord),
			text: uiRepositoryRecord.name
		}
	}

	private copyId(
		uiRepositoryRecord: IUiRepositoryRecord
	): IUiRepositoryRecord {
		return {
			_actorRecordId: uiRepositoryRecord._actorRecordId,
			actor: uiRepositoryRecord.actor,
			ageSuitability: uiRepositoryRecord.ageSuitability,
			repository: uiRepositoryRecord.repository,
		}
	}

	private uiToFormFactor(
		factorData: IUiFactor
	): IFormFactor {
		return {
			color: factorData.color as any as IFormColor,
			name: this.getFormField(factorData),
			positions: {
				A: this.getFormField(factorData.positions.A),
				B: this.getFormField(factorData.positions.B)
			}
		}
	}

}
