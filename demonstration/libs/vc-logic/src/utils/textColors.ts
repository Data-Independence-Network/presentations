
import {get}  from './ajax'
import {HASH} from './hash'

var colorText

export async function loadColorsText(
	locale: string
) {
	if (colorText) {
		return colorText
	}

	const text = await get(`./assets/text/${locale}/colors${HASH}.json`)
	colorText  = JSON.parse(text as string)

	return colorText
}