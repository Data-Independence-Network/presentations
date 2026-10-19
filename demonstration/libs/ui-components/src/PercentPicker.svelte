<script lang="ts">
	import type { IUiIdea, IUiAgreementFactor } from '@votecube/model';

	import {popup} from '@votecube/ui-logic'
	import {onMount} from 'svelte'
	import {fly}                from 'svelte/transition'
	import CharacterButton      from '@votecube/ui-controls/src/button/CharacterButton.svelte'
	import LinearPositionPicker from './LinearPositionPicker.svelte'

	interface Props {
		delta: any;
		idea: IUiIdea;
		agreementFactors: IUiAgreementFactor[];
		onclose?: () => void;
		onmove?: (move: {
			factorNumber: IUiAgreementFactor['factorNumber']
			outcome: IUiAgreementFactor['outcome']
			percentChange: number
		}) => void;
		onmoveToValue?: (move: {
			factorNumber: IUiAgreementFactor['factorNumber']
			value: string
		}) => void;
	}

	let { delta, idea, agreementFactors, onclose, onmove, onmoveToValue }: Props = $props();

	let pickerDelta = $state(0)

	let moveDelta = $derived(delta + pickerDelta)

	onMount(() => {
		popup.set(true)
		return () => popup.set(false)
	})

	function move(
		factorNumber,
		outcome,
		percentChange
	) {
		onmove?.({
			factorNumber,
			outcome,
			percentChange
		})
		update()
	}

	function moveToValue(
		factorNumber,
		value
	) {
		onmoveToValue?.({
			factorNumber,
			value
		})
		update()
	}

	function update() {
		pickerDelta += 1
	}

</script>

<style>
	@media (min-width: 321px) {
		summary.override {
			font-size: 0.65em;
			padding-top: 4px;
		}
	}

	@media (min-width: 376px) {
		summary.override {
			font-size: 0.7em !important;
			padding-top: 3px;
		}
	}

	aside {
		background: hsla(0, 100%, 100%, 0.8);
		border: 2px dashed black;
		border-radius: 5px;
		bottom: 0px;
		color: black;
		font-size: 3em;
		margin: 0px;
		max-width: 420px;
		padding: 3px;
		position: fixed;
		text-align: center;
		width: 100%;
	}

	aside > div {
		position: relative;
		width: 100%;
	}

	nav {
		color: black;
		font-size: 0.3em;
		height: 50px;
		line-height: 50px;
		position: absolute;
		text-align: center;
		top: 0px;
		vertical-align: middle;
		width: 50px;
	}

	nav.left {
		left: 0px;
	}

	nav.right {
		right: 0px;
	}


	summary {
		font-size: 0.6em;
		font-weight: 300;
		margin-bottom: -10px;
		padding-top: 5px;
		text-align: center;
		width: 100%;
	}

	table {
		width: 100%;
	}

	td {
		height: 70px;
		width: 33%;
	}
</style>

<aside
		transition:fly='{{y:200, duration: 500}}'
>
	<div>
		<nav
				class="left"
				onclick={onclose}
		>
			╳
		</nav>
		<nav
				class="right"
				onclick={onclose}
		>
			╳
		</nav>
		<summary
				class="override"
		>
			Manual Override
		</summary>
		<table>
			<tbody><tr>
				<td>
					<CharacterButton
							character="A"
							fontSize={20}
							fontX={12}
							fontY={19}
							size={24}
							strokeWidth={1}
					></CharacterButton>
				</td>
				<td></td>
				<td>
					<CharacterButton
							character="B"
							fontSize={20}
							fontX={12}
							fontY={19}
							size={24}
							strokeWidth={1}
					></CharacterButton>
				</td>
			</tr></tbody>
			<!--
			<tr>
				<td
						colspan="3"
				>
					<var
							style="position: relative; width: 100%"
					>
						<figure
								style="margin: 26px; width: 100%"
						>

							<CharacterButton
									character="A"
									fontSize="22"
									fontX="13"
									fontY="21"
									size="26"
									strokeWidth="1"
									styles="left: -13px; position: absolute; top: 1px;"
							></CharacterButton>
							<RibbonIcon></RibbonIcon>
							<CharacterButton
									character="B"
									fontSize="22"
									fontX="13"
									fontY="21"
									size="26"
									strokeWidth="1"
									styles="right: -13px; position: absolute; top: 1px;"
							></CharacterButton>
						</figure>
					</var>
				</td>
			</tr>
			-->
			<!-- TODO: add support for voting value -->

			{#each agreementFactors as agreementFactor, i}
			<LinearPositionPicker
					moveDelta={moveDelta}
					onmove={(event) => move(agreementFactor.factorNumber, event.outcome, event.percentChange)}
					onmoveToValue={(value) => moveToValue(agreementFactor.factorNumber, value)}
					onupdate={update}
					idea={idea}
					agreementFactor={agreementFactor}
			/>
			{/each}
		</table>
	</div>
</aside>
