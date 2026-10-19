import { AirEntity } from '@airport/final-approach'
import {
    Column,
    Entity,
    ManyToOne,
    Table
} from '@airport/tarmaq-entity'
import { Idea } from './Idea'
import { SituationIdea } from './SituationIdea'

@Entity()
@Table({ name: 'IDEA_RATINGS' })
export class IdeaRating
    extends AirEntity {

    @Column({ name: 'PRIORITY_RATING' })
    priorityRating: number

    @Column({ name: 'URGENCY_RATING' })
    urgencyRating: number

    @ManyToOne()
    idea: Idea

    @ManyToOne({ optional: true })
    situationIdea: SituationIdea

}
