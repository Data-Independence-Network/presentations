import {IFieldBase} from '../field/FieldBase'
import {IValidator} from './Validator'

export function minLength(
	minimumLength: number
): IValidator {
	const validator: IValidator = ((
		field: IFieldBase,
	) => {
		this.name = 'minLength'

		if (field.displayValue
			&& field.displayValue.length < minimumLength) {
			return {
				key: 'minLength'
			}
		}
	}) as IValidator

	validator.type = 'minLength'

	return validator
}
