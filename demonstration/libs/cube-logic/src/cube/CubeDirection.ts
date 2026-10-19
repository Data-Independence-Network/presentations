import {
	DirectionVector,
	MovementDirection
}                       from './CubeEventListener'
import {IPosition}      from './CubeMovement'

export interface IMoveCoords {
	moveX: 0 | 1
	moveY: 0 | 1
	xBy: number
	yBy: number
}

export interface ICubeDirection {

	getMove(
		startCoords: IPosition,
		endCoords: IPosition
	): IMoveCoords

}

export class CubeDirection
	implements ICubeDirection {

	getMove(
		startCoords: IPosition,
		endCoords: IPosition
	): IMoveCoords {
		let
			dx,
			dy,
			vx: DirectionVector,
			vy: DirectionVector,
			moveX: 0 | 1           = 0,
			xBy: MovementDirection = 0,
			moveY: 0 | 1           = 0,
			yBy: MovementDirection = 0
		// directionChanged = 0

		vx = this.directionVector(startCoords.x, endCoords.x)
		vy = this.directionVector(startCoords.y, endCoords.y)

		dx = vx[1]
		dy = vy[1]

		// console.log(`dx: ${dx}, dy: ${dy}`)

		if (dx >= 2 && dx / 2 > dy) {
			// If general directionVector is in X
			yBy   = vx[0]
			moveY = 1
		} else if (dy >= 2 && dy / 2 > dx) {
			// If general directionVector is in Y
			xBy   = -vy[0] as MovementDirection
			moveX = 1
		} else if (dx >= 2 && dy >= 2) {
			// Otherwise its in both x and y
			xBy   = -vy[0] as MovementDirection
			yBy   = vx[0]
			moveX = 1
			moveY = 1
		}

		return {
			moveX,
			moveY,
			xBy,
			yBy
		}
	}

	private directionVector(
		fromPosition,
		toPosition
	): DirectionVector {
		let movementDirection
		let changeInPixels // , range
		if (toPosition >= 0 && fromPosition >= 0) {
			// range = 1
			if (toPosition >= fromPosition) {
				movementDirection = 1
				changeInPixels    = toPosition - fromPosition
			} else {
				movementDirection = -1
				changeInPixels    = fromPosition - toPosition
			}
		} else {
			// range = -1
			if (toPosition < fromPosition) {
				movementDirection = -1
				changeInPixels    = toPosition - fromPosition
			} else {
				movementDirection = 1
				changeInPixels    = fromPosition - toPosition
			}
		}
		return [
			movementDirection,
			changeInPixels
			// , range
		]
	}
}
