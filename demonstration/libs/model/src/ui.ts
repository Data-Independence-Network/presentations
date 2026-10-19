import { IdeaLabel } from '@votecube/votecube'

export interface IUiCustomEvent<T> {
	detail: T
}
export interface IUiMenuItem {
	auth: boolean
	key: string
	name: string
	path: string
}

export interface IUiRepositoryRecord {
	_actorRecordId: number
	actor: {
		_localId: number
		GUID: string
	}
	ageSuitability: 0 | 6 | 12 | 16 | 18
	id?: string
	repository: {
		_localId: number
		GUID: string
	}
}

export interface IUiNamedRecord
	extends IUiRepositoryRecord {
	name: string
}

export interface IUiLabel
	extends IUiNamedRecord {
	originalDbLabel: IdeaLabel
}

export interface IUiColor {
	blue: number
	green: number
	red: number
}

export interface IUiFactor
	extends IUiNamedRecord {
	axis: 'x' | 'y' | 'z'
	color: IUiColor
	name: string
	positions: {
		A: IUiPosition
		B: IUiPosition
	}
}

export interface IUiOutcome
extends IUiRepositoryRecord {
	name: string
}

export interface IUiPosition
	extends IUiNamedRecord {
	dir: -1 | 1
}

export interface IUiRepository {
	_localId: number
	GUID: string
}

export interface IUiIdea
	extends IUiNamedRecord {
	ageGroups: IUiLabel[]
	labels: IUiLabel[]
	factors: {
		1: IUiFactor
		2: IUiFactor
		3: IUiFactor
	}
	outcomes: {
		A: IUiOutcome
		B: IUiOutcome
	}
	repository: IUiRepository
}

export interface INavList {
	direction: 0 | 1 | -1
	isTarget: boolean
	previous: INavList
	idea: IUiIdea
}
