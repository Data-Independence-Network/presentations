import {
	ColorField,
	IColorField
} from './field/ColorField'
import {
	DateField,
	IDateField
} from './field/date/DateField'
import {
	Field,
	IField,
	IFieldRules
} from './field/Field'
import {
	FieldGroup,
	IFieldGroup,
	IFieldMap
} from './field/FieldGroup'
import {
	IMatch,
	IMatchingField,
	MatchingField
} from './field/MatchingField'
import {
	IFieldOption,
	IOptionFieldRules,
	IOptionsField,
	OptionsField
} from './field/OptionsField'
import {
	IValidator,
	IValidators,
	Validators
} from './validator/Validator'
import { IMonthYearField, MonthYearField } from './field/date/MonthYearField'
import { Injected } from '@airport/direction-indicator'


export interface IFormFactory {
	validators: IValidators

	color(
		validators: IValidator[],
		rules?: IFieldRules
	): IColorField

	date(
		validators: IValidator[],
		rules?: IFieldRules
	): IDateField

	field(
		validators: IValidator[],
		rules?: IFieldRules
	): IField

	group(
		name,
		fields: IFieldMap,
		validators: IValidator[],
		text: any,
		textName?: string
	): IFieldGroup

	matching(
		matchCallback: (
			text: string
		) => Promise<IMatch[]>,
		validators?: IValidator[],
		rules?: IFieldRules
	): IMatchingField

	monthYear(
		validators: IValidator[],
		rules?: IFieldRules
	): IMonthYearField

	options(
		validators: IValidator[],
		options: IFieldOption[],
		rules?: IOptionFieldRules
	): IOptionsField

}

@Injected()
export class FormFactory
	implements IFormFactory {

	validators: IValidators = Validators

	color(
		validators: IValidator[],
		rules?: IFieldRules
	): IColorField {
		return new ColorField(validators, rules)
	}

	date(
		validators: IValidator[],
		rules?: IFieldRules
	): IDateField {
		return new DateField(validators, rules)
	}

	field(
		validators: IValidator[],
		rules?: IFieldRules
	): IField {
		return new Field(validators, rules)
	}

	group(
		name,
		fields: IFieldMap,
		validators: IValidator[],
		text: any,
		textName?: string
	): IFieldGroup {
		return new FieldGroup(name, fields, validators, text, textName)
	}

	matching(
		matchCallback: (
			text: string
		) => Promise<IMatch[]>,
		validators?: IValidator[],
		rules?: IFieldRules
	): IMatchingField {
		return new MatchingField(matchCallback, validators, rules)
	}

	monthYear(
		validators: IValidator[],
		rules?: IFieldRules
	): IMonthYearField {
		return new MonthYearField(validators, rules)
	}

	options(
		validators: IValidator[],
		options: IFieldOption[],
		rules?: IOptionFieldRules
	): IOptionsField {
		return new OptionsField(validators, options, rules)
	}

	yearMonth(
		validators: IValidator[],
		rules?: IFieldRules
	): IDateField {
		return new DateField(validators, rules)
	}

}
