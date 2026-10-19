import {
	IFieldBase,
	IFieldError
}                   from '../votecube-forms.index'
import {IValidator} from './Validator'

export function password(): IValidator {
	passwordValidator.type = 'password'

	return passwordValidator
}

const passwordValidator: IValidator = function (
	field: IFieldBase
): IFieldError[] | IFieldError | null {
	const value = field.displayValue
	if (!value
		|| typeof value !== 'string'
		|| !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/.test(value)){
		return {
			key: 'password'
		}
	}
} as any
