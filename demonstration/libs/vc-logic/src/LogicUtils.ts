import { Injected } from '@airport/direction-indicator'
import {
	ITweenAgreementFactor,
	IUiColor,
	IUiAgreement,
	IUiAgreementFactor
} from '@votecube/model'
import { runIntroTransition } from './helpers/animation'

interface IUiAgreementFactorNode {

	next?: IUiAgreementFactorNode
	agreementFactor: IUiAgreementFactor

}

export interface ILogicUtils {

	copyProperties(
		from,
		to,
		properties: string[]
	): void

	getArrayValueTexts(
		arrayValue: Array<{
			text: string
		}>
	): string

	getColor(
		color: IUiColor
	): string

	getDate(
		date: Date
	): string

	getTextColor(
		color: IUiColor
	): string

	getAgreementFactorNodesInValueOrder(
		agreement: IUiAgreement
	): IUiAgreementFactor[]

	overlay(
		from,
		to
	): void

	isDifferent(
		original,
		changed,
		excludeKeys?: string[]
	): boolean

	transition(
		elementId: string,
		transitionFunction,
		options
	): void

}

@Injected()
export class LogicUtils
	implements ILogicUtils {

	copyProperties(
		from,
		to,
		properties: string[]
	): void {
		for (const property of properties) {
			if (from[property] !== undefined) {
				to[property] = from[property]
			}
		}
	}

	getArrayValueTexts(
		arrayValue: Array<{
			text: string
		}>
	): string {
		return arrayValue
			.map(
				value => value.text)
			.reduce((
				accumulator,
				text
			) => accumulator + (accumulator
				? ', ' + text
				: text), '')
	}

	getColor(
		color: IUiColor
	): string {
		if (!color) {
			return `FFF`
		}

		const { blue, green, red } = color

		return this.ensure2Digits(red.toString(16))
			+ this.ensure2Digits(green.toString(16))
			+ this.ensure2Digits(blue.toString(16))
	}

	getDate(
		date: Date
	): string {
		if (!date) {
			return 'N/A'
		}

		return `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`
	}

	getTextColor(
		color: IUiColor
	): string {
		const red = parseInt(color.red as any)
		const green = parseInt(color.green as any)
		const blue = parseInt(color.blue as any)
		if (red + green + blue > 384) {
			return '000'
		} else if (red < 10 && blue < 10 && green >= 240) {
			return '000'
		}
		return 'FFF'
	}

	getAgreementFactorNodesInValueOrder<V extends IUiAgreement = IUiAgreement>(
		agreement: V
	): IUiAgreementFactor[] | ITweenAgreementFactor[] {
		if (!agreement) {
			return []
		}
		const node1: IUiAgreementFactorNode = {
			agreementFactor: agreement[1]
		}
		const node2: IUiAgreementFactorNode = {
			agreementFactor: agreement[2]
		}
		const node3: IUiAgreementFactorNode = {
			agreementFactor: agreement[3]
		}
		let headNode
		if (agreement[2].value >= agreement[3].value) {
			node2.next = node3
			headNode = node2
		} else {
			node3.next = node2
			headNode = node3
		}
		if (headNode.agreementFactor.value < agreement[1].value) {
			node1.next = headNode
			headNode = node1
		} else if (headNode.next.agreementFactor.value < agreement[1].value) {
			const lastNode = headNode.next
			headNode.next = node1
			node1.next = lastNode
		} else {
			headNode.next.next = node1
		}

		return [
			headNode.agreementFactor,
			headNode.next.agreementFactor,
			headNode.next.next.agreementFactor
		]
	}

	overlay(
		from,
		to
	): void {
		for (const propertyName in from) {
			if (to[propertyName] !== undefined) {
				const fromProperty = from[propertyName]
				if (fromProperty instanceof Object) {
					this.overlay(fromProperty, to[propertyName])
				}
			} else {
				to[propertyName] = from[propertyName]
			}
		}
	}

	isDifferent(
		original,
		changed,
		excludeKeys: string[] = ['createdAt', 'id', 'marks', 'path', 'userId']
	): boolean {
		if (!original) {
			return true
		}
		let isDifferent = false
		for (const propertyName in original) {
			if (excludeKeys.indexOf(propertyName) > -1) {
				continue
			}
			if (original[propertyName] instanceof Object) {
				isDifferent = this.isDifferent(original[propertyName], changed[propertyName], excludeKeys)
			} else if (changed[propertyName] !== original[propertyName]) {
				return true
			}
			if (isDifferent) {
				return true
			}
		}
	}

	transition(
		elementId: string,
		transitionFunction,
		options
	): void {
		setTimeout(() => {
			const domElementToTransition = document.getElementById(elementId)
			if (!domElementToTransition) {
				return
			}
			runIntroTransition(domElementToTransition, transitionFunction, options)
		})
	}

	private ensure2Digits(
		colorString: string
	): string {
		return colorString.length === 1 ? '0' + colorString : colorString
	}

}
