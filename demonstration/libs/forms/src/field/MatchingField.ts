import { IFieldRules, IValidator } from '../votecube-forms.index'
import {
	Field,
	IField
} from './Field'

export interface IMatchingField
	extends IField {
	matches: IMatch[]
}

export interface IMatch {
	id: {
		actorId: number,
		actorRecordId: number,
		repositoryId: number,
		repositoryGUID: string
	}
	text: string
}

export class MatchingField
	extends Field
	implements IMatchingField {

	private theMatches: IMatch[] = []

	get matches(): IMatch[] {
		return this.theMatches
	}

	set matches(
		newMatches: IMatch[]
	) {
		this.theMatches = newMatches

		this.detect()
	}

	get value() {
		return this.theValue
	}

	set value(
		textOrValue
	) {
		let value = this.internalSetValue(textOrValue)

		this.setValue(value)

		if (value.text && value.text.trim().length > 2) {
			this.matchCallback(value.text).then(matches => {
				for (const match of matches) {
					if (match.text == this.theValue.text) {
						this.setValue(match)
						break
					}
				}
				this.matches = matches
			})
		}
	}

	get displayValue() {
		return this.theValue.text
	}

	constructor(
		private matchCallback: (
			text: string
		) => Promise<IMatch[]>,
		validators?: IValidator[],
		rules?: IFieldRules
	) {
		super(validators, rules)
		this.internalSetValue('')
	}

	displayMatches(): boolean {
		return !!(this.matches && this.matches.length)
	}

	private internalSetValue(
		textOrValue
	): IMatch {
		if (!textOrValue) {
			textOrValue = ''
		}
		let value
		let text
		if (textOrValue.id) {
			value = textOrValue
			text = textOrValue.text
			if (!text) {
				text = ''
				value.text = text
			}
		} else {
			text = textOrValue
			value = {
				id: {
					actorId: null,
					actorRecordId: null,
					repositoryId: null,
					repositoryGUID: ''
				},
				text: textOrValue
			}
		}
		this.theValue = value

		return value
	}

}
