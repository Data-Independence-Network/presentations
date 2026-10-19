import { Inject, Injected } from '@airport/direction-indicator'
import { IFieldGroup } from '@votecube/forms'
import { RepositoryApi } from '@airport/holding-pattern'
import { IRepositoryIdentifier } from '@airport/ground-control'
import type {
	IUiAgreement,
	IUiIdea,
	IUiLabel,
} from '@votecube/model'
import {
	Idea,
	IdeaApi
} from '@votecube/votecube'
import { ILogicUtils } from '../LogicUtils'
import { IIdeaConverter } from '../converter/IdeaConverter'
import { IIdeaFormManager } from '../pages/idea/IdeaFormManager'
import { ICubeLogic } from './CubeLogic'

export interface IPageAgreement
	extends IUiAgreement {
	changeMillis?: number
}

export interface IIdeaManager {

	cachedIdea: ICachedIdea

	getIdea(
		hostingPlatform: string,
		repositoryGUID: string
	): Promise<IUiIdea>

	getAllIdeas(): Promise<IUiIdea[]>

	getIdeasForCategory(
		category: IUiLabel
	): Promise<IUiIdea[]>

	getLeafIdeas(
		stemIdeaRepositoryUuId: string
	): Promise<IUiIdea[]>

	getStemIdea(
		leafIdeaUuId: string
	): Promise<IUiIdea>

	mergeForm(): Promise<void>

	saveIdea(
		idea: IUiIdea,
		createNewRepository: boolean
	): Promise<IRepositoryIdentifier>

	saveCachedIdea(
		user,
		createNewRepository: boolean
	): Promise<IRepositoryIdentifier>
}

export interface ICachedIdea {
	db: Idea
	form?: IFieldGroup
	originalUi: IUiIdea
	ui: IUiIdea
}

@Injected()
export class IdeaManager
	implements IIdeaManager {

	@Inject()
	cubeLogic: ICubeLogic

	@Inject()
	logicUtils: ILogicUtils

	@Inject()
	ideaFormManager: IIdeaFormManager

	@Inject()
	ideaConverter: IIdeaConverter

	ideaApi = new IdeaApi()

	repositoryApi = new RepositoryApi()

	private theCachedIdea: ICachedIdea = {
		db: null,
		form: null,
		originalUi: null,
		ui: null,
	}

	get cachedIdea(): ICachedIdea {
		return this.theCachedIdea
	}

	async getIdea(
		hostingPlatform: string,
		repositoryGUID: string
	): Promise<IUiIdea> {
		const ui = this.cachedIdea.ui
		if (!repositoryGUID || repositoryGUID === ':repositoryGUID'
			|| (ui && ui.repository.GUID === repositoryGUID)) {
			return ui
		}

		const dbIdea = await this.ideaApi
			.getIdea(hostingPlatform, repositoryGUID)
		this.cachedIdea.db = dbIdea

		this.cachedIdea.ui = this.ideaConverter.dbToUi(dbIdea)

		return this.cachedIdea.ui
	}

	async getAllIdeas(): Promise<IUiIdea[]> {
		return []
	}

	async getIdeasForCategory(
		category: IUiLabel
	): Promise<IUiIdea[]> {
		return []
	}

	async getLeafIdeas(
		stemIdeaRepositoryUuId: string
	): Promise<IUiIdea[]> {
		return []
	}

	async getStemIdea(
		leafIdeaUuId: string
	): Promise<IUiIdea> {
		return null
	}

	async mergeForm(): Promise<void> {
		const form = this.cachedIdea.form
		if (!form) {
			return
		}

		const ui = this.ideaFormManager
			.fromForm(form.value, this.cachedIdea.ui)

		const oldUiIdea = this.cachedIdea.ui

		if (oldUiIdea) {
			this.logicUtils.overlay(oldUiIdea, ui)
		} else {
			this.logicUtils.overlay({
				factors: this.cubeLogic.getReasonDefault()
			}, ui)
		}
		if (oldUiIdea) {
			this.logicUtils.copyProperties(oldUiIdea, ui, [
				// 'actorId',
				// 'actorRecordId',
				'ageSuitability',
				// 'repositoryId',
				// 'repositoryGUID',
			])
		}
		this.cachedIdea.ui = ui
	}

	/*
	 * Publishing a idea makes it publically accessable by adding it
	 * to Vepsa FTS and showing it in search results either by direct
	 * text match or by label match.
	 */
	async publishIdea(
		idea: IUiIdea
	): Promise<void> {
		// TODO: implement publish once saving across devices works
		// (using votecube.com backend)
	}

	/*
	 * For now saving the idea saves it in votecube via ScyllaDb.
	 * it becomes accessible privately (if you know the private votecube UUID of
	 * the user) and supports data syncing (via retrieval of new transaction
	 * log entries)
	 * 
	 * Eventually, on initial save the user will be presented with a choice
	 *  of where they want to save it - privately in IPFS or semi-privately
	 * in the host application.  They can set that choice in Turbase.App settings
	 * (to say that by default save all private repositories to IPFS or to 
	 * host applications).  Note saving of private repos is done via Turbase,
	 * the host application is still free to save this data as it chooses fit
	 * (since there is no way to enforce what network connections the host application
	 * UI makes in a standard browser).
	 * 
	 * The user choice of where to save can be passed in from the application UI.  If
	 * that choice conflicts with the user settings the Turbase.App parent frame
	 * will pop-up a dialog asking the user to confirm their choice.
	 * 
	 * Once the repository is saved the user's choice of where to save becomes
	 * persistent and will take an explict action from the user to change it.  The
	 * application is aware of the choice and should put it into the URL, thus
	 * allowing the user to retrieve the private repository from the correct location
	 * via a saved link.
	 * 
	 * On initial save the user is redirected from the build screen to the
	 * screen with the same entity but the correct URL for where it is stored.
	 * 
	 */
	async saveIdea(
		idea: IUiIdea,
		createNewRepository: boolean
	): Promise<IRepositoryIdentifier> {
		const originalUi = this.cachedIdea.originalUi
		const ui = this.cachedIdea.ui

		if (!this.logicUtils.isDifferent(originalUi, ui)) {
			return
		}

		const dbIdea = this.ideaConverter.uiToDb(ui, this.cachedIdea.db)

		let repositoryIdentifier
		if (createNewRepository) {
			// Age suitability is a property of the repository and can only
			// be set when it is created
			dbIdea.repository = await this.repositoryApi.create(
				ui.ageSuitability ?? 0, ui.name)
			repositoryIdentifier = await this.ideaApi
				.saveNewIdea(dbIdea)
		} else {
			repositoryIdentifier = await this.ideaApi
				.saveExistingIdea(dbIdea)
		}

		this.cachedIdea.db = dbIdea

		this.theCachedIdea = {
			db: dbIdea,
			form: null,
			originalUi: null,
			ui: null,
		}

		return repositoryIdentifier
	}

	async saveCachedIdea(
		user,
		createNewRepository: boolean
	): Promise<IRepositoryIdentifier> {
		return await this.saveIdea(this.cachedIdea.ui, createNewRepository)
	}

}
