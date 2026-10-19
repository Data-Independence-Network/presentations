import { AirEntity } from "@airport/final-approach";
import {
    Entity,
    ManyToOne,
    Table
} from "@airport/tarmaq-entity";
import { IdeaReason } from "../reason/IdeaReason";
import { Agreement } from "./Agreement";


export type AgreementIdeaReason_Share = number; // i8 : 0 - 100
@Entity()
@Table({ name: 'AGREEMENT_IDEA_REASONS' })
export class AgreementIdeaReason
    extends AirEntity {

    share!: AgreementIdeaReason_Share

    @ManyToOne()
    agreement!: Agreement

    @ManyToOne()
    ideaReason!: IdeaReason

}
