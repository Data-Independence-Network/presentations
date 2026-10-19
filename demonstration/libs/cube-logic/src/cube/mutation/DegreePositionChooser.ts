import { Inject, Injected } from '@airport/direction-indicator'
import { IViewport } from '../Viewport'
import { IFinalPosition } from './types'

export interface IDegreePositionChooser {

	setFinalDegrees(
		finalPosition: IFinalPosition
	): void

}

@Injected()
export class DegreePositionChooser
	implements IDegreePositionChooser {

	@Inject()
	viewport: IViewport

	setFinalDegrees(
		finalPosition: IFinalPosition,
	): void {
		this.viewport.x = this.getDimDegrees(this.viewport.x, finalPosition.x)
		this.viewport.y = this.getDimDegrees(this.viewport.y, finalPosition.y)
		this.viewport.moveToDegree()
	}

	private getDimDegrees(
		currentDegrees: number,
		newDegreeChange: number
	): number {
		let rotationMultiplier = Math.floor(Math.abs(currentDegrees / 360))

		if (currentDegrees < 0) {
			rotationMultiplier = -rotationMultiplier
		}

		// if (currentDegrees < 180 && newDegreeChange > 180) {
		// 	newDegreeChange -= 360
		// }

		return rotationMultiplier * 360 + newDegreeChange
	}

}
