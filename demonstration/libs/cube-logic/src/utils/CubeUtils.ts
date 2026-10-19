import { Injected } from "@airport/direction-indicator"

export interface IIsKnownElementOfTag {
	(): boolean

	(tagName: string): IIsKnownElementOfTag
}

export interface ICubeUtils {

	// Get by query selector
	gQ(
		selector: string // selector
	): Element

	// Prevent default
	pD(
		ev: Event // Event
	): void

	// is tag
	iT(t: Element): boolean

	iT(
		t: Element,
		tN: string,
		aM?: boolean
	): IIsKnownElementOfTag

	iT(
		target: Element, // target
		tagName?: string, // tag name
		aggregateMatch?: boolean  // aggregate match
	): any

	secondIsGreaterShortCircuit(
		chain: any[][]
	): boolean

}

@Injected()
export class CubeUtils
	implements ICubeUtils {

	// Get by query selector
	gQ(
		selector: string // selector
	): Element {
		return document.querySelector(selector)
	}

	// Prevent default
	pD(
		ev: Event // Event
	): void {
		ev.preventDefault()
	}

	// is tag
	iT(t: Element): boolean;
	iT(
		t: Element,
		tN: string,
		aM?: boolean
	): IIsKnownElementOfTag;
	iT(
		target: Element, // target
		tagName?: string, // tag name
		aggregateMatch?: boolean  // aggregate match
	): any {
		if (!tagName) {
			return aggregateMatch
		}
		if (!aggregateMatch) {
			aggregateMatch = target.tagName === tagName
		}
		return (
			tagName2?: string // tag name
		) => {
			return this.iT(target, tagName2, aggregateMatch)
		}
	}

	secondIsGreaterShortCircuit(
		chain: any[][]
	): boolean {
		for (const pair of chain) {
			if (pair[1] > pair[0]) {
				return true
			}
			if (pair[1] < pair[0]) {
				return false
			}
		}
		return false
	}

}
