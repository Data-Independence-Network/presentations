import { Y } from "@airport/tarmaq-query";
import { Injected } from "@airport/direction-indicator";
import { Idea, IdeaReason } from "../../ddl/ddl";
import { BaseIdeaReasonDao } from "../../generated/baseDaos";
import { QIdea, QIdeaReason } from "../../generated/qInterfaces";
import { Q_localhost_colon_8000____at_votecube_slash_votecube as Q } from "../../generated/qApplication";

@Injected()
export class IdeaReasonDao
    extends BaseIdeaReasonDao {

    async findAllForIdea(
        idea: Idea
    ): Promise<IdeaReason[]> {
        let ir: QIdeaReason,
            i: QIdea
        return await this._find({
            SELECT: {
                '*': Y,
                reason: {
                    '*': Y,
                    factor: {},
                    position: {}
                }
            },
            FROM: [
                ir = Q.IdeaReason,
                i = ir.idea.LEFT_JOIN()
            ],
            WHERE: i.equals(idea)
        })
    }

}
