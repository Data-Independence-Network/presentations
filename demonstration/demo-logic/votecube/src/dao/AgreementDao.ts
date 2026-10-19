import { AND, Y } from "@airport/tarmaq-query";
import { Injected } from "@airport/direction-indicator";
import { QActor } from "@airport/holding-pattern";
import { QUserAccount, UserAccount } from "@airport/travel-document-checkpoint";
import { Agreement, Idea, SituationIdea } from "../ddl/ddl";
import { BaseAgreementDao } from "../generated/baseDaos";
import { Q_localhost_colon_8000____at_votecube_slash_votecube as Q } from "../generated/qApplication";
import { QAgreement, QIdea, QSituationIdea } from "../generated/qInterfaces";

@Injected()
export class AgreementDao
    extends BaseAgreementDao {

    async findForSituationIdeaAndUser(
        situationIdea: SituationIdea | string,
        user: UserAccount | string
    ): Promise<Agreement> {
        let ag: QAgreement,
            a: QActor,
            u: QUserAccount,
            si: QSituationIdea;
        return await this._findUnique({
            SELECT: {
                '*': Y,
                agreementIdeaReasons: {
                    '*': Y,
                    ideaReason: {}
                },
            },
            FROM: [
                ag = Q.Agreement,
                a = ag.actor.LEFT_JOIN(),
                u = a.userAccount.LEFT_JOIN(),
                si = ag.situationIdea.LEFT_JOIN()
            ],
            WHERE: AND(
                si.equals(situationIdea),
                u.equals(user)
            )
        })
    }

    async findForIdeaOnlyAndUser(
        idea: Idea | string,
        user: UserAccount | string
    ): Promise<Agreement> {
        let ag: QAgreement,
            a: QActor,
            u: QUserAccount,
            i: QIdea
        return await this._findUnique({
            SELECT: {
                '*': Y,
                agreementIdeaReasons: {
                    '*': Y,
                    ideaReason: {}
                },
            },
            FROM: [
                ag = Q.Agreement,
                a = ag.actor.LEFT_JOIN(),
                u = a.userAccount.LEFT_JOIN(),
                i = ag.idea.LEFT_JOIN()
            ],
            WHERE: AND(
                i.equals(idea),
                ag.situationIdea.IS_NULL(),
                u.equals(user)
            )
        })
    }

}
