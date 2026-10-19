<script lang="ts">
	import type { IUiIdea } from "@votecube/model";
	import { onMount } from "svelte";
	import SaveButton from "./button/SaveButton.svelte";
	import Radio from "./field/Radio.svelte";
	import ActionPopover from "./shell/ActionPopover.svelte";

	interface Props {
		idea: IUiIdea;
		oncancel?: () => void;
		onsave?: () => void;
	}

	let { idea, oncancel, onsave }: Props = $props();

	let value: IUiIdea["ageSuitability"] | undefined = $state();
	let values: IUiIdea["ageSuitability"][] = [0, 6, 12, 16, 18];

	onMount(() => {
		if (idea.ageSuitability !== undefined) {
			value = idea.ageSuitability;
		}
	});

	function setValue(newValue) {
		value = newValue;
	}
	function save() {
		// TODO: save age suitability
		if (!value && value !== 0) {
			oncancel?.();
			return;
		}
		idea.ageSuitability = value;
		onsave?.();
	}
</script>

<ActionPopover {oncancel}>
	{#snippet header()}
		<div>Idea Age Suitability</div>
	{/snippet}
	{#snippet content()}
		<div>
			<table>
				<tbody>
				{#each values as value}
					<tr>
						<td>
							<Radio
								name="ageSuitability"
								onselect={() => setValue(value)}
								styles="position: absolute; right: 5px; top: -1px;"
								{value}
							/>
						</td>
						<td>
							{value}+
						</td>
					</tr>
				{/each}
				</tbody>
			</table>
		</div>
	{/snippet}
	{#snippet actions()}
		<div>
			<SaveButton onclick={save} />
		</div>
	{/snippet}
</ActionPopover>

<style>
	table {
		width: 100%;
		margin-bottom: 10px;
	}

	td:first-child {
		height: 42px;
		position: relative;
		width: 55%;
	}

	td:last-child {
		font-size: 1.5em;
		font-weight: 400;
		text-align: left;
	}
</style>
