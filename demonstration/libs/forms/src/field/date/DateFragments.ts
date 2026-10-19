import {isPositiveInteger} from '../../validator/Validator'
import {
	IDetect,
	IValidate
}                          from '../Field'
import {IMutableDateState} from './DateField'
import {
	DateOfMonth,
	Month
}                          from './types'

export enum FragmentType {
	DATE  = 'date',
	MONTH = 'month',
	YEAR  = 'year'
}

/*
TODO: implement additional keydown tracking when needed

export enum LastInputOrKeydownEvent {
	ON_INPUT,
	ON_KEYDOWN
}
*/

export interface IDateFragmentsData {
	date: string
	month: string
	year: string
}

export interface IDateFragments
	extends IDateFragmentsData {
	valid: boolean

	onInput(
		fragmentType: FragmentType,
		element: HTMLInputElement
	): void

	onKeydown(
		fragmentType: FragmentType,
		event: KeyboardEvent
	): void

}

/*
export interface IInputFragmentActivity {
	id: string
	selection: {
		end: number
		start: number
	}
	stringValue: string
}

export interface IDateFragmentsActivity {
	date: IInputFragmentActivity
	inputOrKeydown: LastInputOrKeydownEvent
	month: IInputFragmentActivity
	year: IInputFragmentActivity
}
*/

export interface IInputFragmentValidity<N> {
	isPositiveInteger: boolean
	inRange: boolean
	number: N
}

export interface IDateFragmentsValidity {
	date: IInputFragmentValidity<DateOfMonth>
	fragmentToFocus: FragmentType
	isValid: boolean
	month: IInputFragmentValidity<Month>
	year: IInputFragmentValidity<number>
}

export interface IDateFragmentsInternal
	extends IDateFragments,
	        IMutableDateState {
	impl: IDateFragmentsData
}

export class DateFragments
	implements IDateFragmentsInternal {

	impl: IDateFragmentsData & {
		// last: IDateFragmentsActivity,
		validity: IDateFragmentsValidity
	} = {
		date: '',
		// last: {
		// 	date: this.getActivity(),
		// 	inputOrKeydown: null,
		// 	month: this.getActivity(),
		// 	year: this.getActivity()
		// },
		month: '',
		validity: this.getAssumedValidity(),
		year: ''
	}

	constructor(
		private fieldState: IDetect & IMutableDateState & IValidate
	) {
	}

	get date(): string {
		return this.impl.date
	}

	get month(): string {
		return this.impl.month
	}

	get valid(): boolean {
		return this.impl.validity.isValid
	}

	get year(): string {
		return this.impl.year
	}

	// DateField and DatePicker.html
	// are coupled, so this is here
	onInput(
		fragmentType: FragmentType,
		element: HTMLInputElement
	): void {
		// this.impl.last.inputOrKeydown = LastInputOrKeydownEvent.ON_KEYDOWN
		const currentValue = element.value

		const fragmentTypeToFocus = this.setFragmentValue(
			currentValue, fragmentType)

		const newValue = this[fragmentType]

		if (currentValue !== newValue) {
			// value binding does not work in this case, set manually
			element.value = newValue
		}

		if (fragmentTypeToFocus === fragmentType) {
			return
		}

		this.focusFragment(fragmentTypeToFocus, element)
	}

	onKeydown(
		fragmentType: FragmentType,
		event: KeyboardEvent
	): void {
		const element = event.target as HTMLInputElement

		// this.impl.last[fragmentType] = this.getActivity(
		// 	inputOrKeydown.code, element.selectionEnd, element.selectionStart, element.value)
		// this.impl.last.inputOrKeydown = LastInputOrKeydownEvent.ON_INPUT
		// console.log("onKeydown")
		// console.log(this.impl.last[fragmentType])
		if (event.code !== 'Backspace'
			|| element.selectionEnd !== 0
			|| element.selectionStart !== 0) {
			// TODO: add support other other cases, if needed
			return
		}

		// NOTE: Backspace in input with no selection and cursor at beginning
		// (this case) does not cause input event

		const previousFragmentType = this.getPreviousFragmentType(fragmentType)
		if (!previousFragmentType) {
			return
		}

		let previousValue: string | number = this[previousFragmentType]

		// TODO: possible TS bug? (remove as any)
		if (previousValue || previousValue === 0 as any) {
			previousValue = ('' + previousValue).substr(0, previousValue.length - 1)
		}

		this.setFragmentValue(previousValue, previousFragmentType, true)
		this.focusFragment(previousFragmentType, element)
	}

	setState(
		external: boolean,
		date: DateOfMonth,
		month: Month,
		year: number
	): void {
		this.impl = {
			date: date === null ? '' : date as any,
			// last: this.impl.last,
			month: month === null ? '' : month + 1 as any,
			validity: this.getAssumedValidity(date, month, year),
			year: year === null ? '' : year as any
		}
	}

	private adjustDateOrMonthInputAndRefocus(
		validity: IDateFragmentsValidity,
		dateOrMonthString: string,
		currentFragmentType: FragmentType,
		nextFragmentType: FragmentType,
		singleDigitMaximum: 0 | 3
	): IDateFragmentsValidity {
		// FIXME: add support for non MM/DD/YYYY formats

		// always move ahead of both characters are set
		validity.fragmentToFocus = dateOrMonthString.length === 2
			? nextFragmentType
			: currentFragmentType

		if (!validity[currentFragmentType].isPositiveInteger) {
			return validity
		}

		if (validity[nextFragmentType].number !== null) {
			// Next fragment is already set and cannot be spilled over
			return validity
		}

		const fragmentValidity = validity[currentFragmentType]
		if (fragmentValidity.inRange) {
			switch (dateOrMonthString.length) {
				case 2:
					currentFragmentType = nextFragmentType
					break
				case 1: {
					if (fragmentValidity.number > singleDigitMaximum) {
						currentFragmentType = nextFragmentType
					}
					break
				}
			}
		} else {
			this.impl[currentFragmentType] = dateOrMonthString.substr(0, 1)
			this.impl[nextFragmentType]    = dateOrMonthString.substr(1)
			currentFragmentType            = nextFragmentType
			validity                       = this.getValidity()
		}
		validity.fragmentToFocus = currentFragmentType

		return validity
	}

	private focusFragment(
		fragmentTypeToFocus: FragmentType,
		siblingFragmentElement: HTMLInputElement
	) {
		(siblingFragmentElement.parentElement.getElementsByClassName(fragmentTypeToFocus)
			[0] as any).focus()
	}

	/*
	private getActivity(
		id         = null,
		end         = null,
		start       = null,
		stringValue = null
	): IInputFragmentActivity {
		return {
			id,
			selection: {
				end,
				start
			},
			stringValue
		}
	}
*/

	private getAssumedFragmentValidity<N>(
		fragment: N
	): IInputFragmentValidity<N> {
		if (fragment === null) {
			return {
				inRange: false,
				isPositiveInteger: false,
				number: null
			}
		}

		return {
			inRange: true,
			isPositiveInteger: true,
			number: fragment
		}
	}

	private getAssumedValidity(
		date: DateOfMonth = null,
		month: Month      = null,
		year: number      = null
	): IDateFragmentsValidity {
		return {
			date: this.getAssumedFragmentValidity(date),
			fragmentToFocus: null,
			isValid: true,
			month: this.getAssumedFragmentValidity(month),
			year: this.getAssumedFragmentValidity(year)
		}
	}

	private getInputFragmentValidity<N>(
		fragmentString: string
	): IInputFragmentValidity<N> {
		return {
			inRange: false,
			isPositiveInteger: isPositiveInteger(fragmentString),
			number: null
		}
	}

	private getPreviousFragmentType(
		fragmentType
	): FragmentType | undefined {
		// FIXME: add support for non MM/DD/YYYY formats
		switch (fragmentType) {
			case FragmentType.DATE:
				return FragmentType.MONTH
			case FragmentType.YEAR:
				return FragmentType.DATE
		}
	}

	private getValidity(
		dateString  = this.date,
		monthString = this.month,
		yearString  = this.year
	): IDateFragmentsValidity {
		const date  = this.getInputFragmentValidity<DateOfMonth>(dateString)
		const month = this.getInputFragmentValidity<Month>(monthString)
		const year  = this.getInputFragmentValidity<number>(yearString)

		const validity: IDateFragmentsValidity = {
			date,
			fragmentToFocus: null,
			isValid: false,
			month,
			year
		}

		if (date.isPositiveInteger) {
			const dateNumber = parseInt(dateString) as DateOfMonth
			date.inRange     = dateNumber >= 1 && dateNumber <= 31
			date.number      = dateNumber
		}

		if (month.isPositiveInteger) {
			const monthNumber = parseInt(monthString) - 1 as Month
			month.inRange     = monthNumber >= 0 && monthNumber <= 11
			month.number      = monthNumber
		}

		if (year.isPositiveInteger) {
			const yearNumber = parseInt(yearString)
			year.inRange     = yearNumber >= 0 && yearNumber <= 9999
			year.number      = yearNumber
		}

		if (this.isValid(validity)) {
			const dateObject = new Date(year.number, month.number)
			dateObject.setDate(date.number)
			if (dateObject.getMonth() !== month.number) {
				date.inRange = false
			}
		}

		validity.isValid = this.isValid(validity)

		return validity
	}

	private isValid(
		validity: IDateFragmentsValidity
	): boolean {
		return validity.date.isPositiveInteger
			&& validity.month.isPositiveInteger
			&& validity.year.isPositiveInteger
			&& validity.date.inRange
			&& validity.month.inRange
			&& validity.year.inRange
	}

	private setDate(
		dateString: string,
		onBackspace: boolean
	): FragmentType {
		this.impl.date = dateString
		return this.validateAndSetState(dateString, undefined, undefined, (
			validity: IDateFragmentsValidity
		) => {
			if (onBackspace) {
				// FIXME: add support for non MM/DD/YYYY formats
				validity.fragmentToFocus = FragmentType.DATE
				return validity
			}

			return this.adjustDateOrMonthInputAndRefocus(validity, dateString, FragmentType.DATE, FragmentType.YEAR, 3)
		})
	}

	private setFragmentValue(
		value: string,
		fragmentType: FragmentType,
		onBackspace = false
	): FragmentType {
		switch (fragmentType) {
			case FragmentType.DATE:
				return this.setDate(value, onBackspace)
			case FragmentType.MONTH:
				return this.setMonth(value, onBackspace)
			case FragmentType.YEAR:
				return this.setYear(value, onBackspace)
		}
	}

	private setMonth(
		monthString: string,
		onBackspace: boolean
	): FragmentType {
		this.impl.month = monthString
		return this.validateAndSetState(undefined, monthString, undefined, (
			validity: IDateFragmentsValidity
		) => {
			if (onBackspace) {
				// FIXME: add support for non MM/DD/YYYY formats
				validity.fragmentToFocus = FragmentType.MONTH
				return validity
			}
			return this.adjustDateOrMonthInputAndRefocus(
				validity, monthString, FragmentType.MONTH,
				FragmentType.DATE, 0)
		})
	}

	private setYear(
		yearString: string,
		onBackspace: boolean
	): FragmentType {
		this.impl.year = yearString
		this.validateAndSetState(undefined, undefined, yearString, (
			validity: IDateFragmentsValidity
		) => {
			if (onBackspace) {
				// FIXME: add support for non MM/DD/YYYY formats
				return validity
			}

			return validity
		})

		return FragmentType.YEAR
	}

	private validateAndSetState(
		dateString,
		monthString: string,
		yearString: string,
		spillOverCallback?: (
			validity: IDateFragmentsValidity
		) => IDateFragmentsValidity
	): FragmentType {
		let validity = this.getValidity(dateString, monthString, yearString)

		validity = spillOverCallback(validity)

		this.impl.validity = validity

		if (validity.isValid) {
			this.fieldState.setState(
				true,
				validity.date.number,
				validity.month.number,
				validity.year.number)
		} else {
			// fieldState.setState validates & detects, do so here as well
			this.fieldState.validate()
			this.fieldState.detect()
		}

		return validity.fragmentToFocus
	}

}
