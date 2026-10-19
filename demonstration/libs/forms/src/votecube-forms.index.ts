import { LabelRule } from './field/Field'

export * from './field/date/DateCalendar'
export * from './field/date/DateField'
export * from './field/date/DateFragments'
export * from './field/date/DateSelection'
export * from './field/date/MonthYearField'
export * from './field/date/types'
export * from './field/ColorField'
export * from './field/Field'
export * from './field/FieldBase'
export * from './field/FieldGroup'
export * from './field/MatchingField'
export * from './field/OptionsField'
export * from './validator/custom'
export * from './validator/email'
export * from './validator/greaterThanOrEquals'
export * from './validator/minDate'
export * from './validator/minLength'
export * from './validator/minTomorrow'
export * from './validator/password'
export * from './validator/required'
export * from './validator/username'
export * from './validator/Validator'
export * from './changeTracker'
export * from './FormFactory'
export * from './votecube-forms.injection'

export interface IConstants {
	rules: IRuleConstants
}

export interface IRuleConstants {
	label: typeof LabelRule
}

export const CONSTS: IConstants = {
	rules: {
		label: LabelRule
	}
}
