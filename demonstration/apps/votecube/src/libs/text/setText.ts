import {text} from '@votecube/ui-logic'
import {get}  from 'svelte/store'

export function setText(
	textString: string
) {
	text.set({
		...JSON.parse(textString),
		...get(text)
	})
}
