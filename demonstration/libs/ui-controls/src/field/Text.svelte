<script lang="ts">
	import { forms, textToast } from "@votecube/ui-logic";
	import { onDestroy, onMount } from "svelte";
	import ClearIcon from "../icon/ClearIcon.svelte";
	import InfoIcon from "../icon/InfoIcon.svelte";
	import UndoIcon from "../icon/UndoIcon.svelte";

	interface Props {
		field: any;
		floatLabel?: boolean;
		type?: string;
	}

	let { field, floatLabel = true, type = "text" }: Props = $props();

	let delta = $state(0);
	let isOriginal = true;
	let isValid = false;

	let formHandle = {
		setDelta(newDelta) {
			delta = newDelta;
		},
		setIsValid(newIsValid) {
			isValid = newIsValid;
		},
		setIsOriginal(newIsOriginal) {
			isOriginal = newIsOriginal;
		},
	};


	onMount(() => field.setAsField(formHandle));
	onDestroy(() => field.removeComponent(formHandle));

	function v<T>(val: T, _delta: number): T {
		return val;
	}

	function clear() {
		field.clear();
	}

	function help() {
		const text = field.text;
		textToast.toggle(text.info, text.infoSeconds);
	}

	function onBlur(event) {
		field.onBlur();
	}

	function onInput(event) {
		field.value = event.target.value;
		field.onInput();
	}

	function revert() {
		field.revert();
	}
	let errors = $derived(v(field.errors, delta));
	let label = $derived(v(field.label, delta));
	let displayMatches = $derived(v(field.displayMatches(), delta));
	let matches = $derived(v(field.matches, delta));
	let modified = $derived(v(
		!errors.length && field.rules.trackOriginal && !field.theIsOriginal,
		delta
	));
	let placeholder = $derived(v(field.placeholder, delta));
	let requiredInvalid = $derived(v(field.validatorMap.required && errors.length, delta));
	let requiredValid = $derived(v(
		!modified && field.validatorMap.required && !errors.length,
		delta
	));
	let touched = $derived(v(field.touched, delta));
	let trackOriginal = $derived(v(field.rules.trackOriginal, delta));
	let value = $derived(v(field.displayValue, delta));
</script>

{#if $forms}
	<div class="textField">
		{#if floatLabel}
			<label class="field-label" for={field.id}>{label}</label>
		{/if}
		{#if displayMatches}
			<a href="/#">{matches.length} matches</a>
		{/if}
		<section
			class="field fieldBox"
			class:invalid={touched && errors.length}
			class:modified
			class:requiredInvalid
			class:requiredValid
		>
			<div class="text">
				<input
					id={field.id}
					maxlength={field.rules.maxLength}
					onblur={onBlur}
					oninput={onInput}
					{placeholder}
					{type}
					{value}
				/>
			</div>
			<div class="icons">
				<div>
					<InfoIcon onclick={help} />
					{#if trackOriginal}
						<UndoIcon onclick={revert} />
					{:else}
						<ClearIcon onclick={clear} />
					{/if}
				</div>
			</div>
		</section>
		{#if touched}
			{#each errors as error}
				<span class="pure-form-message error">{error.message}</span>
			{/each}
		{/if}
	</div>
{/if}

<style>
	a {
		display: inline-block;
		position: absolute;
		right: 10px;
		top: 0px;
	}

	section {
		position: relative;
	}

	input {
		border: 0;
		box-shadow: none;
		display: inline-block;
		margin: 0;
		margin-top: 8px;
		padding-left: 5px;
		vertical-align: text-bottom;
		width: 100%;
	}

	.fieldBox {
		background-color: white;
		min-height: 2.25em;
		padding-bottom: 5px;
		position: relative;
		width: 100%;
	}

	.icons {
		display: inline-block;
		height: 100%;
		position: absolute;
		right: 1px;
		top: 1px;
	}

	.textField {
		position: relative;
		text-align: left;
	}

	.text {
		display: inline-block;
		width: calc(100% - 70px);
	}
</style>
