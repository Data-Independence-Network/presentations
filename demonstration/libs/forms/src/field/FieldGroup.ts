import {
	addChange,
	getChange
}                   from '../changeTracker'
import {IValidator} from '../validator/Validator'
import {
	IFieldRules,
	IFieldText
}                   from './Field'
import {
	FieldBase,
	IComponent,
	IFieldBase,
	IFieldError
}                   from './FieldBase'

export interface IFieldMap {
	[key: string]: IFieldBase
}

export interface IFieldValidityMap {
	[key: string]: IFieldError[]
}

export interface IFieldGroupText {
	[key: string]: IFieldGroupText | IFieldGroupingText | IFieldText | string
}

export interface IFieldGroupingText {
	error: string
	info: string
	label: string
}

export interface IFieldGroup
	extends IFieldBase {

	error: IFieldError
	fields: IFieldMap
	isRequired: boolean
	text: IFieldGroupText

	hideOtherPopups(
		fieldWithOpenPopup: FieldBase
	): void

}

export class FieldGroup
	extends FieldBase
	implements IFieldGroup {

	error: IFieldError = null

	rules: IFieldRules = {
		trackOriginal: false
	}

	text: IFieldGroupText

	private hasRequiredChild = false
	private hasChildValues   = false

	constructor(
		name,
		public fields: IFieldMap = {},
		validators: IValidator[],
		text: any,
		textName?: string
	) {
		super(validators)
		this.name = name
		this.text = text[textName ? textName : this.name]

		for (const fieldName in fields) {
			const field = fields[fieldName]
			if (!(field instanceof FieldGroup)) {
				field.id = name + '_' + fieldName
				field.name = fieldName
				field.text = this.text[fieldName]
			}
			field.group = this
			if (field.isRequired) {
				this.hasRequiredChild = true
			}
		}
		this.validate(false)
	}

	get hasValue(): boolean {
		return this.hasChildValues
	}

	get isRequired(): boolean {
		return this.validatorMap.required
			// Group must have a required validator to be required and is otherwise optional
			// having child required fields only takes effect if any of the values
			// in the group are populated
			|| (this.hasChildValues && this.hasRequiredChild)
	}

	get value(): any {
		const value = {}

		for (const fieldName in this.fields) {
			const field      = this.fields[fieldName]
			value[fieldName] = field.value
		}

		return value
	}

	get changeFlags(): any {
		const changeFlags = {}

		for (const fieldName in this.fields) {
			const field      = this.fields[fieldName]
			changeFlags[fieldName] = field.changeFlags
		}

		return changeFlags
	}

	set value(
		value: any
	) {
		this.setValue(value)
	}

	set optionText(
		textMap
	) {
		for (const fieldName in this.fields) {
			const field      = this.fields[fieldName]
			field.optionText = textMap[fieldName]
		}
	}

	addComponent(
		component: IComponent
	): void {
		for (const fieldName in this.fields) {
			const field = this.fields[fieldName]
			field.addComponent(component)
		}
		super.addComponent(component)
	}

	clearComponents(): void {
		for (const fieldName in this.fields) {
			this.fields[fieldName].clearComponents()
		}
		super.clearComponents()
	}

	hideOtherPopups(
		fieldWithOpenPopup: FieldBase
	): void {
		for (const fieldName in this.fields) {
			const field = this.fields[fieldName]
			if (field !== fieldWithOpenPopup) {
				field.hidePopup()
			}
		}
	}

	isOriginal(): boolean {
		return this.theIsOriginal
	}

	removeComponent(
		component: IComponent
	): void {
		for (const fieldName in this.fields) {
			this.fields[fieldName].removeComponent(component)
		}
		super.removeComponent(component)
	}

	setTrackOriginal(
		trackOriginal: boolean
	): void {
		for (const fieldName in this.fields) {
			this.fields[fieldName].setTrackOriginal(trackOriginal)
		}
		this.rules.trackOriginal = trackOriginal
	}

	setValue(
		value: any,
		resetOriginal = false
	) {
		for (const fieldName in this.fields) {
			const field = this.fields[fieldName]
			field.setValue(value[fieldName], resetOriginal)
		}
	}

	touch(
		fromChild?: boolean,
		fromParent?: boolean
	): void {
		let change
		if (!fromChild) {
			if (!fromParent) {
				change = addChange()
			} else {
				change = getChange()
			}
		}

		if (!fromChild) {
			for (const fieldName in this.fields) {
				this.fields[fieldName].touch(false, true)
			}
		}
		super.touch(fromChild, fromParent)

		if (!fromChild && !fromParent) {
			this.detect(change)
		}
	}

	/**
	 * If a Group is optional:
	 *    If it has values, check all validators
	 *    It it does not have any values, and only required validators on it's
	 *    child fields are erroring, then it is valid
	 *
	 * Group must have a required validator to be required and is otherwise optional
	 * @param fromParentGroup
	 * @param relatedField
	 */

	setRun(
		runNumber: number
	): void {
		super.setRun(runNumber)

		for (const fieldName in this.fields) {
			this.fields[fieldName].setRun(runNumber)
		}
	}

	validate(
		external = true,
		fromParentGroup?: boolean,
		relatedField?: IFieldBase,
		originalCheckOnly: boolean = false
	): void {
		if (!this.shouldValidate(external)) {
			return
		}
		this.hasChildValues = false
		this.valid          = true
		this.theIsOriginal  = true

		for (const fieldName in this.fields) {
			const field = this.fields[fieldName]
			if (!originalCheckOnly
				&& (!relatedField ||
					relatedField !== field)) {
				field.validate(false, true)
			}
			this.hasChildValues = this.hasChildValues || field.hasValue
			if (!field.valid) {
				this.valid = false
			}

			if (!field.isOriginal()) {
				this.theIsOriginal = false
			}
		}

		// FIXME: add FieldGroup validation
		// validate(this)

		this.valid = this.valid || (!this.hasChildValues && !this.validatorMap.required)

		this.error = this.valid
			? null
			: {
				key: 'grouping',
				message: this.text.error as string
			}

		if (this.group) {
			this.group.validate(false, false, this)
		}
		for (const page of this.components) {
			page.setIsValid(this.valid)
			page.setIsOriginal(this.theIsOriginal)
		}
	}

}
