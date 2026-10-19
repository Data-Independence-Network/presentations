import { app } from '@airport/direction-indicator'
import { FormFactory } from './FormFactory'

export const forms = app({
    domain: {
        name: 'votecube.com'
    },
    name: 'forms'
})

forms.register(FormFactory)
