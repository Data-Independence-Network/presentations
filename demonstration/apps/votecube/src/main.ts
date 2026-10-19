import { LocalAPIClient } from '@airport/autopilot'
import { IOC } from '@airport/direction-indicator'
import { mount } from 'svelte'

import App from './App.svelte'
import './styles/global.css'
import './styles/votecube.css'

const app = mount(App, {
	target: document.body
})

IOC.getSync(LocalAPIClient)

export default app
