import {IField}     from '../votecube-forms.index'
import {IValidator} from './Validator'

export function greaterThanOrEquals(
	relatedField: IField // UTC only
): IValidator<IField> {
	const validator: IValidator = ((
		field: IField,
	) => {
		const relatedNumValue = relatedField.numValue
		if (relatedNumValue === null
			|| field.numValue >= relatedNumValue) {
			return null
		}

		return {
			key: 'greaterThanOrEquals'
		}
	}) as IValidator

	validator.type = 'greaterThanOrEquals'

	return validator
}
