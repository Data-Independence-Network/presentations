<script lang="ts">
	import { DEPENDENCY_INJECTION } from "@airport/direction-indicator";
	import type { IUiIdea, IUiAgreementFactor } from "@votecube/model";
	import { type ILogicUtils, LogicUtils } from "@votecube/vc-logic";
	import { onDestroy, onMount } from "svelte";
	import LeftButton from "@votecube/ui-controls/src/button/LeftButton.svelte";
	import RightButton from "@votecube/ui-controls/src/button/RightButton.svelte";

	interface Props {
		moveDelta: number;
		idea: IUiIdea;
		agreementFactor: IUiAgreementFactor;
		onmove?: (move: { outcome: string; percentChange: number }) => void;
		onmoveToValue?: (value: string) => void;
		onupdate?: () => void;
	}

	let { moveDelta, idea, agreementFactor, onmove, onmoveToValue, onupdate }: Props = $props();

	let container;
	let incrementInterval;
	let interval;
	let lastNumIncs;
	let lastAgreementFactor: IUiAgreementFactor;
	let logicUtils: ILogicUtils | undefined = $state();
	let numIncs;
	let numReIncs;
	let outcome;
	let percentChange;
	let positionInput: HTMLInputElement | undefined = $state();

	function v<T>(val: T, _delta: number): T {
		return val;
	}

	function mouseDown(outcome) {
		onPress(outcome);
	}

	function mouseUp(event) {
		event.preventDefault();

		clearIntrvl();
	}

	function moveToValue() {
		onmoveToValue?.(positionInput.value);
		// this.set({moveToValueDelta: this.get().moveToValueDelta + 1})
	}

	function touchStart(outcome, event) {
		event.preventDefault();
		onPress(outcome);
	}
	onMount(async () => {
		container = DEPENDENCY_INJECTION.ui("LinearPositionPicker");
		logicUtils = await container.get(LogicUtils);
	});

	onDestroy(() => {
		// this.refreshListener.cancel()
		DEPENDENCY_INJECTION.remove(container);
	});

	async function initPage() {
		container = DEPENDENCY_INJECTION.ui("LinearPositionPicker");
		logicUtils = await container.get(LogicUtils);
	}

	function checkInterval() {
		numIncs = numIncs - 1;
		if (lastAgreementFactor !== agreementFactor) {
			clearIntrvl();
			numIncs = 0;
			return;
		}
		onmove?.({
			outcome,
			percentChange,
		});
		if (!numIncs) {
			clearIntrvl();
			numReIncs = numReIncs - 1;
			if (!numReIncs) {
				return;
			}
			interval = interval / 2;
			numIncs = lastNumIncs * 2;
			percentChange = percentChange * 2;
			lastNumIncs = numIncs;
			setIntrvl(interval);
		}
	}

	function setIntrvl(interval) {
		incrementInterval = setInterval(() => {
			checkInterval();
			onupdate?.();
		}, interval);
	}

	function clearIntrvl() {
		if (incrementInterval) {
			clearInterval(incrementInterval);
		}
	}

	/*    function getInputBorder(
					value
			) {
					return value.valid === undefined
					|| value.valid
							? '0px'
							: '3px solid red'
			}*/

	function getRadius(outcome, agreementFactor: IUiAgreementFactor) {
		return outcome === agreementFactor.outcome ? 24 : 23;
	}

	function getStrokeWidth(outcome, agreementFactor: IUiAgreementFactor) {
		return outcome === agreementFactor.outcome ? 0 : 3;
	}

	function getButtonColor(matchingOutcomes, agreementFactor: IUiAgreementFactor) {
		return matchingOutcomes.indexOf(agreementFactor.outcome) > -1
			? "000"
			: "fff";
	}
	/*
	function updateValue() {
		setTimeout(() => {
			positionInput.value = agreementFactor.value
		}, 16)
	}*/

	function onPress(newOutcome) {
		percentChange = 1;
		lastNumIncs = 5;
		lastAgreementFactor = agreementFactor;

		onmove?.({
			outcome: newOutcome,
			percentChange,
		});

		interval = 360;
		outcome = newOutcome;
		numIncs = 8;
		numReIncs = 4;
		percentChange = 1;
		setIntrvl(interval);

		onupdate?.();
	}
	// valueBottomBorder: ({moveToValueDelta, value}) => getInputBorder(value),
	let leftCircleRadius = $derived(v(getRadius("A", agreementFactor), moveDelta));
	let rightCircleRadius = $derived(v(getRadius("B", agreementFactor), moveDelta));
	let leftStrokeWidth = $derived(v(getStrokeWidth("A", agreementFactor), moveDelta));
	let rightStrokeWidth = $derived(v(getStrokeWidth("B", agreementFactor), moveDelta));
	let leftHighlightColor = $derived(v(
		getButtonColor(["B", null], agreementFactor),
		moveDelta
	));
	let rightHighlightColor = $derived(v(
		getButtonColor(["A", null], agreementFactor),
		moveDelta
	));
	let leftFillColor = $derived(v(getButtonColor(["A"], agreementFactor), moveDelta));
	let rightFillColor = $derived(v(getButtonColor(["B"], agreementFactor), moveDelta));
	let factorColor = $derived(v(
		logicUtils && agreementFactor.outcome
			? "#" +
					logicUtils.getColor(
						idea.factors[agreementFactor.factorNumber].color
					)
			: "initial",
		moveDelta
	));
</script>

<tr>
	<td>
		<div
			onmousedown={() => mouseDown("A")}
			onmouseup={mouseUp}
			ontouchstart={(event) => touchStart("A", event)}
			ontouchend={mouseUp}
		>
			<LeftButton
				circleRadius={leftCircleRadius}
				fillColor={leftFillColor}
				highlightColor={leftHighlightColor}
				strokeWidth={leftStrokeWidth}
				styles="left: 0px; position: absolute; top: 0px;"
			/>
		</div>
	</td>
	<td>
		<figure
			class:factor={agreementFactor.value}
			style="background-color: {factorColor};"
		>
			<input
				maxlength="3"
				oninput={moveToValue}
				bind:this={positionInput}
				value={agreementFactor.value}
			/>
			<span>%</span>
		</figure>
		<!--
						style="
				border-bottom: {valueBottomBorder};
			"
			-->
	</td>
	<td>
		<div
			onmousedown={() => mouseDown("B")}
			onmouseup={mouseUp}
			ontouchstart={(event) => touchStart("B", event)}
			ontouchend={mouseUp}
		>
			<RightButton
				circleRadius={rightCircleRadius}
				fillColor={rightFillColor}
				highlightColor={rightHighlightColor}
				strokeWidth={rightStrokeWidth}
				styles="left: 0px; position: absolute; top: 0px;"
			/>
		</div>
	</td>
</tr>

<style>
	div {
		display: inline-block;
		height: 50px;
		position: relative;
		width: 50px;
	}

	figure {
		border-top: 10px solid transparent;
		display: inline-block;
		height: 60px;
		margin: auto;
		position: relative;
		width: 110px;
	}

	input {
		background: transparent;
		border: 0px;
		font-family: "Lucida Console";
		left: 0px;
		margin: 0px;
		padding: 0px 15px 0px 0px;
		position: absolute;
		text-align: right;
		top: 0px;
		width: 85px;
	}

	span {
		font-family: "Lucida Console";
		font-size: 0.7em;
		position: absolute;
		right: 17px;
		top: 9px;
	}

	td {
		font-size: 0.8em;
		width: 33%;
	}

	.factor {
		border: 1px solid black;
		border-radius: 4px;
		border-top: 10px solid;
	}
</style>
