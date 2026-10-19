<script lang="ts">
	import type { IComponent, IFieldBase, IMatchingField } from "@votecube/forms";

	import { forms, textToast } from "@votecube/ui-logic";
	import { onDestroy, onMount } from "svelte";
	import ClearIcon from "../icon/ClearIcon.svelte";
	import InfoIcon from "../icon/InfoIcon.svelte";
	import UndoIcon from "../icon/UndoIcon.svelte";

	interface Props {
		field: IMatchingField;
		floatLabel?: boolean;
		mid?: boolean;
		mini?: boolean;
	}

	let {
		field,
		floatLabel = true,
		mid = false,
		mini = false
	}: Props = $props();

	let delta = $state(0);
	let isOriginal = true;
	let isValid = false;

	let formHandle: IFieldBase & IComponent = {
		setDelta(newDelta) {
			delta = newDelta;
		},
		setIsValid(newIsValid) {
			isValid = newIsValid;
		},
		setIsOriginal(newIsOriginal) {
			isOriginal = newIsOriginal;
		},
	} as any;


	onMount(() => field.setAsField(formHandle));
	onDestroy(() => field.removeComponent(formHandle));

	function f<T>(func: () => T, _delta: number): T {
		return func();
	}

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
	let charCount = $derived(f(() => {
		const separator = mid || mini ? "/" : " / ";
		return field.rules.maxLength
			? `${field.displayValue ? field.displayValue.length : 0}${separator}${
					field.rules.maxLength
			  }`
			: "";
	}, delta));
	let errors = $derived(v(field.errors, delta));
	let label = $derived(v(field.label, delta));
	let displayMatches = $derived(v(field.displayMatches(), delta));
	let matches = $derived(v(field.matches, delta));
	let maxlength = $derived(v(field.rules.maxLength as number, delta))
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
	<div class="textArea">
		{#if floatLabel}
			<label class="field-label" for={field.id}>
				{label}
			</label>
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
			<div class="text" class:mid class:mini>
				<!--		            use:id="{id}"-->
				<textarea
					class:mid
					class:mini
					id={field.id}
					onblur={onBlur}
					oninput={onInput}
					{placeholder}
					maxlength={maxlength}
					rows="5"
					{value}
				></textarea>
			</div>
			<div class="icons" class:mid class:mini>
				<div class="multiRowIconsCenter">
					{#if trackOriginal}
						<UndoIcon onclick={revert} multiLine={true} />
					{:else}
						<ClearIcon onclick={clear} multiLine={true} />
					{/if}
					<InfoIcon onclick={help} multiLine={true} />
				</div>
			</div>
		</section>
		<table>
			<tbody><tr>
				<td>
					{#if touched}
						{#each errors as error}
							<span class="pure-form-message error"
								>{error.message}</span
							>
						{/each}
					{/if}
				</td>
				<td class:mid class:mini>
					{charCount}
				</td>
			</tr></tbody>
		</table>
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

	table {
		width: 100%;
	}

	td:first-child {
		width: calc(100% - 80px);
	}

	td:first-child.mid,
	td:first-child.mini {
		width: calc(100% - 50px);
	}

	td:last-child {
		padding: 5px;
		width: 80px;
	}

	td:last-child.mid,
	td:last-child.mini {
		padding: 3px;
		width: 50px;
	}

	textarea {
		border: 0;
		box-shadow: none;
		display: inline-block;
		margin: 0;
		margin-top: 8px;
		padding-left: 5px;
		text-align: text-bottom;
		width: 100%;
	}

	textarea.mini {
		height: 85px;
	}

	textarea.mid {
		height: 162px;
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

	.icons.mid,
	.icons.mini {
		width: 30px;
	}

	.text {
		display: inline-block;
		width: calc(100% - 70px);
	}

	.text.mid,
	.text.mini {
		width: calc(100% - 30px);
	}

	.textArea {
		position: relative;
		text-align: left;
	}
</style>
