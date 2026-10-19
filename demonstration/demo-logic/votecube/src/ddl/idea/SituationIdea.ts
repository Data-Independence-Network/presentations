import { AirEntity } from "@airport/final-approach";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    Table,
    Transient
} from "@airport/tarmaq-entity";
import { Situation } from "../situation/Situation";
import { Agreement } from "../agreement/Agreement";
import { Idea } from "./Idea";
import { IdeaRating } from "./IdeaRating";
import { IdeaReason } from "../reason/IdeaReason";

@Entity()
@Table({ name: 'SITUATION_IDEAS' })
export class SituationIdea
    extends AirEntity {

    @Column({ name: 'AGREEMENT_SHARE_TOTAL' })
    agreementShareTotal: number

    @Column({ name: 'NUMBER_OF_AGREEMENTS' })
    numberOfAgreements: number

    @Column({ name: 'PROIRITY_TOTAL' })
    priorityTotal: number

    @Column({ name: 'NUMBER_OF_PRIORITY_RATINGS' })
    numberOfPriorityRatings: number

    @Column({ name: 'URGENCY_TOTAL' })
    urgencyTotal: number

    @Column({ name: 'NUMBER_OF_URGENCY_RATINGS' })
    numberOfUrgencyRatings: number

    @Column({ name: 'NUMBER_OF_REASONS' })
    numberOfReasons: number

    @ManyToOne()
    idea: Idea

    @ManyToOne()
    situation: Situation

    @OneToMany({ mappedBy: 'situationIdea' })
    ideaRatings: IdeaRating[] = []

    @OneToMany({ mappedBy: 'situationIdea' })
    agreements: Agreement[] = []

    @OneToMany({ mappedBy: 'situationIdea' })
    ideaReasons: IdeaReason[] = []

    @Transient()
    userIdeaRating?: IdeaRating

    @Transient()
    userAgreement?: Agreement

    @Transient()
    userIdeaReasons: IdeaReason[] = []

}
