import { AirEntity } from '@airport/final-approach'
import {
	Column,
	DbString,
	Entity,
	OneToMany,
	Table
} from '@airport/tarmaq-entity'
import { Reason } from '../reason/Reason'

export type Position_Action =
	'allow'
	| 'begin'
	| 'disable'
	| 'discourage'
	| 'enable'
	| 'encourage'
	| 'end'
	| 'facilitate'
	| 'help'
	| 'let'
	| 'make'
	| 'prohibit'
	| 'promote'
	| 'start'
	| 'stop'

export type Position_Object =
	'all'
	| 'everyone'
	| 'everything'
	| 'her'
	| 'him'
	| 'it'
	| 'me'
	| 'no one'
	| 'none'
	| 'nothing'
	| 'someone'
	| 'something'
	| 'that'
	| 'this'
	| 'them'
	| 'us'
	| "you all"
	| 'you'

export type Position_Subject =
	'All'
	| 'Everyone'
	| 'Everything'
	| 'He'
	| 'I'
	| 'It'
	| 'No one'
	| 'Nothing'
	| 'She'
	| 'Someone'
	| 'Something'
	| 'That'
	| 'This'
	| 'They'
	| 'We'
	| "You all"
	| 'You'

export type Position_Text = string

/**
 * This is the generic position records (not related to any Idea).
 */
@Entity()
@Table({ name: 'POSITIONS' })
export class Position
	extends AirEntity {

	@Column({ name: 'ACTION', length: 15, nullable: true })
	@DbString()
	action!: Position_Action

	@Column({ name: 'OBJECT', length: 12, nullable: true })
	@DbString()
	object!: Position_Object

	@Column({ name: 'SUBJECT', length: 12, nullable: true })
	@DbString()
	subject!: Position_Subject

	@Column({ name: 'TEXT', length: 120, nullable: false })
	text!: Position_Text

	@OneToMany({ mappedBy: 'position' })
	reasons: Reason[] = []

}
