import {
	IFieldBase,
	IFieldError
}                   from '../field/FieldBase'
import {IValidator} from './Validator'

export function required(): IValidator {
	requiredValidator.type = 'required'

	return requiredValidator
}

const requiredValidator: IValidator = function (
	field: IFieldBase
): IFieldError[] | IFieldError | null {
	const value = field.displayValue
	if ((!value
		&& value !== false
		&& value !== 0)
		|| (value instanceof Array
			&& !value.length)) {
		return {
			key: 'required'
		}
	}
} as any
