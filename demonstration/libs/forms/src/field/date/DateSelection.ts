import {IMutableDateState} from './DateField'
import {
	DateOfMonth,
	Month
}                          from './types'

export interface IDateSelection {
	date: DateOfMonth
	month: Month
	year: number
}

export interface IDateSelectionInternal
	extends IDateSelection,
	        IMutableDateState {
	impl: IDateSelection

}

export class DateSelection
	implements IDateSelection,
	           IDateSelectionInternal {

	impl: IDateSelection = {
		date: null,
		month: null,
		year: null
	}

	get date(): DateOfMonth {
		return this.impl.date
	}

	get month(): Month {
		return this.impl.month
	}

	get year(): number {
		return this.impl.year
	}

	setState(
		external: boolean,
		date: DateOfMonth,
		month: Month,
		year: number
	): void {
		this.impl = {
			date,
			month,
			year
		}
	}

}
