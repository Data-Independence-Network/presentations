<script lang="ts">
	import { DEPENDENCY_INJECTION, type IChildContainer } from "@airport/direction-indicator";
	import { type ILogicUtils, LogicUtils } from "@votecube/vc-logic";
	import { onDestroy, onMount } from "svelte";
	import CharacterButton from "@votecube/ui-controls/src/button/CharacterButton.svelte";
	import Block from "@votecube/ui-controls/src/field/Block.svelte";

	interface Props {
		factor: any;
		text: any;
		onselect?: () => void;
	}

	let { factor, text, onselect }: Props = $props();

	let container: IChildContainer;
	let logicUtils: ILogicUtils | undefined = $state();

	onMount(async () => {
		container = DEPENDENCY_INJECTION.ui("SelectionBlock");
		logicUtils = await container.get(LogicUtils);
	});
	onDestroy(() => DEPENDENCY_INJECTION.remove(container));

	function getTextColor(color) {
		if (!logicUtils) {
			return "000";
		}
		return logicUtils.getTextColor(color);
	}
	let color = $derived(factor ? factor.fields.color : null);
	let selectedColor = $derived.by(() => {
		if (!color || !color.valid) {
			return "#808080";
		}
		const value = color.value;

		return `rgb(${value.red}, ${value.green}, ${value.blue})`;
	});
</script>

<Block customError={text.error} fieldGroup={factor} {onselect}>
	{#snippet content()}
		<div>
			<table>
				<tbody><tr>
					<td>
						<div>
							<figure
								style="
	                    background-color: {selectedColor};
	                    color: #{getTextColor(color.value)};
	                "
							>
								T
							</figure>
						</div>
					</td>
					<td>
						<div>
							{#if factor.valid && factor.hasChildValues}
								{factor.fields.name.displayValue}
							{:else}
								{text.label}
							{/if}
						</div>
					</td>
				</tr></tbody>
			</table>
			<section>
				<div>
					<CharacterButton
						character="A"
						fontSize={20}
						fontX={12}
						fontY={19}
						size={24}
						strokeWidth={1}
					/>
					<div>
						{#if factor.valid && factor.hasChildValues}
							{factor.fields.positions.fields.A.displayValue}
						{/if}
					</div>
				</div>
				<div>
					<CharacterButton
						character="B"
						fontSize={20}
						fontX={12}
						fontY={19}
						size={24}
						strokeWidth={1}
					/>
					<div>
						{#if factor.valid && factor.hasChildValues}
							{factor.fields.positions.fields.B.displayValue}
						{/if}
					</div>
				</div>
			</section>
		</div>
	{/snippet}
</Block>

<style>
	figure {
		border: 3px groove gray;
		border-radius: 3px;
		font-size: 1.2em;
		line-height: 0.9em;
		height: 25px;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 25px;
	}

	section {
		display: flex;
		margin-top: 10px;
		width: 100%;
	}

	section > div {
		flex-basis: 100%;
		text-align: center;
		word-break: break-word;
	}

	table {
		width: 100%;
	}

	td:first-child > div {
		position: relative;
		min-height: 25px;
	}

	td:first-child {
		width: 31px;
	}

	td:last-child {
		width: calc(100% - 32px);
	}

	td:last-child > div {
		padding-right: 32px;
		text-align: center;
		width: 100%;
		word-break: break-word;
	}
</style>
