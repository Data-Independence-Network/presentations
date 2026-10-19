import { Api } from "@airport/air-traffic-control";
import { Inject, Injected } from "@airport/direction-indicator";
import { IRepositoryIdParts } from "@airport/ground-control";
import { RequestManager } from "@airport/web-tower";
import { IdeaDao } from "../dao/dao"
import { Idea, Label } from "../ddl/ddl";

export interface IIdeaApi {

    getIdeasForLabels(
        labels: Label[]
    ): Promise<Idea[]>

    getLeafIdeas(
        idea: Idea
    ): Promise<Idea[]>

    getStemIdea(
        idea: Idea
    ): Promise<Idea>

    getIdea(
        repositorySource: string,
        ideaRepositoryUuId: string
    ): Promise<Idea>

    saveNewIdea(
        idea: Idea
    ): Promise<IRepositoryIdParts>
    
    saveExistingIdea(
        idea: Idea
    ): Promise<IRepositoryIdParts>

}

@Injected()
export class IdeaApi
    implements IIdeaApi {

    @Inject()
    ideaDao: IdeaDao

    @Inject()
    requestManager: RequestManager

    @Api()
    async getIdeasForLabels(
        labels: Label[]
    ): Promise<Idea[]> {
        return []
    }

    @Api()
    async getLeafIdeas(
        idea: Idea
    ): Promise<Idea[]> {
        return []
    }

    @Api()
    async getStemIdea(
        idea: Idea
    ): Promise<Idea> {
        return null
    }

    @Api()
    async getIdea(
        repositorySource: string,
        ideaRepositoryUuId: string
    ): Promise<Idea> {
        return await this.ideaDao.findByRepositoryGUID(repositorySource, ideaRepositoryUuId)
    }

    @Api()
    async saveNewIdea(
        idea: Idea
    ): Promise<IRepositoryIdParts> {
        idea.actor = this.requestManager.actor
        const saveResult = await this.ideaDao.save(idea)

        let userAgreement = idea.userAgreement
        if (userAgreement) {
            userAgreement.situationIdea = null
            userAgreement.actor = this.requestManager.actor
        }

        if (idea.userIdeaRating) {
            idea.userIdeaRating.actor = this.requestManager.actor
        }

        return saveResult.repositoryIdParts
    }

    @Api()
    async saveExistingIdea(
        idea: Idea
    ): Promise<IRepositoryIdParts> {
        const saveResult = await this.ideaDao.save(idea)

        return saveResult.repositoryIdParts
    }

}
