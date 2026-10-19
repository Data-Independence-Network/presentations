import { AirEntity } from "@airport/final-approach";
import { Entity, ManyToOne, Table } from "@airport/tarmaq-entity";
import { Topic } from "./Topic";
import { Situation } from "../situation/Situation";

@Entity()
@Table({ name: 'SITUATION_TOPICS' })
export class SituationTopic
    extends AirEntity {

    @ManyToOne()
    situation!: Situation;

    @ManyToOne()
    topic!: Topic;

}
