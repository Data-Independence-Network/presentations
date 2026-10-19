import {navigateToPage} from '@votecube/ui-logic'

export const DEFINE_IDEA_TOP = 'DEFINE_IDEA_TOP'
export const CREATE_FACTOR   = 'CREATE_FACTOR'


let forms = {}

export function setForm(
	name,
	newCurrentForm
) {
	forms[name] = newCurrentForm
}

export function getForm(
	name
) {
	return forms[name]
}

export function ensureChildForm(
	parentFormName,
	childFormName,
	page,
	navigateToRouteOnNotFound,
	navigateParamsOnNotFound
) {
	const parentForm = getForm(parentFormName)
	if (!parentForm) {
		navigateToPage(navigateToRouteOnNotFound, navigateParamsOnNotFound)
		return null
	}

	let form = parentForm
	// TODO: see if nested child form reagreement is needed
	// childFormName.split('.').forEach(childNameFragment => {
	form = form.fields[childFormName]
	// })

	ensureForm(form, page)

	return form
}

export function ensureTopForm(
	topFormName,
	formHandle,
	navigateToRouteOnNotFound,
	navigateParamsOnNotFound?
) {
	const topForm = getForm(topFormName)
	if (!topForm) {
		navigateToPage(navigateToRouteOnNotFound, navigateParamsOnNotFound)
		return null
	}
	ensureForm(topForm, formHandle)

	return topForm
}

export function ensureForm(
	form,
	formHandle
) {
	form.addComponent(formHandle)
	formHandle.setIsOriginal(form.isOriginal())
	formHandle.setIsValid(form.valid)
}

export function uncacheForm(
	formName
) {
	delete forms[formName]
}

export function clearForm(
	form
) {
	if (form) {
		form.clearComponents()
	}
}

export function navigateOnValid(
	form,
	navigateToRouteOnValid,
	paramMap
) {
	form.touch()

	if (!form.valid) {
		return
	}

	navigateToPage(navigateToRouteOnValid, paramMap)
}

export var OPTIONS = {
	handleKeydown: (
		page,
		multi,
		event
	) => {
		if (!page.showOptions) {
			return
		}
		let showOptions = true
		switch (event.key) {
			case 'ArrowDown':
				if (page.activeOptionIndex + 1 < page.options.length) {
					page.activeOptionIndex = page.activeOptionIndex + 1
				}
				break
			case 'ArrowUp':
				if (page.activeOptionIndex) {
					page.activeOptionIndex = page.activeOptionIndex - 1
				}
				break
			case 'Escape':
				page.activeOptionIndex = 0
				showOptions       = false
				break
			case 'Enter':
				const selectedOption = page.options[page.activeOptionIndex]
				page.activeOptionIndex    = 0
				page.field.select(selectedOption)
				if (multi) {
					page.filter = ''
				} else {
					page.filter = selectedOption.text
				}
				showOptions = false
				event.preventDefault()
				break
		}
		if (!showOptions) {
			page.hideOptions()
		}
	},
	showFiltered: (
		page,
		element,
		event
		// focus
	) => {
		if (!page.showOptions) {
			if (page.field.filteredOptions.length) {
				// if(focus) {
				page.field.focus()
				// }
				page.dropdownTopPx = element.offsetHeight + 6
				page.showOptions = true
				event.stopPropagation()
			}
		}
		// if(focus) {
		page.filterInput.focus()
		// }
	}
}
