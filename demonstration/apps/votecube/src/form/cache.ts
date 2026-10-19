import {
	APP_CONTAINER,
	IdeaManager
}                 from '@votecube/vc-logic'
import * as forms from '../form/forms'

export async function saveIdeaForm(
	interFormNavigation
) {
	if (interFormNavigation) {
		return
	}

	const ideaManager = await APP_CONTAINER.get(IdeaManager)
	await ideaManager.mergeForm()

	forms.uncacheForm(forms.DEFINE_IDEA_TOP)
	forms.uncacheForm(forms.CREATE_FACTOR)
}
