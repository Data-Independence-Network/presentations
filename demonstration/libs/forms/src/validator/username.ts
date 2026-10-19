import {
	IFieldBase,
	IFieldError
}                   from '../votecube-forms.index'
import {IValidator} from './Validator'

export function username(): IValidator {
	usernameValidator.type = 'username'

	return usernameValidator
}

const usernameValidator: IValidator = function (
	field: IFieldBase
): IFieldError[] | IFieldError | null {
	const value = field.displayValue
	if (!value
		|| typeof value !== 'string'
		|| !/^[a-zA-Z0-9_\-]+$/.test(value)){
		return {
			key: 'username'
		}
	}
} as any
