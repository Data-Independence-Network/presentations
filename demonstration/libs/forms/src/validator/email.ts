import {
	IFieldBase,
	IFieldError
}                   from '../votecube-forms.index'
import {IValidator} from './Validator'

export function email(): IValidator {
	emailValidator.type = 'email'

	return emailValidator
}

const emailValidator: IValidator = function (
	field: IFieldBase
): IFieldError[] | IFieldError | null {
	const value = field.displayValue
	if (!value
		|| typeof value !== 'string'
		|| !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
		return {
			key: 'email'
		}
	}
} as any
