import { IUiIdea } from '@votecube/model'
import {
    writable
} from 'svelte/store'

export interface IIdeaActions {
    ageSuitabilitySave?: boolean
    checkBuild?: boolean
    confirmAgreement?: boolean
    savingIdea?: boolean
    ideaAlter?: boolean
    showOutcomes?: boolean
}

export const ideaActions = writable<IIdeaActions>({})

export const idea = writable<IUiIdea>(null)
