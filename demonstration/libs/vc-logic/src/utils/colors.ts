import { get } from './ajax'
import { HASH } from './hash'
import { loadColorsText } from './textColors'

var rawColors

export async function loadColors() {
	if (rawColors) {
		return rawColors
	}

	const data = await get(`./assets/data/colors${HASH}.json`)
	rawColors = JSON.parse(data as string)

	return rawColors
}

var colors,
	colorMap

export async function getColors() {
	if (colors) {
		return {
			colors,
			colorMap
		}
	}

	const [
		rawColors,
		colorText
	] = await Promise.all([
		loadColors(),
		loadColorsText('en-us')
	])

	colors = []
	colorMap = {}
	for (let index = 0; index < rawColors.length; index++) {
		const rawColor = rawColors[index]

		const color = {
			blue: rawColor.color[2],
			green: rawColor.color[1],
			index,
			name: colorText[index],
			red: rawColor.color[0]
		}
		colors.push(color)

		const key = getColorKey(color)
		colorMap[key] = color
	}

	return {
		colors,
		colorMap
	}
}

export function getColorKey(
	color
) {
	return color.red + '-' + color.green + '-' + color.blue
}
