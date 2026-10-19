import {IDateField} from '../field/date/DateField'
import {utcNow}     from '../field/date/types'
import {minDate}    from './minDate'
import {IValidator} from './Validator'

export function minTomorrow(): IValidator<IDateField> {
	const tomorrow = utcNow()
	tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)

	return minDate(tomorrow)
}
