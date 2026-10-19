import {IDateField} from '../votecube-forms.index'
import {IValidator} from './Validator'

export function minDate(
	date: Date // UTC only
): IValidator<IDateField> {
	const minDateOfMonth = date.getUTCDate()
	const minMonth       = date.getUTCMonth()
	const minYear        = date.getUTCFullYear()

	const validator: IValidator = ((
		field: IDateField,
	) => {
		if (!field.fragments.valid
			|| field.displayValue === null) {
			return null
		}

		const selection = field.selection

		if (selection.year < minYear
			|| (selection.year === minYear
				&& (selection.month < minMonth
					|| (selection.month === minMonth
						&& selection.date < minDateOfMonth)))) {
			return {
				key: 'min'
			}
		}

	}) as IValidator

	validator.type = 'min'

	return validator
}
