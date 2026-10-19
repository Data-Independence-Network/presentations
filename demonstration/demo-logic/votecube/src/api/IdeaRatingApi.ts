import { Api } from "@airport/air-traffic-control";
import { Inject, Injected } from "@airport/direction-indicator";
import { IIdeaDao } from "../dao/IdeaDao";
import { IIdeaRatingDao } from "../dao/IdeaRatingDao";
import { ISituationIdeaDao } from "../dao/SituationIdeaDao";
import { IdeaRating, ITotalDelta } from "../ddl/ddl";

@Injected()
export class IdeaRatingApi {

    @Inject()
    ideaDao: IIdeaDao

    @Inject()
    ideaRatingDao: IIdeaRatingDao

    @Inject()
    situationIdeaDao: ISituationIdeaDao

    @Api()
    async setIdeaRating(
        inIdeaRating: IdeaRating,
    ): Promise<void> {
        await this.doSetIdeaRating(inIdeaRating, false, false)
    }

    async doSetIdeaRating(
        ideaRating: IdeaRating,
        isNewIdea: boolean,
        isNewSituationIdea: boolean
    ): Promise<void> {
        const {
            updatedIdeaRating,
            delta
        } = await this.getUrgencyRatingDeltas(ideaRating)
        await this.ideaRatingDao.save(updatedIdeaRating)
        await this.updateUrgencyTotals(updatedIdeaRating, delta)
    }

    private async getUrgencyRatingDeltas(
        ideaRating: IdeaRating
    ): Promise<{
        updatedIdeaRating: IdeaRating,
        delta: ITotalDelta
    }> {
        let existingIdeaRating: IdeaRating
        if (ideaRating.situationIdea) {
            existingIdeaRating = await this.ideaRatingDao
                .findForSituationIdeaAndUser(
                    ideaRating.situationIdea,
                    ideaRating.actor.userAccount
                )
        } else {
            existingIdeaRating = await this.ideaRatingDao
                .findForIdeaOnlyAndUser(
                    ideaRating.idea,
                    ideaRating.actor.userAccount
                )
        }
        if (existingIdeaRating) {
            existingIdeaRating.idea = ideaRating.idea
            existingIdeaRating.situationIdea = ideaRating.situationIdea
            return {
                updatedIdeaRating: existingIdeaRating,
                delta: {
                    totalDelta: ideaRating.urgencyRating - existingIdeaRating.urgencyRating,
                    numberDelta: 0
                }
            }
        }
        return {
            updatedIdeaRating: ideaRating,
            delta: {
                totalDelta: ideaRating.urgencyRating,
                numberDelta: 1
            }
        }
    }

    private async updateUrgencyTotals(
        ideaRating: IdeaRating,
        delta: ITotalDelta
    ): Promise<void> {
        await this.ideaDao.updateUrgencyTotal(delta, ideaRating.idea)

        if (ideaRating.situationIdea) {
            await this.situationIdeaDao.updateUrgencyTotal(delta, ideaRating.situationIdea)
        }
    }

}
