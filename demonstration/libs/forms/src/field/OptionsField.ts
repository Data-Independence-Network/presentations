import { IValidator } from '../validator/Validator'
import {
	Field,
	IField,
	IFieldRules,
	LabelRule
} from './Field'

export interface IFieldOption {
	id: string | number
	text?: string

	[optionalKey: string]: any
}

export interface IOptionsField
	extends IField {
	filteredOptions: IFieldOption[]
	options: IFieldOption[]
	optionText: { [optionKey: string]: string }
	selectionMap: { [optionKey: string]: IFieldOption }

	clear(): void

	select(
		option: IFieldOption
	)

	unselect(
		optionToUnselect?: IFieldOption
	)
}

export interface IOptionFieldRules
	extends IFieldRules {
	multi?: boolean
}

export class OptionsField
	extends Field
	implements IOptionsField {

	filteredOptions: IFieldOption[] = []
	optionsMap: { [optionKey: string]: IFieldOption } = {}
	originalSelectionMap: { [optionKey: string]: IFieldOption } = {}
	selectionMap: { [optionKey: string]: IFieldOption } = {}
	theOptions: IFieldOption[]

	constructor(
		validators: IValidator[],
		options: IFieldOption[] = [],
		rules?: IOptionFieldRules
	) {
		super(validators, {
			...rules as any,
			label: LabelRule.OVER
		})
		this.theValue = rules && rules.multi ? [] : null
		this.originalValue = rules && rules.multi ? [] : null

		this.setOptions(options)
	}

	get options(): IFieldOption[] {
		return this.theOptions
	}

	set options(
		newOptions: IFieldOption[]
	) {
		this.setOptions(newOptions)

		const newValue = []
		const newSelectionMap = {}
		let valueChanged = false
		for (const selection of this.value) {
			if (!this.optionsMap[selection.id]) {
				valueChanged = true
			} else {
				newSelectionMap[selection.id] = selection
				newValue.push(selection)
			}
		}
		if (valueChanged) {
			this.selectionMap = newSelectionMap
			this.value = newValue
			this.validate(true, false)
		}
		this.detect()
	}

	set optionText(
		textMap
	) {
		for (const option of this.options) {
			option.text = textMap[option.id]
		}
	}

	get value() {
		return this.theValue
	}

	set value(
		value
	) {
		this.setValue(value)
	}

	clear(): void {
		if (this.theValue instanceof Array) {
			this.selectionMap = {}
			this.value = []
			this.filterOptions()
		} else {
			this.value = null
		}
		this.onBlur()
		this.onValueChanged()
	}

	hidePopup(): void {
		if (this.components[0].setShowOptions) {
			this.components[0].setShowOptions(false)
		}
	}

	isOriginal(): boolean {
		if (!this.rules.trackOriginal) {
			return true
		}

		this.theIsOriginal = this.getOriginal()

		return this.theIsOriginal
	}

	revert(): void {
		if (!this.originalValue
			|| (this.originalValue instanceof Array
				&& !this.originalValue.length)) {
			this.clear()
		} else {
			this.setValue(this.originalValue)
			this.onBlur()
		}
	}

	select(
		option: IFieldOption
	) {
		this.doSelect(option)
		this.onBlur()
	}

	setValue(
		value,
		resetOriginal = false
	) {
		const valueIsArray = this.theValue instanceof Array
		this.theValue = null
		if (valueIsArray) {
			this.theValue = []
			if (!value) {
				return
			}
			value.forEach(
				aValue => this.selectValue(aValue))
		} else {
			this.selectValue(value)
		}
		if (resetOriginal) {
			if (this.theValue instanceof Array) {
				this.originalValue = [
					...value
				]
				this.originalSelectionMap = {}
				value.forEach(
					aValue => {
						this.originalSelectionMap[aValue.id] = aValue
					})
			} else {
				this.originalValue = value
			}
		}
	}

	unselect(
		optionToUnselect?: IFieldOption
	) {
		if (this.theValue instanceof Array) {
			delete this.selectionMap[optionToUnselect.id]
			this.theValue = this.theValue.filter(
				option => option !== optionToUnselect)
			this.filterOptions()
		} else {
			this.theValue = null
		}
		this.onValueChanged()
		this.onBlur()
	}

	protected getOriginal(): boolean {
		if (this.theValue instanceof Array) {
			for (const aValue of this.originalValue) {
				if (!this.selectionMap[aValue.id]) {
					return false
				}
			}
			for (const aValue of this.theValue) {
				if (!this.originalSelectionMap[aValue.id]) {
					return false
				}
			}
			return true
		} else {
			if (!this.originalValue) {
				if (this.theValue) {
					return false
				}
			} else if (!this.theValue) {
				if (this.originalValue) {
					return false
				}
			} else {
				return this.originalValue.id === this.theValue.id
			}
			return true
		}
	}

	private doSelect(
		option: IFieldOption
	) {
		if (this.theValue instanceof Array) {
			this.selectionMap[option.id] = option
			this.theValue = [...this.theValue, option]
			this.filterOptions()
		} else {
			this.theValue = option
		}
		this.onValueChanged()
	}

	private filterOptions() {
		this.filteredOptions = this.options.filter(
			option => !this.selectionMap[option.id])
	}

	private selectValue(
		value
	) {
		let matchingOption
		if (value) {
			matchingOption = this.optionsMap[value.id]
		}
		if (matchingOption) {
			this.doSelect(matchingOption)
		}
	}

	private setOptions(
		newOptions: IFieldOption[]
	): void {
		this.theOptions = newOptions
		this.filterOptions()

		this.optionsMap = {}
		for (let newOption of newOptions) {
			this.optionsMap[newOption.id] = newOption
		}
	}

}
