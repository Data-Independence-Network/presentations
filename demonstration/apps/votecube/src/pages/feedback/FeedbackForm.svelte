<script lang="ts">
	import {
		navigateToPage,
		text,
		user,
		type IUserInfo
	}                  from '@votecube/ui-logic'
	import {
		IDEA_LIST
	}                  from '@votecube/vc-logic'
	import {
		onDestroy,
		onMount
	}                  from 'svelte'
	import {get}       from 'svelte/store'
	import type {IComponent, IFieldGroup, IMatchingField, IOptionsField} from '@votecube/forms'
	import SaveButton   from '@votecube/ui-controls/src/button/SaveButton.svelte'
	import AutoComplete from '@votecube/ui-controls/src/field/AutoComplete.svelte'
	import TextArea     from '@votecube/ui-controls/src/field/TextArea.svelte'
	import {loadForms} from '../../libs/forms'

	interface IFeedbackDb {
		collection(name: string): {
			doc(): { set(value: object): Promise<void> }
		}
	}

	let delta      = 0
	let error      = $state('')
	let isOriginal = true
	let isValid    = $state(false)
	interface IFeedbackForm extends IFieldGroup {
		fields: {
			category: IOptionsField
			comment: IMatchingField
		}
	}

	let form: IFeedbackForm | undefined = $state.raw()

	let formHandle = {
		setDelta(newDelta) {
			delta = newDelta
		},
		setIsValid(newIsValid) {
			isValid = newIsValid
		},
		setIsOriginal(newIsOriginal) {
			isOriginal = newIsOriginal
		}
	}

	let submitHighlight = $derived(!isValid ? 'b00' : '0b0')

	onMount(async () => {
		const [
			      formFactory,
			      // locations,
			      // _,
		      ] = await Promise.all([
			loadForms(),
			// loadLocations(),
			// loadLocText(page.store, 'en-us'),
		])

		const theForm = formFactory.group('Feedback', {
			category: formFactory.options([
				formFactory.validators.required()
			], [{
				id: 1,
				text: 'Feature Request'
			}, {
				id: 2,
				text: 'Bug Report'
			}, {
				id: 3,
				text: 'Suggestion'
			}, {
				id: 4,
				text: 'Question'
			}, {
				id: 5,
				text: 'Other'
			}]),
			comment: formFactory.field([
				formFactory.validators.minLength(3),
				formFactory.validators.required()
			], {maxLength: 2500})
		}, [formFactory.validators.required()], get(text).UI)

		theForm.addComponent(formHandle as IComponent)
		theForm.validate()

		form = theForm as IFeedbackForm
	})

	onDestroy(() => form && form.clearComponents())

	function submit() {
		form.touch()

		if (!form.valid) {
			return
		}
		saveFeedback(form.value).then(
			success => {
				if (success) {
					navigateToPage(IDEA_LIST)
				} else {
					error = 'Error saving feedback, please check your network connection'
				}
			})
	}

	async function saveFeedback(
		formValue
	) {
		const db          = (window as unknown as { db: IFeedbackDb }).db
		const feedbackRef = db.collection('feedback').doc()

		let userId

		const userInfo = get(user)

		if (userInfo) {
			userId = (userInfo as IUserInfo & { id?: string }).id
		} else {
			userId = null
		}
		try {
			await feedbackRef.set({
				...formValue,
				userId
			})
			return true
		} catch (error) {
			return false
		}
	}

</script>

<style>
	.error {
		color: red;
		text-align: center;
		width: 100%;
	}
</style>

{#if form}
<form>
	<legend>Submit Feedback</legend>
	<AutoComplete
			field={form.fields.category}
	></AutoComplete>
	<TextArea
			field={form.fields.comment}
	></TextArea>
	<nav class="pure-controls">
		{#if error}
		<div
				class="error"
		>
			{error}
		</div>
		<br>
		<br>
		{/if}
		<SaveButton
				classes="submitButton"
				highlightColor={submitHighlight}
				onclick={submit}
		></SaveButton>
	</nav>
</form>
{/if}
