import { Api } from "@airport/air-traffic-control";
import { Inject, Injected } from "@airport/direction-indicator";
import { RequestManager } from "@airport/web-tower";
import { ISituationIdeaDao } from "../dao/dao";
import { SituationIdea } from "../ddl/ddl";
import { IdeaApi } from "./IdeaApi";

@Injected()
export class SituationIdeaApi {

    @Inject()
    ideaApi: IdeaApi

    @Inject()
    requestManager: RequestManager

    @Inject()
    situationIdeaDao: ISituationIdeaDao

    @Api()
    async add(
        situationIdea: SituationIdea
    ): Promise<void> {
        await this.situationIdeaDao.save(situationIdea)
    }

}
