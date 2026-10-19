import { AirEntity } from "@airport/final-approach";
import { Entity, ManyToOne, Table } from "@airport/tarmaq-entity";

export type Topic_Name = string;
export type Topic_Description = string;
export type Topic_ImagePath = string;

@Entity()
@Table({ name: 'TOPICS' })
export class Topic
    extends AirEntity {

    name!: Topic_Name

    description!: Topic_Description

    imagePath!: Topic_ImagePath

    @ManyToOne()
    parentTopic!: Topic;

}
