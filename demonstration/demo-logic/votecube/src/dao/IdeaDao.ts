import { Injected } from '@airport/direction-indicator';
import {
    QRepository
} from "@airport/holding-pattern";
import {
    AND,
    PLUS,
    Y
} from '@airport/tarmaq-query'
import {
    BaseIdeaDao,
    IBaseIdeaDao
} from "../generated/baseDaos";
import {
    Q_localhost_colon_8000____at_votecube_slash_votecube as Q
} from "../generated/qApplication";
import {
    QIdea,
    QIdeaReason,
    QSituationIdea,
    QReason,
    QIdeaLabel
} from "../generated/qInterfaces";
import { Idea, ITotalDelta } from '../ddl/ddl';

export interface IIdeaDao
    extends IBaseIdeaDao {

    findByRepositoryGUID(
        repositorySource: string,
        ideaReposioryGUID: string
    ): Promise<Idea>

    updateShareTotal(
        delta: ITotalDelta,
        idea: Idea
    ): Promise<void>

    updateUrgencyTotal(
        delta: ITotalDelta,
        idea: Idea
    ): Promise<void>

}

@Injected()
export class IdeaDao
    extends BaseIdeaDao
    implements IIdeaDao {

    async findByRepositoryGUID(
        repositorySource: string,
        ideaReposioryGUID: string
    ): Promise<Idea> {
        let i: QIdea
        let r: QRepository
        let sl: QIdeaLabel
        let is: QSituationIdea
        let rs: QReason
        let ir: QIdeaReason
        const matchingRepositories = await this.db.find.tree({
            SELECT: {
                '*': Y,
                repository: {},
                ideaLabels: {
                    '*': Y,
                    label: {}
                },
                situationIdeas: {
                    '*': Y,
                    ideaReasons: {
                        reason: {
                            '*': Y,
                            factor: {},
                            position: {},
                        }
                    }
                }
            },
            FROM: [
                i = Q.Idea,
                r = i.repository.INNER_JOIN(),
                sl = i.ideaLabels.LEFT_JOIN(),
                sl.label.LEFT_JOIN(),
                is = i.situationIdeas.LEFT_JOIN(),
                ir = is.ideaReasons.LEFT_JOIN(),
                rs = ir.reason.LEFT_JOIN(),
                rs.factor.LEFT_JOIN(),
                rs.position.LEFT_JOIN()
            ],
            WHERE: AND(
                r.source.equals(repositorySource),
                r.GUID.equals(ideaReposioryGUID)
            )
        }, {
            repository: {
                source: repositorySource,
                GUID: ideaReposioryGUID
            }
        })

        if (matchingRepositories.length) {
            return matchingRepositories[0]
        }

        return null
    }

    async updateShareTotal(
        delta: ITotalDelta,
        idea: Idea
    ): Promise<void> {
        const i = Q.Idea
        await this.db.updateWhere({
            UPDATE: i,
            SET: {
                agreementShareTotal: PLUS(i.agreementShareTotal, delta.totalDelta),
                numberOfAgreements: PLUS(i.numberOfAgreements, delta.numberDelta)
            },
            WHERE: i.equals(idea)
        })
    }

    async updateUrgencyTotal(
        delta: ITotalDelta,
        idea: Idea
    ): Promise<void> {
        const i = Q.Idea
        await this.db.updateWhere({
            UPDATE: i,
            SET: {
                urgencyTotal: PLUS(i.urgencyTotal, delta.totalDelta),
                numberOfUrgencyRatings: PLUS(i.numberOfUrgencyRatings,
                    delta.numberDelta)
            },
            WHERE: i.equals(idea)
        })
    }

}
