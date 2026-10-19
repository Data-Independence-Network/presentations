import {
	IErrorsText,
	IValidator
} from '../validator/Validator'
import {
	FieldBase,
	IFieldBase,
	IFieldError,
	validate
} from './FieldBase'

export enum LabelRule {
	BOTH,
	IN,
	NONE,
	OVER
}

export interface IFieldRules {
	label?: LabelRule
	maxLength?: '' | number,
	trackOriginal?: boolean
}

export interface IFieldText {
	errors?: IErrorsText
	info: string
	infoSeconds?: number // Delay before info is displayed
	label: string
}

export interface IValidate {
	validate(
		external?: boolean,
		fromParentGroup?: boolean,
		relatedField?: IFieldBase,
		originalCheckOnly?: boolean
	): void
}

export interface IDetect {
	detect(): void
}

export interface IField
	extends IFieldBase,
	        IValidate,
	        IDetect {
	label: string
	numValue: number
	placeholder: string
	rules: IFieldRules
	text: IFieldText
	// Specifying "Country" in label and tying label to a field causes chrome to
	// to show autocomplete

	clear(): void

	labelRule(
		labelRule: LabelRule
	): void

	onBlur(): void

	onInput(): void

}

export class Field
	extends FieldBase
	implements IField {

	rules: IFieldRules = {
		label: LabelRule.BOTH,
		trackOriginal: false
	}
	text: IFieldText

	constructor(
		validators: IValidator[] = [],
		rules?: IFieldRules
	) {
		super(validators)
		this.rules     = {
			...this.rules,
			...rules
		}
		this.lastValue = this.value
		this.theValue  = ''
	}

	get error(): IFieldError | null {
		return this.errors.length
			? this.errors[0]
			: null
	}

	get label(): string {
		switch (this.rules.label) {
			case LabelRule.BOTH:
				return this.value ? (this.text ? this.text.label : '!this.text') : ''
			case LabelRule.IN:
			case LabelRule.NONE:
				return ''
			case LabelRule.OVER:
				return (this.text ? this.text.label : '!this.text')
		}
	}

	get numValue(): number {
		return parseInt(this.value)
	}

	get placeholder(): string {
		switch (this.rules.label) {
			case LabelRule.BOTH:
			case LabelRule.IN:
				return (this.text ? this.text.label : '!this.text')
			case LabelRule.NONE:
			case LabelRule.OVER:
				return ''
		}
	}

	clear(): void {
		this.value = ''
		this.validate()
		this.detect()
	}

	isOriginal(): boolean {
		if (!this.rules.trackOriginal) {
			return true
		}

		this.theIsOriginal = this.getOriginal()

		return this.theIsOriginal
	}

	labelRule(
		labelRule: LabelRule = LabelRule.BOTH
	): void {
		this.rules.label = labelRule
	}

	onBlur(): void {
		this.touch()
		this.onInput()
	}

	onInput(): void {
		this.pristine = false

		if (this.value !== this.lastValue) {
			this.dirty = true
		}

		this.validate()

		this.lastValue = this.value

		this.detect()
	}

	revert(): void {
		super.revert()
		this.validate()
		this.detect()
	}

	setTrackOriginal(
		trackOriginal: boolean
	): void {
		this.rules.trackOriginal = trackOriginal
	}

	validate(
		external = true,
		fromParentGroup?: boolean
	): void {
		if (!this.shouldValidate(external)) {
			return
		}
		validate(this)

		this.updateValidity(fromParentGroup)
	}

	protected updateValidity(
		fromParentGroup: boolean
	) {
		const lastIsValid = this.valid

		this.valid = !this.errors.length

		const originalCheckOnly = lastIsValid === this.valid
			&& this.lastValue === this.value
		if (!fromParentGroup) {
			this.group.validate(false, false, this, originalCheckOnly)
		}
	}

	protected getOriginal(): boolean {
		return this.isSame(this.theValue, this.originalValue)
	}

}
