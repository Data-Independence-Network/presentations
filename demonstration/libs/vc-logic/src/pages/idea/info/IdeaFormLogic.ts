import {
	IFieldGroup,
	IFormFactory
} from '@votecube/forms'
import { ICachedIdea } from '../../../idea/IdeaManager'
import { Inject, Injected } from '@airport/direction-indicator'
import { IIdeaFormManager } from '../IdeaFormManager'

export interface IIdeaFormLogic {

	getIdeaForm(
		cachedIdea: ICachedIdea,
		trackOriginal: boolean,
		touch: boolean,
		text,
		formFactory: IFormFactory
	): Promise<IFieldGroup>

}

@Injected()
export class IdeaFormLogic
	implements IIdeaFormLogic {

	@Inject()
	ideaFormManager: IIdeaFormManager

	async getIdeaForm(
		cachedIdea: ICachedIdea,
		trackOriginal: boolean,
		touch: boolean,
		text,
		formFactory: IFormFactory
	): Promise<IFieldGroup> {
		const form = await this.createIdeaForm(
			// labels,
			// locations,
			text.UI,
			formFactory
		)
		form.setTrackOriginal(trackOriginal)
		form.validate()

		cachedIdea.form = form

		// form.fields.locations.optionText = text.LOCATIONS
		if (cachedIdea.ui) {
			form.setValue(
				this.ideaFormManager.toForm(cachedIdea.ui),
				true
				// !currentCachedIdea.ui.draft
			)
			form.validate()
			if (touch) {
				form.touch()
			}
		}

		return form
	}

	private async createIdeaForm(
		// labelData,
		// locationsData,
		uiText,
		formFactory: IFormFactory
	): Promise<IFieldGroup> {

		const text = uiText.Idea

		const factors = formFactory.group('Factors', {
			1: this.createFactorForm(
				uiText,
				formFactory,
				[formFactory.validators.required()]
			),
			2: this.createFactorForm(
				uiText,
				formFactory,
				[formFactory.validators.required()]
			),
			3: this.createFactorForm(
				uiText,
				formFactory,
				[formFactory.validators.required()]
			)
		}, [formFactory.validators.required()], text)

		const outcomes = formFactory.group('Outcomes', {
			A: formFactory.matching(this.findOutcomeMatches, [
				formFactory.validators.minLength(3),
				formFactory.validators.required()
			], {
				maxLength: 50
			}),
			B: formFactory.matching(this.findOutcomeMatches, [
				formFactory.validators.minLength(3),
				formFactory.validators.required()
			], {
				maxLength: 50
			})
		}, [], text)


		const ageGroups = formFactory.options([], [], {
			multi: true
		})
		const labels = formFactory.options([], [], {
			multi: true
		})

		/*
			const locations = form.group('Locations', {
				continents: form.options([
					form.validators.required()
				], locationsData.continents, {
					multi: true
				}),
				countries: form.options([], locationsData.countries, {
					multi: true
				}),
				states: form.options([], locationsData.states, {
					multi: true
				}),
				cities: form.options([], locationsData.cities, {
					multi: true
				}),
			}, [form.validators.required()], text)

			const startDate = form.date([
				form.validators.required(),
				form.validators.minTomorrow()
			])
		*/
		const category = formFactory.options([
			formFactory.validators.required()
		], [{
			id: 1,
			text: 'Politics'
		}, {
			id: 2,
			text: 'Culture'
		}, {
			id: 3,
			text: 'Technology'
		}, {
			id: 4,
			text: 'Space'
		}, {
			id: 5,
			text: 'Security'
		}])
		/*
			const timeframe = form.group('Timeframe', {
				startDate,
				endDate: form.dateField([
					form.validators.required(),
					form.validators.minTomorrow(),
					form.validators.greaterThanOrEquals(startDate)
				]),
			}, [form.validators.required()], text)
		*/
		return formFactory.group('MainInfo', {
			ageGroups,
			// ageSuitability: form.field([], {}),
			factors,
			labels,
			// labels,
			// locations,
			name: formFactory.field([
				formFactory.validators.minLength(3),
				formFactory.validators.required()
			], {
				maxLength: 40
			}),
			outcomes,
			// category,
			// timeframe
		}, [formFactory.validators.required()], text)
	}

	private async findOutcomeMatches(
		outcomeText: string
	) {
		return []
	}

	private async findFactorMatches(
		factorText: string
	) {
		return []
	}

	private async findPositionMatches(
		factorText: string
	) {
		return []
	}

	private createFactorForm(
		uiText,
		form: IFormFactory,
		formValidators
	): IFieldGroup {
		const name = form.matching(this.findFactorMatches, [
			form.validators.required(),
			form.validators.minLength(5)
		], {
			maxLength: 20
		})
		const positionAName = form.matching(this.findPositionMatches, [
			form.validators.required(),
			form.validators.minLength(5)
		], {
			maxLength: 120
		})
		const positionBName = form.matching(this.findPositionMatches, [
			form.validators.required(),
			form.validators.minLength(5)
		], {
			maxLength: 120
		})
		/*
		const topPositionName    = form.matching([
			Validators.required(),
			Validators.minLength(5)
		], {
			maxLength: 120
		})
		const bottomPositionName = form.matching([
			Validators.required(),
			Validators.minLength(5)
		], {
			maxLength: 120
		})
		 */
		const positions = form.group('Positions', {
			A: positionAName,
			B: positionBName
		}, [form.validators.required()], uiText.Idea)

		// FIXME: move to appropriate place once matching is implemented
		/*	name.onChange((
				value
			) => {
				if (name.valid) {
					name.matches = ['a', 'b', 'c']
				} else {
					name.matches = null
				}
			})*/

		// FIXME: move to appropriate place once matching is implemented
		/*
			bottomPositionName.onChange((
				value
			) => {
				if (bottomPositionName.valid) {
					bottomPositionName.matches = ['a', 'b', 'c']
				} else {
					bottomPositionName.matches = null
				}
			})
			// FIXME: move to appropriate place once matching is implemented
			topPositionName.onChange((
				value
			) => {
				if (topPositionName.valid) {
					topPositionName.matches = ['a', 'b', 'c']
				} else {
					topPositionName.matches = null
				}
			})*/

		/*
			const color = form.group('PickColor', {
				picker: form.field([
					form.validators.required()
				])
			}, [form.validators.required()], uiText.Factor)
		*/
		const color = form.color([
			form.validators.required()
		])
		color.setValue({
			blue: 128,
			green: 128,
			red: 128
		})

		return form.group('Info', {
			color,
			name,
			positions,
		}, formValidators, uiText.Factor)
	}

}
