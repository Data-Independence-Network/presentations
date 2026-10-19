<script lang="ts">
	import type { IOptionsField } from "@votecube/forms";
	import { forms, OPTIONS, textToast } from "@votecube/ui-logic";
	import { onDestroy, onMount } from "svelte";
	import ClearIcon from "../icon/ClearIcon.svelte";
	import InfoIcon from "../icon/InfoIcon.svelte";
	import UndoIcon from "../icon/UndoIcon.svelte";

	interface Props {
		field: IOptionsField;
	}

	let { field }: Props = $props();

	let activeOptionIndex = $state(0);
	let doShowOptions = $state(false);
	let fieldSection: HTMLElement | null = $state(null);
	let filter = $state("");
	let filterInput: HTMLInputElement | null = $state(null);

	let delta = $state(0);
	let dropdownTopPx = $state(0);
	let isOriginal = true;
	let isValid = false;

	let formHandle: any = {
		get activeOptionIndex() {
			return activeOptionIndex;
		},
		set activeOptionIndex(newActiveOptionIndex) {
			activeOptionIndex = newActiveOptionIndex;
		},
		get dropdownTopPx() {
			return dropdownTopPx;
		},
		set dropdownTopPx(newDropdownTopPx) {
			dropdownTopPx = newDropdownTopPx;
		},
		get field() {
			return field;
		},
		get filterInput() {
			return filterInput;
		},
		get filter() {
			return filter;
		},
		set filter(newFilter) {
			filter = newFilter;
		},
		get options() {
			return options;
		},
		get showOptions() {
			return doShowOptions;
		},
		set showOptions(newShowOptions) {
			doShowOptions = newShowOptions;
		},
		hideOptions() {
			hideOptions();
		},
		setDelta(newDelta) {
			delta = newDelta;
		},
		setIsValid(newIsValid) {
			isValid = newIsValid;
		},
		setIsOriginal(newIsOriginal) {
			isOriginal = newIsOriginal;
		},
		setShowCalendar(_) {},
		setShowOptions(newShowOptions: boolean) {
			doShowOptions = newShowOptions;
		},
	};


	function v<T>(val: T, _delta: number): T {
		return val;
	}

	function blur() {
		field.touch();
		field.detect();
	}

	function checkValue(event) {
		OPTIONS.showFiltered(formHandle, fieldSection, event);
		if (
			field.value &&
			field.value.text.toLowerCase() !== filter.toLowerCase()
		) {
			field.unselect();
			return;
		}
		if (options.length !== 1) {
			return;
		}
		const theOption = options[0];
		if (filter.toLowerCase() === theOption.text.toLowerCase()) {
			field.select(theOption);
		}
	}
	function clear() {
		field.clear();
		filterInput.value = "";
	}

	function help() {
		const text = field.text;
		textToast.toggle(text.info, text.infoSeconds);
	}

	function hideOptions() {
		doShowOptions = false;
	}

	function onDocumentClick(event) {
		hideOptions();
	}

	function onDocumentKeydown(event) {
		OPTIONS.handleKeydown(formHandle, true, event);
	}

	function revert() {
		field.revert();
		const value = field.value;
		if (value) {
			filterInput.value = value.text;
		} else {
			filterInput.value = "";
		}
	}

	function select(option) {
		field.select(option);
		filterInput.value = "";
		hideOptions();
	}

	function showOptions(event) {
		OPTIONS.showFiltered(
			formHandle,
			event.currentTarget,
			event
			// , true
		);
	}

	function unselect(option, event) {
		field.unselect(option);
		event.stopPropagation();
		filterInput.value = "";
	}

	onMount(() => {
		field.setAsField(formHandle);
		// watchMultilineField(formHandle, field);
	});

	onDestroy(() => {
		field.removeComponent(formHandle);
		// removeWatch(formHandle);
	});
	let errors = $derived(v(field.errors, delta));
	let label = $derived(v(field.label, delta));
	let modified = $derived(v(
		!errors.length && field.rules.trackOriginal && !field.theIsOriginal,
		delta
	));
	let options = $derived(v(

			filter
				? field.filteredOptions.filter(
						(option) =>
							option.text
								.toLowerCase()
								.indexOf(filter.toLowerCase()) > -1
				  )
				: field.filteredOptions,
		delta
	));
	let requiredInvalid = $derived(v(field.validatorMap.required && errors.length, delta));
	let requiredValid = $derived(v(
		!modified && field.validatorMap.required && !errors.length,
		delta
	));
	let selections = $derived(v<
		{
			text: string;
		}[]
	>(field.value, delta));
	let touched = $derived(v(field.touched, delta));
	let trackOriginal = $derived(v(field.rules.trackOriginal, delta));
</script>

<svelte:window onclick={onDocumentClick} onkeydown={onDocumentKeydown} />
{#if $forms}
	<div class="multiSelect">
		<label class="field-label" for={field.id}>
			{label}
		</label>
		<section
			class="dropdownAnchor field fieldBox"
			class:invalid={touched && errors.length}
			class:modified
			class:requiredInvalid
			class:requiredValid
			onclick={showOptions}
			bind:this={fieldSection}
		>
			<div class="selections">
				<!--
					<div
							class="selectionSizer"
							ref:selectionSizer
					>
-->
				{#each selections as selection}
					<section class="selection">
						<div class="selection-contents">
							{selection.text}
						</div>
						<span
							class="unselect"
							onclick={(event) => unselect(selection, event)}
						>
							<s class="bar"></s>
							<s class="bar"></s>
						</span>
					</section>
				{/each}
				<input
					autocomplete="off"
					bind:value={filter}
					bind:this={filterInput}
					id={field.id}
					onblur={blur}
					oninput={checkValue}
					type="text"
				/>
				<!--
	</div>
	-->
			</div>
			<div class="icons">
				<div class="multiRowIconsCenter">
					{#if trackOriginal}
						<UndoIcon multiLine={true} onclick={revert} />
					{:else}
						<ClearIcon multiLine={true} onclick={clear} />
					{/if}
					<InfoIcon multiLine={true} onclick={help} />
				</div>
			</div>
		</section>
		{#if doShowOptions && options.length}
			<ul
				class="dropdown"
				style="
            top: {dropdownTopPx}px;
        "
			>
				{#each options as option, index}
					<li
						class="option"
						class:activeOption={index === activeOptionIndex}
						onclick={() => select(option)}
					>
						{option.text}
					</li>
				{/each}
			</ul>
		{/if}
		{#if touched}
			{#each errors as error}
				<span class="pure-form-message error">{error.message}</span>
			{/each}
		{/if}
	</div>
{/if}

<style>
	input[type="text"] {
		border: 0;
		box-shadow: none;
		color: #222;
		display: inline-block;
		font-weight: 600;
		margin: 0;
		margin-top: 8px;
		padding-left: 5px;
		vertical-align: text-bottom;
		width: 50px;
	}

	li {
		font-weight: 600;
		list-style: none;
		padding: 10px;
	}

	li + li {
		border-top: 1px solid #f8f8f8;
	}

	li:hover {
		background-color: #eee;
	}

	ul {
		max-height: 300px;
		padding: 0;
		width: 100%;
	}

	.activeOption {
		background-color: #eee;
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
		right: 0px;
		top: 0px;
	}

	.multiSelect {
		position: relative;
	}

	.selection {
		/*background-color: #808080;*/
		/*border: 1px solid #777;*/
		background-color: #ccc;
		border: 1px solid #222;
		border-radius: 3px;
		color: #333;
		/*color: #fff;*/
		display: inline-block;
		font-weight: 600;
		margin: 6px 0 0 6px;
		padding-left: 8px;
	}

	.selection-contents {
		float: left;
		padding: 8px 2px 0 0;
	}

	.selections {
		display: inline-block;
		width: calc(100% - 70px);
	}

	/*
			.selectionSizer {
					display: inline-block;
			}*/

	.unselect {
		display: inline-block;
		height: 26px;
		margin-top: 4px;
		position: relative;
		width: 30px;
	}

	.unselect .bar {
		/*background-color: #fff;*/
		background-color: #222;
		display: block;
		height: 3px;
		width: 16px;
		position: absolute;
		right: 8px;
		top: 12px;
	}

	.unselect .bar:first-child {
		transform: rotate(-45deg);
	}

	.unselect .bar:last-child {
		transform: rotate(45deg);
	}
</style>
