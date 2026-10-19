import { PLUS } from "@airport/tarmaq-query";
import { Injected } from "@airport/direction-indicator";
import { ITotalDelta, SituationIdea } from "../ddl/ddl";
import { BaseSituationIdeaDao, IBaseSituationIdeaDao } from "../generated/baseDaos";
import { Q_localhost_colon_8000____at_votecube_slash_votecube as Q } from "../generated/qApplication";

export interface ISituationIdeaDao
    extends IBaseSituationIdeaDao {

    updateShareTotal(
        delta: ITotalDelta,
        situationIdea: SituationIdea
    ): Promise<void>

    updateUrgencyTotal(
        delta: ITotalDelta,
        situationIdea: SituationIdea
    ): Promise<void>

}

@Injected()
export class SituationIdeaDao
    extends BaseSituationIdeaDao
    implements ISituationIdeaDao {

    async updateShareTotal(
        delta: ITotalDelta,
        situationIdea: SituationIdea
    ): Promise<void> {
        const si = Q.SituationIdea
        await this.db.updateWhere({
            UPDATE: si,
            SET: {
                agreementShareTotal: PLUS(si.agreementShareTotal, delta.totalDelta),
                numberOfAgreements: PLUS(si.numberOfAgreements, delta.numberDelta)
            },
            WHERE: si.equals(situationIdea)
        })
    }

    async updateUrgencyTotal(
        delta: ITotalDelta,
        situationIdea: SituationIdea
    ): Promise<void> {
        const si = Q.SituationIdea
        await this.db.updateWhere({
            UPDATE: si,
            SET: {
                urgencyTotal: PLUS(si.urgencyTotal, delta.totalDelta),
                numberOfUrgencyRatings: PLUS(si.numberOfUrgencyRatings,
                    delta.numberDelta)
            },
            WHERE: si.equals(situationIdea)
        })
    }
}
