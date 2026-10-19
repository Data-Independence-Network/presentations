import {
	filterToRangeValidators,
	IValidator
} from '../../validator/Validator'
import {
	Field,
	IField,
	IFieldRules,
	LabelRule
} from '../Field'
import {
	DateFragments,
	IDateFragments
} from './DateFragments'
import {
	DateSelection,
	IDateSelection
} from './DateSelection'
import {
	DateOfMonth,
	Month,
	utcNow
} from './types'

export interface IMonthYearField
	extends IField {
	value: Date

	clear(): void

	reset(): void

	setState(
		month: Month,
		year: number,
		validate?: boolean
	): void

	setToDate(
		external: boolean,
		date: Date
	): void

	setToNow(): void

}

export interface IMutableYearMonthState {

	setState(
		month: Month,
		year: number,
		validate?: boolean
	): void;

}

export interface MonthYearInternal
	extends IMonthYearField,
	IMutableYearMonthState {
}

export class MonthYearField
	extends Field
	implements MonthYearInternal {

	today = new Date()

	private rangeValidators: IValidator[]

	constructor(
		validators: IValidator[],
		rules?: IFieldRules
	) {
		super(validators, rules)

		this.rules.label = LabelRule.OVER

		this.rangeValidators = filterToRangeValidators(validators)
		this.theValue = null

		this.reset()
	}

	get numValue(): number {
		return this.value
			? this.value.getTime()
			: null
	}

	get value() {
		return this.theValue
	}

	set value(
		value: Date
	) {
		this.setValue(value)
	}

	clear(): void {
		this.setState(null, null)
	}

	hidePopup(): void {
		if (this.components[0].setShowCalendar) {
			this.components[0].setShowCalendar(false)
		}
	}

	isOriginal(): boolean {
		if (!this.rules.trackOriginal) {
			return true
		}

		this.theIsOriginal = this.getOriginal()

		return this.theIsOriginal
	}

	reset(): void {
		this.setState(null, null, false)
	}

	revert(): void {
		if (!this.originalValue) {
			this.clear()
		} else {
			this.setToDate(true, this.originalValue)
		}
	}

	setToDate(
		external: boolean,
		date: Date // UTC only
	): void {
		this.setState(date.getUTCMonth() as Month, date.getUTCFullYear())
	}

	setToNow(): void {
		this.setToDate(true, utcNow())
	}

	setValue(
		value: Date,
		resetOriginal = false
	): void {
		if (value) {
			this.setToDate(false, value)
		} else {
			this.clear()
		}

		if (resetOriginal) {
			this.originalValue = new Date(this.theValue.getTime())
		}
	}

	private getLastDateOfMonth(
		calendarMonth: Month
	): DateOfMonth {
		switch (calendarMonth) {
			case 0:
				return 31
			case 1:
				// FIXME: compute for Feb 29th
				return 28
			case 2:
				return 31
			case 3:
				return 30
			case 4:
				return 31
			case 5:
				return 30
			case 6:
				return 31
			case 7:
				return 31
			case 8:
				return 30
			case 9:
				return 31
			case 10:
				return 30
			case 11:
				return 31
		}
	}

	setState(
		month: Month,
		year: number,
		validate = true
	): void {
		if (year && (month || month === 0)) {
			const date = this.getLastDateOfMonth(month)
			this.theValue = new Date(Date.UTC(year, month, date, 23, 59, 59, 999))
		} else {
			this.theValue = null
		}
		if (!validate) {
			return
		}
		this.onValueChanged()

		this.validate(true, false)
		this.detect()
	}

	validate(
		external = true,
		fromParentGroup?: boolean
	): void {
		// if (this.fragments.valid) {
		super.validate(external, fromParentGroup)
		// } else {
		// 	if (!this.shouldValidate(external)) {
		// 		return
		// 	}
		// 	const key = 'format'
		// 	this.errors = [{
		// 		key,
		// 		message: this.text.errors[key]
		// 	}]
		// 	this.updateValidity(fromParentGroup)
		// }
	}

	protected getOriginal(): boolean {
		if (!this.originalValue) {
			if (this.theValue) {
				return false
			}
		} else if (!this.theValue) {
			if (this.originalValue) {
				return false
			}
		} else {
			return this.originalValue.getTime() === this.theValue.getTime()
		}

		return true
	}

}
