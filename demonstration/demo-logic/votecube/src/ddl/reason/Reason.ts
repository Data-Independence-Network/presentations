import { AirEntity } from '@airport/final-approach'
import {
	Entity,
	ManyToOne,
	OneToMany,
	Table,
	Transient
} from '@airport/tarmaq-entity'
import { IdeaReason } from './IdeaReason'
import { Factor } from '../factor/Factor'
import { Position } from '../factor/Position'

@Entity()
@Table({ name: 'REASONS' })
export class Reason
	extends AirEntity {

	@ManyToOne()
	factor!: Factor

	@ManyToOne()
	position!: Position

	@OneToMany({ mappedBy: 'reason' })
	ideaReasons: IdeaReason[] = []

	@Transient()
	enabled: boolean = true

}
