import { Inject, Injected } from '@airport/direction-indicator'
import {
	Factor_Number
} from '@votecube/cube-logic'
import {
	ITweenAgreement,
	ITweenAgreementFactor,
	IUiAgreement,
	IUiAgreementFactor,
	AgreementFactor_Value
} from '@votecube/model'
import {
	Observable,
	Subject
} from 'rxjs'
import { IIdeaFormManager } from '../IdeaFormManager'

type FrameDuration = number
type FrameNumber = number
type NumberOfFrames = number

export interface IFactorFrameConfig {
	newDirFrameNumber: FrameNumber
	newAgreementFactor: ITweenAgreementFactor
	newAgreementValue: AgreementFactor_Value
	numNewDirFrames: NumberOfFrames
	numOldDirFrames: NumberOfFrames
	numRemainingOldDirFrames: NumberOfFrames
	oldAgreementFactor: IUiAgreementFactor
	oldAgreementValue: AgreementFactor_Value
	zeroValueFrameNumber: FrameNumber
}

export interface IUiAgreementFrameConfig {
	1: IFactorFrameConfig
	2: IFactorFrameConfig
	3: IFactorFrameConfig
}

export interface IFactorConfig {
	newAgreementFactor: ITweenAgreementFactor
}

export interface IIdeaMainLogic {

	copyAgreementToTween(
		agreement: IUiAgreement,
		lastAgreement: IUiAgreement
	): ITweenAgreement

	scheduleFactorTweens(
		oldAgreement: IUiAgreement,
		newAgreement: ITweenAgreement,
		durationMillis: FrameDuration,
	): Observable<ITweenAgreement>

	agreementsEqual(
		lastAgreement: IUiAgreement,
		agreement: IUiAgreement
	): boolean

}

@Injected()
export class IdeaMainLogic
	implements IIdeaMainLogic {

	@Inject()
	ideaFormManager: IIdeaFormManager

	agreementsEqual(
		lastAgreement: IUiAgreement,
		agreement: IUiAgreement
	): boolean {
		return lastAgreement && agreement
			&& lastAgreement[1].outcome === agreement[1].outcome
			&& lastAgreement[2].outcome === agreement[2].outcome
			&& lastAgreement[3].outcome === agreement[3].outcome
			&& lastAgreement[1].value === agreement[1].value
			&& lastAgreement[2].value === agreement[2].value
			&& lastAgreement[3].value === agreement[3].value
	}

	copyAgreementToTween(
		agreement: IUiAgreement,
		lastAgreement: IUiAgreement
	): ITweenAgreement {
		return {
			...this.ideaFormManager.getBlankUiRepositoryRecord(),
			1: this.getTweenAgreementFactor(agreement, lastAgreement, 1),
			2: this.getTweenAgreementFactor(agreement, lastAgreement, 2),
			3: this.getTweenAgreementFactor(agreement, lastAgreement, 3)
		}
	}

	scheduleFactorTweens(
		oldAgreement: IUiAgreement,
		newAgreement: ITweenAgreement,
		durationMillis: FrameDuration,
	): Observable<ITweenAgreement> {

		const subject = new Subject<ITweenAgreement>()

		// const durationMillis    = 15000
		// const durationMillis    = 300
		const numFrames = Math.ceil(durationMillis / 17)
		let numRemainingFrames = numFrames

		const config: IUiAgreementFrameConfig = {
			1: this.setupFactorTween(1, oldAgreement, newAgreement, numFrames),
			2: this.setupFactorTween(2, oldAgreement, newAgreement, numFrames),
			3: this.setupFactorTween(3, oldAgreement, newAgreement, numFrames)
		}

		const intervalHandle = setInterval(() => {
			this.runFactorTween(config[1], numRemainingFrames)
			this.runFactorTween(config[2], numRemainingFrames)
			this.runFactorTween(config[3], numRemainingFrames)

			numRemainingFrames--
			if (!numRemainingFrames) {
				this.setFinalFactor(newAgreement[1], config[1])
				this.setFinalFactor(newAgreement[2], config[2])
				this.setFinalFactor(newAgreement[3], config[3])
				clearInterval(intervalHandle)
			}

			subject.next(newAgreement)

			// page.set({factorDelta: page.get().factorDelta + 1})
		}, 17)

		return subject
	}

	private getTweenAgreementFactor(
		agreement,
		agreementAgreement,
		factorNumber
	): ITweenAgreementFactor {
		return {
			_actorRecordId: null,
			actor: null,
			ageSuitability: null,
			factorNumber,
			outcome: agreement[factorNumber].outcome,
			repository: null,
			tweenOutcome: agreementAgreement[factorNumber].outcome,
			tweenValue: agreementAgreement[factorNumber].value,
			value: agreement[factorNumber].value
		}
	}

	private runFactorTween(
		config: IFactorFrameConfig,
		numRemainingFrames: NumberOfFrames
	): void {
		config.newDirFrameNumber++

		const {
			newDirFrameNumber,
			newAgreementFactor,
			newAgreementValue,
			numNewDirFrames,
			numOldDirFrames,
			numRemainingOldDirFrames,
			oldAgreementFactor,
			oldAgreementValue,
			zeroValueFrameNumber
		} = config

		if (zeroValueFrameNumber) {
			if (newAgreementFactor.outcome
				&& numRemainingFrames === zeroValueFrameNumber) {
				newAgreementFactor.tweenValue = 0
				newAgreementFactor.tweenOutcome = newAgreementFactor.outcome
			} else if (!newAgreementFactor.outcome
				|| numRemainingFrames > zeroValueFrameNumber) {
				// Always go here if the factor is being removed (dir === 0)
				newAgreementFactor.tweenValue = Math.floor(oldAgreementValue
					/ numOldDirFrames * numRemainingOldDirFrames) as AgreementFactor_Value
				newAgreementFactor.tweenOutcome = oldAgreementFactor.outcome
			} else {
				newAgreementFactor.tweenValue = Math.floor(newAgreementValue
					/ numNewDirFrames * newDirFrameNumber) as AgreementFactor_Value
				newAgreementFactor.tweenOutcome = newAgreementFactor.outcome
			}
		} else {
			const factorValue = oldAgreementValue + ((newAgreementValue - oldAgreementValue)
				/ numNewDirFrames * newDirFrameNumber)
			newAgreementFactor.tweenValue = newAgreementValue > oldAgreementValue
				? Math.floor(factorValue) as AgreementFactor_Value
				: Math.ceil(factorValue) as AgreementFactor_Value
			newAgreementFactor.tweenOutcome = newAgreementFactor.outcome
		}

		config.numRemainingOldDirFrames--
	}

	// if(!newAgreementFactor.dir) {
	private setFinalFactor(
		newAgreementFactor: ITweenAgreementFactor,
		outcomeConfig: IFactorConfig
	): void {
		newAgreementFactor.tweenOutcome = outcomeConfig.newAgreementFactor.outcome
		// }
		newAgreementFactor.tweenValue = outcomeConfig.newAgreementFactor.value
	}

	private setupFactorTween(
		factorNumber: Factor_Number,
		oldAgreement: IUiAgreement,
		newAgreement: ITweenAgreement,
		numFrames: NumberOfFrames
	): IFactorFrameConfig {

		const oldAgreementFactor: IUiAgreementFactor = oldAgreement[factorNumber]
		const newAgreementFactor: ITweenAgreementFactor = newAgreement[factorNumber]

		const oldAgreementValue: AgreementFactor_Value = oldAgreementFactor.value
		const newAgreementValue: AgreementFactor_Value = newAgreementFactor.value

		let zeroValueFrameNumber: FrameNumber = 0
		let numNewDirFrames: NumberOfFrames
		let numOldDirFrames: NumberOfFrames = 0
		let newDirFrameNumber: FrameNumber = 0
		let numRemainingOldDirFrames: NumberOfFrames = 0
		if (oldAgreementFactor.outcome !== newAgreementFactor.outcome) {
			const valueDifference = oldAgreementValue + newAgreementValue
			const oldAgreementFraction = oldAgreementValue / valueDifference
			numOldDirFrames = zeroValueFrameNumber = Math.ceil(numFrames * oldAgreementFraction)
			numRemainingOldDirFrames = numOldDirFrames
			numNewDirFrames = numFrames - numOldDirFrames
			newDirFrameNumber = -numOldDirFrames
			newAgreementFactor.tweenOutcome = oldAgreementFactor.outcome
		} else {
			numNewDirFrames = numFrames
			newAgreementFactor.tweenOutcome = newAgreementFactor.outcome
		}

		return {
			newDirFrameNumber,
			newAgreementFactor,
			newAgreementValue,
			numNewDirFrames,
			numOldDirFrames,
			numRemainingOldDirFrames,
			oldAgreementFactor,
			oldAgreementValue,
			zeroValueFrameNumber
		}
	}

}
