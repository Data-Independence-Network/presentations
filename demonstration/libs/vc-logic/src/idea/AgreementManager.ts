import {
	AgreementApi
} from '@votecube/votecube'
import {
	IUiRepositoryRecord,
	IUiIdea,
	IUiAgreement
} from '@votecube/model'
import { Inject, Injected } from '@airport/direction-indicator'
import { IAgreementConverter } from '../converter/AgreementConverter'
import { IIdeaManager } from './IdeaManager'

export interface IAgreementManager {

	getAgreementForIdea(
		// User-information is in AIRport
		ideaRepositoryUuId: string
	): Promise<IUiAgreement>

	saveAgreement(
		idea: IUiIdea,
		agreement: IUiAgreement
	): Promise<void>

	saveCachedIdeaAgreement(
		agreement: IUiAgreement
	): Promise<void>

}

@Injected()
export class AgreementManager
	implements IAgreementManager {

	@Inject()
	agreementConverter: IAgreementConverter

	@Inject()
	ideaManager: IIdeaManager

	agreementApi = new AgreementApi()

	async getAgreementForIdea(
		// User-information is in AIRport
		ideaRepositoryUuid: string
	): Promise<IUiAgreement> {
		if (!ideaRepositoryUuid || ideaRepositoryUuid === ':repositoryGUID') {
			return this.getStubAgreement()
		}

		let agreement = await this.agreementApi
			.getMyAgreementForIdea(ideaRepositoryUuid)
		if (!agreement) {
			return this.getStubAgreement()
		}

		return this.agreementConverter.dbToUi(agreement)
	}

	async saveAgreement(
		idea: IUiIdea,
		agreement: IUiAgreement
	): Promise<void> {
		const dbAgreement = this.agreementConverter.uiToDb(
			agreement, this.ideaManager.cachedIdea.db)

		await this.agreementApi.saveAgreement(dbAgreement)
	}

	async saveCachedIdeaAgreement(
		agreement: IUiAgreement
	): Promise<void> {
		await this.saveAgreement(this.ideaManager.cachedIdea.ui, agreement)
	}

	private getStubAgreement(): IUiAgreement {
		return {
			...this.getStubIds(),
			1: {
				...this.getStubIds(),
				factorNumber: 1,
				outcome: 'A',
				value: 33
			},
			2: {
				...this.getStubIds(),
				factorNumber: 2,
				outcome: 'A',
				value: 33
			},
			3: {
				...this.getStubIds(),
				factorNumber: 3,
				outcome: 'B',
				value: 34
			}
		}
	}

	private getStubIds(): IUiRepositoryRecord {
		return {
			_actorRecordId: 0,
			actor: null,
			ageSuitability: null,
			repository: null,
		}
	}

}
