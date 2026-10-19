import {get, HASH}     from '@votecube/vc-logic'
import {setText} from './setText'

export var loadUi = async (
	locale: string
) => {
	const text = await get(`./assets/text/${locale}/ui${HASH}.json`)

	return setText(text as string)
}
// return get(`./text/${locale}/ui.json`).then(text => setText(store, text))

// switch (locale) {
//     case 'en-us': {
// import('@votecube/text_en-us/lib/ui').then(text => setText(store, text))
// break
// }
// }
