<script lang="ts">
	import { forms } from "@votecube/ui-logic";
	import { onDestroy, onMount, type Snippet } from "svelte";

	interface Props {
		customError?: { message: string } | null;
		fieldGroup: any;
		content?: Snippet;
		onselect?: () => void;
	}

	let { customError = null, fieldGroup, content, onselect }: Props = $props();

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

	onMount(() => fieldGroup.setAsField(formHandle));
	onDestroy(() => fieldGroup.removeComponent(formHandle));

	function v<T>(val: T, _delta: number): T {
		return val;
	}

	function onBlur(event) {
		fieldGroup.onBlur();
	}

	function select() {
		fieldGroup.touch(true);
		onselect?.();
	}
	let error = $derived(v(
		fieldGroup.error
			? customError
				? customError
				: fieldGroup.error
			: null,
		delta
	));
	let label = $derived(v(fieldGroup.label, delta));
	let modified = $derived(v(
		!error && fieldGroup.rules.trackOriginal && !fieldGroup.theIsOriginal,
		delta
	));
	let requiredInvalid = $derived(v(fieldGroup.isRequired && error, delta));
	let requiredValid = $derived(v(!modified && fieldGroup.isRequired && !error, delta));
	let touched = $derived(v(fieldGroup.touched, delta));
	let trackOriginal = $derived(v(fieldGroup.rules.trackOriginal, delta));
</script>

{#if $forms}
	<div
		class="field"
		class:invalid={touched && error}
		class:modified
		class:requiredInvalid
		class:requiredValid
		id={fieldGroup.name}
		onclick={select}
	>
		{@render content?.()}
	</div>
	{#if touched && error}
		<span class="pure-form-message error">
			{error.message}
		</span>
	{/if}
{/if}

<style>
	div {
		border: 1px solid #aaa;
		border-bottom-right-radius: 2px;
		border-top-right-radius: 2px;
		color: #555;
		cursor: pointer;
		display: block;
		margin: 5px 0;
		padding: 0.5em 0.5em 0.5em 0.3em;
		text-align: center;
		vertical-align: middle;
		white-space: normal;
		width: 100%;
	}
</style>
