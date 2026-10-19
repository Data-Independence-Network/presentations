import { AirEntity } from '@airport/final-approach'
import {
    Column,
    Entity,
    ManyToOne,
    Table
} from '@airport/tarmaq-entity'
import { Reason } from './Reason'
import { Idea } from '../idea/Idea'
import { ReasonCubeDisplay } from './ReasonCubeDisplay'
import { SituationIdea } from '../idea/SituationIdea'

@Entity()
@Table({ name: 'IDEA_REASONS' })
export class IdeaReason
    extends AirEntity {

    @Column({ name: 'IS_POSITIVE_OUTCOME', nullable: false })
    isPositiveOutcome: boolean = true

    @ManyToOne({ optional: true })
    idea: Idea

    @ManyToOne({ optional: true })
    situationIdea: SituationIdea

    @ManyToOne()
    reason: Reason

    @ManyToOne({ optional: true })
    reasonCubeDisplay: ReasonCubeDisplay

}
