import { IField } from '../field/Field'
import { IFieldError } from '../field/FieldBase'
import { IValidator } from './Validator'

export function custom(
	validatorName: string,
	validatorFunction: (field: IField) => IFieldError[] | IFieldError | null,
	validatorType = validatorName
): IValidator {
	const validator = validatorFunction as any

	validator.type = validatorType

	return validator as IValidator
}
