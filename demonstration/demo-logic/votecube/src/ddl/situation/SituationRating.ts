import { AirEntity } from "@airport/final-approach";
import { Column, DbNumber, Entity, ManyToOne, Table } from "@airport/tarmaq-entity";
import { Situation } from "./Situation";

export type SituationRating_Importance = 1 | 2 | 3 | 4 | 5;

export type SituationRating_Urgency = 1 | 2 | 3 | 4 | 5;

@Entity()
@Table({ name: 'SITUATION_RATINGS' })
export class SituationRating
    extends AirEntity {

    @Column({ name: 'IMPORTANCE_RATING' })
    @DbNumber()
    importanceRating!: SituationRating_Importance

    @Column({ name: 'URGENCY_RATING' })
    @DbNumber()
    urgencyRating!: SituationRating_Urgency

    @ManyToOne()
    situation!: Situation
}
