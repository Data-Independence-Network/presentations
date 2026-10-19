import { Injected } from '@airport/direction-indicator'
import { AbstractApplicationLoader } from '@airport/terminal-map'
import { APPLICATION } from '../generated/application'

@Injected()
export class ApplicationLoader extends AbstractApplicationLoader {

    constructor() {
        super(APPLICATION as any)
    }

}
