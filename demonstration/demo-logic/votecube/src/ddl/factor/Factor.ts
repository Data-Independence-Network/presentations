import { AirEntity } from '@airport/final-approach'
import {
	Column,
	Entity,
	OneToMany,
	Table
} from '@airport/tarmaq-entity'
import { Reason } from '../reason/Reason'

export type Factor_Name = string;

@Entity()
@Table({ name: 'FACTORS' })
export class Factor
	extends AirEntity {

	@Column({ name: 'NAME', nullable: false })
	name!: Factor_Name

	@OneToMany({ mappedBy: 'factor' })
	reasons!: Reason[]

}
