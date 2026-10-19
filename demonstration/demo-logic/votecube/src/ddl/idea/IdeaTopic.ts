import { AirEntity } from "@airport/final-approach";
import { Entity, ManyToOne, Table } from "@airport/tarmaq-entity";
import { Topic } from "../topic/Topic";
import { Idea } from "./Idea";

@Entity()
@Table({ name: 'IDEA_TOPICS' })
export class IdeaTopic
    extends AirEntity {

    @ManyToOne()
    idea: Idea

    @ManyToOne()
    topic: Topic

}
