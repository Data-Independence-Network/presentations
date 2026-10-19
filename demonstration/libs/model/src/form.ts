import { IUiRepositoryRecord } from "./ui";

export enum AgeGroup {
	AGE_0_TO_6 = 'Age: 0 - 6',
	AGE_6_TO_12 = 'Age: 6 - 12',
	AGE_12_TO_16 = 'Age: 12 - 16',
	AGE_16_TO_18 = 'Age: 16 - 18',
	AGE_18_PLUS = 'Age: 18+',
}

export const AGE_GROUPS: string[] = [
	AgeGroup.AGE_0_TO_6,
	AgeGroup.AGE_6_TO_12,
	AgeGroup.AGE_12_TO_16,
	AgeGroup.AGE_16_TO_18,
	AgeGroup.AGE_18_PLUS,
]

export interface IFormField {
	id: IUiRepositoryRecord
	text: string
}

export interface IFormIdea {
	ageGroups: IFormField[]
	factors: {
		1: IFormFactor
		2: IFormFactor
		3: IFormFactor
	}
	labels: IFormField[]
	name: string
	outcomes: {
		A: IFormField
		B: IFormField
	}
}

export interface IFormColor {
	blue: string
	green: string
	red: string
}

export interface IFormFactor {
	color: IFormColor
	name: IFormField
	positions: {
		A: IFormField
		B: IFormField
	}
}
