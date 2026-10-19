<script lang="ts">
	import {
		pageTitle,
		routeParams
	}                      from '@votecube/ui-logic'
	import type { IFieldBase, IFieldGroup, IMatchingField } from '@votecube/forms'
	import {
		IDEA_FORM
	}                      from '@votecube/vc-logic'
	import {
		onDestroy,
		onMount
	}                      from 'svelte'
	import CharacterButton from '@votecube/ui-controls/src/button/CharacterButton.svelte'
	import SaveButton      from '@votecube/ui-controls/src/button/SaveButton.svelte'
	import ColorPicker     from '@votecube/ui-components/src/ColorPicker.svelte'
	import Text            from '@votecube/ui-controls/src/field/Text.svelte'
	import TextArea        from '@votecube/ui-controls/src/field/TextArea.svelte'
	import {saveIdeaForm}  from '../../../form/cache'
	import {
		CREATE_FACTOR,
		ensureTopForm,
		navigateOnValid
	}                      from '../../../form/forms'

	let delta      = 0
	interface IFactorForm extends IFieldGroup {
		fields: {
			color: IFieldBase
			name: IMatchingField
			positions: IFieldGroup & {
				fields: { A: IMatchingField; B: IMatchingField }
			}
		}
	}

	let form: IFactorForm | undefined = $state.raw()
	let interFormNavigation
	let isOriginal = true
	let isValid    = $state(false)

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

	let color = $derived(form
		? form.fields.color
		: null)
	let submitHighlight = $derived(isValid
		? '0b0'
		: 'b00')

	onMount(async () => {
		form = ensureTopForm(
			CREATE_FACTOR,
			formHandle, IDEA_FORM)
		pageTitle.set('Factor Info')
	})

	onDestroy(() => {
		saveIdeaForm(interFormNavigation).then()

		form && form.clearComponents()
	})

	function select(
		theRouteParams
	) {
		interFormNavigation = true
		navigateOnValid(form, IDEA_FORM, theRouteParams)
	}

</script>

<style>

	.A, .B {
		flex-basis: 100%;
		text-align: center;
	}

	.B {
		margin-left: 0.4em;
	}

	.positions {
		display: flex;
		margin-top: 10px;
		width: 100%;
	}

</style>

{#if form}
<form>
	<div class="pure-control-group">
		<Text
				field={form.fields.name}
				floatLabel={false}
		></Text>
	</div>
	<div
			class="positions"
	>
		<div
				class="A"
		>
			<CharacterButton
					character="A"
					fontSize={20}
					fontX={12}
					fontY={19}
					size={24}
					strokeWidth={1}
			></CharacterButton>
			<TextArea
					field={form.fields.positions.fields.A}
					floatLabel={false}
					mid={true}
			></TextArea>
		</div>
		<div
				class="B"
		>
			<CharacterButton
					character="B"
					fontSize={20}
					fontX={12}
					fontY={19}
					size={24}
					strokeWidth={1}
			></CharacterButton>
			<TextArea
					field={form.fields.positions.fields.B}
					floatLabel={false}
					mid={true}
			></TextArea>
		</div>
	</div>
	<div class="pure-control-group">
		<ColorPicker
				field={form.fields.color}
		></ColorPicker>
	</div>

	<nav class="pure-controls">
		<SaveButton
				classes="submitButton"
				highlightColor={submitHighlight}
				onclick={() => select($routeParams)}
		></SaveButton>
	</nav>
</form>
{/if}
