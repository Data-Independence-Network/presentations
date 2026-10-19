import { Injected } from '@airport/direction-indicator';
import { QUserAccount, UserAccount } from '@airport/travel-document-checkpoint';
import {
    BaseIdeaRatingDao,
    IBaseIdeaRatingDao
} from "../generated/baseDaos";
import {
    Q_localhost_colon_8000____at_votecube_slash_votecube as Q
} from "../generated/qApplication";
import {
    QIdea,
    QIdeaRating,
    QSituationIdea,
} from "../generated/qInterfaces";
import { Idea, IdeaRating, SituationIdea } from '../ddl/ddl';
import { QActor } from '@airport/holding-pattern';
import { AND, Y } from '@airport/tarmaq-query';

export interface IIdeaRatingDao
    extends IBaseIdeaRatingDao {

    findForSituationIdeaAndUser(
        situationIdea: SituationIdea | string,
        user: UserAccount | string
    ): Promise<IdeaRating>

    findForIdeaOnlyAndUser(
        idea: Idea | string,
        user: UserAccount | string
    ): Promise<IdeaRating>

}

@Injected()
export class IdeaRatingDao
    extends BaseIdeaRatingDao
    implements IIdeaRatingDao {

    async findForSituationIdeaAndUser(
        situationIdea: SituationIdea | string,
        user: UserAccount | string
    ): Promise<IdeaRating> {
        let ir: QIdeaRating,
            a: QActor,
            u: QUserAccount,
            si: QSituationIdea
        return await this._findUnique({
            SELECT: {
                '*': Y
            },
            FROM: [
                ir = Q.IdeaRating,
                a = ir.actor.LEFT_JOIN(),
                u = a.userAccount.LEFT_JOIN(),
                si = ir.situationIdea.LEFT_JOIN()
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
    ): Promise<IdeaRating> {
        let ir: QIdeaRating,
            a: QActor,
            u: QUserAccount,
            i: QIdea
        return await this._findUnique({
            SELECT: {
                '*': Y
            },
            FROM: [
                ir = Q.IdeaRating,
                a = ir.actor.LEFT_JOIN(),
                u = a.userAccount.LEFT_JOIN(),
                i = ir.idea.LEFT_JOIN()
            ],
            WHERE: AND(
                i.equals(idea),
                ir.situationIdea.IS_NULL(),
                u.equals(user)
            )
        })
    }

}
