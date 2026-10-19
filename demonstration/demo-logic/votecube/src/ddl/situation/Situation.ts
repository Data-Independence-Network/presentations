import { AirEntity } from "@airport/final-approach";
import { Column, DbNumber, Entity, ManyToOne, OneToMany, Table, Transient } from "@airport/tarmaq-entity";
import { SituationRating } from "./SituationRating";
import { Topic } from "../topic/Topic";

export type Situation_Type = 1 | 2;

@Entity()
@Table({ name: 'SITUATIONS' })
export class Situation
    extends AirEntity {

    @Column({ name: 'TYPE', nullable: false })
    @DbNumber()
    type!: Situation_Type

    @Column({ name: 'TEXT', nullable: false })
    text!: string

    @Column({ name: 'URGENCY_TOTAL' })
    urgencyTotal?: number = 0

    @Column({ name: 'NUMBER_OF_URGENCY_RATINGS' })
    numberOfUrgencyRatings?: number = 0

    @Column({ name: 'IMPORTANCE_TOTAL' })
    importanceTotal?: number = 0

    @Column({ name: 'NUMBER_OF_IMPORTANCE_RATINGS' })
    numberOfImportanceRatings?: number = 0

    @ManyToOne()
    topic!: Topic

    @OneToMany({ mappedBy: 'situation' })
    ratings?: SituationRating[]

    @Transient()
    userRating?: SituationRating
}
