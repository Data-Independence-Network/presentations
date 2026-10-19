import { AirEntity } from '@airport/final-approach'
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	Table,
	Transient
} from '@airport/tarmaq-entity'
import { IdeaLabel } from './IdeaLabel'
import { SituationIdea } from './SituationIdea'
import { IdeaTopic } from './IdeaTopic'
import { IdeaRating } from './IdeaRating'
import { Agreement } from '../agreement/Agreement'
import { IdeaReason } from '../reason/IdeaReason'

@Entity()
@Table({ name: 'IDEAS' })
export class Idea
	extends AirEntity {

	@Column({ name: 'NAME', nullable: false })
	name: string

	@Column({ name: 'AGREEMENT_SHARE_TOTAL' })
	agreementShareTotal: number

	@Column({ name: 'NUMBER_OF_AGREEMENTS' })
	numberOfAgreements: number

	@Column({ name: 'URGENCY_TOTAL' })
	urgencyTotal: number

	@Column({ name: 'NUMBER_OF_URGENCY_RATINGS' })
	numberOfUrgencyRatings: number

	@Column({ name: 'NUMBER_OF_REASONS' })
	numberOfReasons: number

	@ManyToOne({ optional: true })
	parent: Idea

	@OneToMany({ mappedBy: 'parent' })
	children: Idea[] = []

	@OneToMany({ mappedBy: 'idea' })
	ideaRatings: IdeaRating

	@OneToMany({ mappedBy: 'idea' })
	agreements: Agreement[] = []

	@OneToMany({ mappedBy: 'idea' })
	ideaReasons: IdeaReason[] = []

	@OneToMany({ mappedBy: 'idea' })
	ideaLabels: IdeaLabel[] = []

	@OneToMany({ mappedBy: 'idea' })
	situationIdeas: SituationIdea[] = []

	@OneToMany({ mappedBy: 'idea' })
	ideaTopics: IdeaTopic[] = []

	@Transient()
	userIdeaRating?: IdeaRating

	@Transient()
	userAgreement?: Agreement

	@Transient()
	userIdeaReasons?: IdeaReason[] = []

}
