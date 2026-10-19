import {
	addChange,
	getChange
}                    from '../changeTracker'
import {IValidator}  from '../validator/Validator'
import {IFieldGroup} from './FieldGroup'

export interface IFieldError {
	key: string;
	message?: string;

	[otherKey: string]: any;
}

export interface IComponent {
	setDelta(newDelta: number): void;

	setIsOriginal(newIsOriginal: boolean): void;

	setIsValid(newIsValid: boolean): void;

	setShowCalendar(newShowCalendar: boolean): void;

	setShowOptions(newShowOptions: boolean): void;
}

export interface IFieldBase {

	changeFlags: any
	components: IComponent[]
	displayValue: any
	errors: IFieldError[]
	group: IFieldGroup
	hasValue: boolean
	// inputValue: string
	id: string
	isRequired: boolean
	name: string
	optionText
	pristine: boolean
	text
	theIsOriginal: boolean
	touched: boolean
	valid: boolean
	validationRun: number
	validators?: IValidator[]
	validatorMap?: { [validatorName: string]: IValidator }
	value: any

	addComponent(
		component: IComponent
	): void

	setRun(
		runNumber: number
	): void

	clearComponents(): void

	focus(): void

	hidePopup(): void

	isSame(
		val1: any,
		val2: any
	): boolean

	isOriginal(): boolean

	displayMatches(): boolean

	onChange(
		callback: (
			value: any
		) => void
	): void

	removeComponent(
		component: IComponent
	): void

	removeComponent(
		component: IComponent
	): void

	revert(): void

	setAsField(
		component: IComponent
	): void

	setTrackOriginal(
		trackOriginal: boolean
	): void

	setValue(
		newValue: any,
		resetOriginal?: boolean
	): void

	touch(
		fromChild?: boolean,
		formParent?: boolean
	): void

	validate(
		external?: boolean,
		fromParentGroup?: boolean,
		relatedField?: IFieldBase,
		originalCheckOnly?: boolean
	): void

}

export abstract class FieldBase
	implements IFieldBase {

	// array: IFieldArray
	dirty                    = false
	errors: IFieldError[]    = []
	group: IFieldGroup
	id = ''
	lastValue: any
	name: string
	// optionText
	components: IComponent[] = []
	pristine                 = true
	text
	theIsOriginal            = true
	valid                    = null
	validationRun            = 0
	validatorMap
	valueChangeCallbacks     = []

	protected theValue: any
	protected originalValue: any

	private theTouched = false

	protected _optionText: string

	constructor(
		public validators: IValidator[] = []
	) {
		this.validatorMap = {}
		for (const validator of validators) {
			this.validatorMap[validator.type] = validator
		}
	}

	get hasValue(): boolean {
		return this.theValue != null
			&& this.theValue !== ''
	}

	get isRequired(): boolean {
		return this.validatorMap.required
	}

	get optionText(): string {
		return this._optionText
	}

	set optionText(
		newOptionText: string
	) {
		this._optionText = newOptionText 
	}

	get touched(): boolean {
		return this.theTouched
	}

	get value() {
		return this.theValue
	}

	set value(
		newValue
	) {
		this.setValue(newValue)
	}

	get changeFlags(): any {
		return this.isOriginal() ? 0 : 1
	}

	get displayValue() {
		return this.theValue
	}

	displayMatches(): boolean {
		return false
	}

	setRun(
		runNumber: number
	): void {
		this.validationRun = runNumber
	}

	addComponent(
		component: IComponent
	): void {
		this.components.push(component)
	}

	clearComponents(): void {
		this.components = []
	}

	detect(
		reuseChange?: number
	): void {
		setTimeout(() => {
			const delta = reuseChange
				? reuseChange
				: reuseChange === 0
					? getChange()
					: addChange()
			for (const page of this.components) {
				page.setDelta(delta)
			}
		})
	}

	focus(): void {
		this.group.hideOtherPopups(this)
	}

	hidePopup(): void {
		// nothing to do for fields with no popups
	}

	isSame(
		val1: any,
		val2: any
	): boolean {
		if (val1 instanceof Object) {
			if (!(val2 instanceof Object)) {
				return false
			}

			for (const property in val1) {
				if (!this.isSame(val1[property], val2[property])) {
					return false
				}
			}
			for (const property in val2) {
				if (!this.isSame(val1[property], val2[property])) {
					return false
				}
			}

			return true
		} else {
			return val2 === val1
		}
	}

	abstract isOriginal(): boolean;

	onChange(
		callback: (
			value: any
		) => void
	): void {
		this.valueChangeCallbacks.push(callback)
	}

	removeComponent(
		component: IComponent
	): void {
		for (let index = this.components.length - 1; index >= 0; index--) {
			const currentComponent = this.components[index]
			if (component === currentComponent) {
				this.components.splice(index, 1)
				break
			}
		}
	}

	revert(): void {
		const originalValue = this.originalValue
		if (originalValue instanceof Object) {
			this.theValue = {}
			for (const property in originalValue) {
				this.theValue[property] = originalValue[property]
			}
		} else {
			this.theValue = this.originalValue
		}
	}

	setAsField(
		component: IComponent
	): void {
		this.components.unshift(component)
	}

	abstract setTrackOriginal(
		trackOriginal: boolean
	): void

	setValue(
		newValue: any,
		resetOriginal = false
	): void {
		this.theValue = newValue
		if (resetOriginal) {
			if (newValue instanceof Object) {
				this.originalValue = {}
				for (const property in newValue) {
					this.originalValue[property] = newValue[property]
				}
			} else {
				this.originalValue = newValue
			}
		}
		this.onValueChanged()
	}

	touch(
		fromChild?: boolean,
		formParent?: boolean
	): void {
		this.theTouched = true
		if (!formParent) {
			if (this.group) {
				this.group.touch(true)
			}
		} else {
			this.detect(0)
		}
	}

	abstract validate(
		external?: boolean,
		fromParentGroup?: boolean,
		relatedField?: IFieldBase
	): void;

	protected onValueChanged() {
		setTimeout(() => {
			for (const callback of this.valueChangeCallbacks) {
				callback(this.theValue)
			}
		})
	}

	protected shouldValidate(
		external: boolean
	) {
		if (external) {
			VALIDATION_RUN_NUMBER++
		}
		if (this.validationRun !== VALIDATION_RUN_NUMBER) {
			this.validationRun = VALIDATION_RUN_NUMBER
			return true
		}

		return false
	}

}

export function validate(
	field: FieldBase
) {
	field.errors = []

	field.validators.some(
		validator => {
			const error = validator(field)
			if (error) {
				if (error instanceof Array) {
					error.forEach(
						anError => {
							anError.message = field.text.errors[anError.key]
						})
					field.errors = field.errors.concat(error)
				} else {
					error.message = field.text.errors[error.key]
					field.errors.push(error)
				}

				return true
			}
		})
}

let VALIDATION_RUN_NUMBER = 0
