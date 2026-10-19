<script lang="ts">
	import { DEPENDENCY_INJECTION, type IChildContainer } from "@airport/direction-indicator";
	import { TOUCH } from "@votecube/cube-logic";
	import type {
		IUiIdea,
		IUiAgreement,
		IUiAgreementFactor,
	} from "@votecube/model";
	import { windowWidth } from "@votecube/ui-logic";
	import { FactorRankingLogic, LogicUtils } from "@votecube/vc-logic";
	import { onDestroy, onMount } from "svelte";
	import { fly } from "svelte/transition";
	import CharacterButton from "@votecube/ui-controls/src/button/CharacterButton.svelte";
	import MoveButton from "@votecube/ui-controls/src/button/MoveButton.svelte";

	interface IMovingAgreementFactor extends IUiAgreementFactor {
		index?: number;
		moving?: boolean;
		offset?: { x: number; y: number };
		originalTopLeftY?: number;
		originalX?: number;
		originalY?: number;
		pageX?: number;
		pageY?: number;
		width?: number;
	}

	interface Props {
		delta: number;
		idea: IUiIdea;
		agreement: IUiAgreement;
		agreementFactors?: IUiAgreementFactor[];
		onrankingAdjusted?: () => void;
	}

	let {
		delta,
		idea,
		agreement,
		agreementFactors = [],
		onrankingAdjusted
	}: Props = $props();

	let container: IChildContainer | undefined = $state.raw();
	let factorOrderDelta = 0;
	let lastMoveStart;
	let movingAgreementFactor: IMovingAgreementFactor | undefined = $state.raw();
	let movingAgreementFactorDelta = $state(0);
	let removeCount = $state(0);
	let removeDoneCount = $state(0);
	let showTransition = $state(true);
	let switchingOutcome = $state(false);
	let timeoutHandle;

	onMount(() => {
		container = DEPENDENCY_INJECTION.ui("FactorRanking");
	});

	onDestroy(() => {
		DEPENDENCY_INJECTION.remove(container);
	});

	function canRemove(
		agreementFactors: IUiAgreementFactor[],
		index,
		_delta: number
	) {
		return index ? true : agreementFactors[1].outcome;
	}

	function factorHighlight(
		movingAgreementFactor,
		index,
		_movingAgreementFactorDelta,
		_container?
	) {
		if (
			!movingAgreementFactor ||
			index === movingAgreementFactor.index ||
			!container
		) {
			return "";
		}

		const factorInfo = container
			.getSync(FactorRankingLogic)
			.getFactorInfoAtCoords(
				movingAgreementFactor.originalX,
				movingAgreementFactor.pageY,
				movingAgreementFactor.index
			);

		return factorInfo && factorInfo.factorNumber === index
			? "highlighted"
			: "";
	}

	function factorPosition(
		windowWidthPx: number,
		movingAgreementFactor,
		_movingAgreementFactorDelta: number
	) {
		if (!movingAgreementFactor.moving || !movingAgreementFactor.outcome) {
			return "";
		}
		// let left = Math.ceil(movingAgreementFactor.offset.topLeft.x)
		// let left = movingAgreementFactor.pageX
		let top = movingAgreementFactor.pageY;
		if (movingAgreementFactor.offset) {
			// left -= movingAgreementFactor.offset.x
			top -= movingAgreementFactor.offset.y;
		}
		const xChange =
			movingAgreementFactor.originalX - movingAgreementFactor.pageX;
		const absXChange = Math.abs(xChange);
		const absYChange = Math.abs(
			movingAgreementFactor.originalY - movingAgreementFactor.pageY
		);

		if (
			movingAgreementFactor.index > 0 &&
			xChange > 0 &&
			absXChange > absYChange
		) {
			if (movingAgreementFactor.originalTopLeftY) {
				top = movingAgreementFactor.originalTopLeftY;
			}
		}
		const topOffset = windowWidthPx > 320 ? 189 : 153;

		// left: ${left}px;
		return `position: absolute;
					top: ${top - topOffset}px;
					width: ${movingAgreementFactor.width}px;
					z-index: 5000`;
	}

	function flyX(
		agreementFactor: IUiAgreementFactor
		// cubeTransition
	) {
		return agreementFactor.outcome === "A" ? -200 : 200;
	}

	// cubeTransition ? 0 : agreementFactor.outcome === 'A' ? -200 : 200,
	function getColor(color, container, _delta: number) {
		if (!container) {
			return "FFF";
		}
		return container.getSync(LogicUtils).getColor(color);
	}

	function getTextColor(color, container, _delta: number) {
		if (!container) {
			return "000";
		}
		return container.getSync(LogicUtils).getTextColor(color);
	}

	function isB(agreementFactor, _delta: number) {
		return agreementFactor.outcome === "B";
	}

	function showPlaceholder(removeCount, removeDoneCount) {
		return removeCount === removeDoneCount;
	}

	function showMovePlaceholder(
		movingAgreementFactor,
		index,
		_movingAgreementFactorDelta
	) {
		return (
			movingAgreementFactor &&
			movingAgreementFactor.moving &&
			index === movingAgreementFactor.index
		);
	}

	function showPosition(
		agreementFactor: IUiAgreementFactor,
		_movingAgreementFactor,
		_movingAgreementFactorDelta
	) {
		return agreementFactor.value;
	}

	function sideMatch(
		agreementFactor: IUiAgreementFactor,
		outcome,
		switchingOutcome
	) {
		return switchingOutcome || outcome === agreementFactor.outcome;
	}

	function transitionStyle(
		showTransition
		// ) => showTransition ? 'transition: transform 1000ms linear;' : ''
	) {
		return (
			"transition: left 700ms, opacity 700ms" +
			(showTransition ? ", transform 1000ms linear;" : ";")
		);
	}

	function moveEnd(
		movingAgreementFactor,
		agreement,
		agreementFactors,
		index,
		event
	) {
		if (!container) {
			return;
		}
		try {
			stopMoveEventListening();

			if (
				!lastMoveStart ||
				// Already added the factor in
				!movingAgreementFactor
			) {
				return;
			}

			const usefulEvent =
				event.changedTouches && event.changedTouches[0]
					? event.changedTouches[0]
					: event;
			const [factorRankingLogic, logicUtils] = container.getSync(
				FactorRankingLogic,
				LogicUtils
			);
			const factorInfo = factorRankingLogic.getFactorInfoAtCoords(
				agreementFactors[index].originalX,
				usefulEvent.pageY,
				index
			);
			if (factorInfo && factorInfo.factorNumber >= 0) {
				index = factorInfo.factorNumber;
			}

			let dx =
				movingAgreementFactor.pageX - movingAgreementFactor.originalX;
			let dy =
				movingAgreementFactor.pageY - movingAgreementFactor.originalY;
			const absDx = Math.abs(dx);
			const absDy = Math.abs(dy);

			// console.log('moving: ' + index)
			// console.log(event)

			const originalIndex = lastMoveStart.index;
			const upButtonClickMove = lastMoveStart.move;
			const addOrRemove = lastMoveStart.addOrRemove;

			if (!upButtonClickMove && originalIndex === index) {
				singleFactorChange(
					absDx,
					absDy,
					addOrRemove,
					dx,
					dy,
					index,
					originalIndex,
					upButtonClickMove,
					agreement,
					agreementFactors,
					factorRankingLogic,
					logicUtils
				);
			} else {
				multiFactorChange(
					absDx,
					absDy,
					dy,
					index,
					originalIndex,
					upButtonClickMove,
					agreement,
					agreementFactors,
					factorRankingLogic,
					logicUtils
				);
			}
		} finally {
			stopAgreementFactorMovement(movingAgreementFactor);
		}
	}

	function moveStart(agreementFactors, index, event) {
		let time = new Date().getTime();
		movingAgreementFactor = agreementFactors[index];

		const usefulEvent = event.touches ? event.touches[0] : event;
		movingAgreementFactor.index = index;
		// Offset is only recorded once
		movingAgreementFactor.offset = container
			.getSync(FactorRankingLogic)
			.getInElementOffset(usefulEvent);
		positionMovingAgreementFactor(movingAgreementFactor, usefulEvent);
		movingAgreementFactor.originalX = movingAgreementFactor.pageX;
		movingAgreementFactor.originalY = movingAgreementFactor.pageY;

		const move = event.factorButtonMove;
		const addOrRemove = event.factorButtonAddOrRemove;
		if (addOrRemove || move) {
			movingAgreementFactor.moving = true;
		}
		movingAgreementFactor.width = document.getElementById(
			"factorPlace_" + index
		).clientWidth;

		lastMoveStart = {
			index: event.factorButtonMove ? event.factorButtonIndex : index,
			move,
			addOrRemove,
			time,
		};
		incMovingDelta();

		if (!addOrRemove) {
			document.addEventListener("mousemove", onFactorMove);
			document.addEventListener("touchmove", onFactorMove);
			agreementFactors[index].moving = true;
		}
		// console.log('moveStart: ' + index)
		// console.log(event)
	}

	function addOrRemove(operation, event) {
		event.factorButtonAddOrRemove = operation;
	}

	function touchStart(agreementFactors: IUiAgreementFactor[], index, event) {
		// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
		event.preventDefault();
		moveStart(agreementFactors, index, event);
	}

	function upStart(index, event, _container) {
		event.factorButtonMove = true;
		event.factorButtonIndex = index - 1;
		setTimeout(() => {
			const [factorRankingLogic, logicUtils] = container.getSync(
				FactorRankingLogic,
				LogicUtils
			);
			factorRankingLogic.move(index - 1, { y: 100 }, logicUtils);
			factorRankingLogic.move(index, { y: -100 }, logicUtils);
		}, 100);
	}

	function singleFactorChange(
		absDx,
		absDy,
		addOrRemove,
		dx,
		dy,
		index,
		originalIndex,
		upButtonClickMove,
		agreement,
		agreementFactors,
		factorRankingLogic,
		logicUtils
	) {
		if (!addOrRemove && absDx < 10 && absDy < 10) {
			changeFactorPosition(agreementFactors, index, factorRankingLogic);
		}
		// Change to 1 factor only
		else if (addOrRemove || absDx - 10 > absDy) {
			if (!addOrRemove) {
				addOrRemove = dx > 0 ? "add" : "remove";
			}
			handleMoveEffects(
				factorRankingLogic.addOrRemoveAFactor(
					agreementFactors,
					index,
					addOrRemove,
					agreement,
					logicUtils
				)
			);
			// if (addOrRemove === 'add') {
			// 	setTimeout(() => {
			// 		move(index, {x: -200, duration: 700})
			// 	})
			// }
		} else if (absDy >= 10 && absDx * 2 < absDy) {
			const index = factorRankingLogic.getAlternateIndex(
				absDy,
				dy,
				originalIndex,
				!!agreementFactors[2].outcome
			);
			if (index !== originalIndex) {
				multiFactorChange(
					absDx,
					absDy,
					dy,
					index,
					originalIndex,
					upButtonClickMove,
					agreement,
					agreementFactors,
					factorRankingLogic,
					logicUtils
				);
			}
			// Else a no-op
		}
		// Else a no-op
	}

	function multiFactorChange(
		absDx,
		absDy,
		dy,
		index,
		originalIndex,
		upButtonClickMove,
		agreement,
		agreementFactors,
		factorRankingLogic,
		logicUtils
	) {
		// Change across multiple items
		if (upButtonClickMove || absDy - 10 > absDx) {
			if (
				!agreementFactors[originalIndex].outcome ||
				!agreementFactors[index].outcome
			) {
				return;
			}
			// Move items
			if (upButtonClickMove || dy > 0) {
				handleMoveEffects({
					numMoved: factorRankingLogic.moveFactorDown(
						agreementFactors,
						agreement,
						originalIndex,
						index,
						logicUtils
					),
				});
			} else {
				handleMoveEffects({
					numMoved: factorRankingLogic.moveFactorUp(
						agreementFactors,
						agreement,
						originalIndex,
						index,
						logicUtils
					),
				});
			}
		}
		/* Not implemented
		else if (moveCoords.moveY) {
			// Add or remove items
			if (moveCoords.yBy <= 0) {
				removeFactors(agreementFactors, this)
			} else {
				addFactors(agreementFactors, lastMoveStart.index, index, this)
			}
		}
		*/
		// Else a no-op
	}

	function changeFactorPosition(agreementFactors, index, factorRankingLogic) {
		if (!agreementFactors[index].outcome) {
			// If the factor isn't shown don't change position
			return;
		}
		let outcome = "B";
		if (agreementFactors[index].outcome === "B") {
			outcome = "A";
		}
		const lastTimeoutHandle = timeoutHandle;
		if (lastTimeoutHandle) {
			clearTimeout(lastTimeoutHandle);
		}
		switchingOutcome = true;
		setTimeout(() => {
			agreement.changeMillis = 1000;
			factorRankingLogic.setOutcome(
				agreementFactors,
				index,
				outcome
				// , true
			);
			timeoutHandle = setTimeout(() => {
				switchingOutcome = false;
			}, 1000);
			onrankingAdjusted?.();
		});
	}

	function onFactorMove(
		event // event
	) {
		const touches = event.touches;

		// Only perform rotation if one touch or mouse (e.g. still scale with pinch and zoom)
		if (!TOUCH || !(touches && touches.length > 1)) {
			try {
				event.preventDefault();
			} catch (error) {
				// console.log(error)
			}

			let position = touches ? touches[0] : event;
			// Get touch co-ords
			// ev.originalEvent.touches ? ev = ev.originalEvent.touches[0] : null
			// dispatch 'move-viewport' event
			positionMovingAgreementFactor(movingAgreementFactor, position);

			// If the user is swiping in the factor
			if (
				movingAgreementFactor.moving &&
				!movingAgreementFactor.outcome &&
				movingAgreementFactor.originalX - movingAgreementFactor.pageX <
					-10
			) {
				stopMoveEventListening();
				// movingAgreementFactor
				// stopping movement before adding factor to get the slide in animation
				stopAgreementFactorMovement(movingAgreementFactor);
				setTimeout(() => {
					// Proactively swipe in the factor
					const [factorRankingLogic, logicUtils] = container.getSync(
						FactorRankingLogic,
						LogicUtils
					);
					handleMoveEffects(
						factorRankingLogic.addOrRemoveAFactor(
							agreementFactors,
							movingAgreementFactor.index,
							"add",
							agreement,
							logicUtils
						)
					);
				});
			}
			incMovingDelta();
		}
	}

	function handleMoveEffects(results) {
		const { numMoved, placeholder } = results;
		if (numMoved) {
			pauseRotation();
			factorOrderDelta = factorOrderDelta + 1;
			onrankingAdjusted?.();
		}
		if (placeholder) {
			scheduleFactorPlaceholder();
		}
	}

	function stopMoveEventListening() {
	// movingAgreementFactor
		document.removeEventListener("mousemove", onFactorMove);
		document.removeEventListener("touchmove", onFactorMove);
	}

	function stopAgreementFactorMovement(movingAgreementFactor) {
		if (movingAgreementFactor) {
			movingAgreementFactor.moving = false;
		}
		movingAgreementFactor = null;
		incMovingDelta();
	}

	function positionMovingAgreementFactor(movingAgreementFactor, position) {
		movingAgreementFactor.pageX = position.pageX;
		movingAgreementFactor.pageY = position.pageY;
	}

	function scheduleFactorPlaceholder() {
		removeCount = removeCount + 1;
		setTimeout(() => {
			removeDoneCount = removeDoneCount + 1;
		}, 701);
	}

	function pauseRotation() {
		showTransition = false;
		setTimeout(() => {
			showTransition = true;
		}, 701);
	}

	function incMovingDelta() {
		movingAgreementFactorDelta = movingAgreementFactorDelta + 1;
		setTimeout(() => {
			movingAgreementFactorDelta = movingAgreementFactorDelta + 1;
			setTimeout(() => {
				movingAgreementFactorDelta = movingAgreementFactorDelta + 1;
			}, 100);
		});
	}
</script>

{#if idea}
	{#each agreementFactors as agreementFactor, i}
		<section
			onmousedown={(event) => moveStart(agreementFactors, i, event)}
			onmouseup={(event) =>
				moveEnd(
					movingAgreementFactor,
					agreement,
					agreementFactors,
					i,
					event
				)}
			ontouchend={(event) =>
				moveEnd(
					movingAgreementFactor,
					agreement,
					agreementFactors,
					i,
					event
				)}
			ontouchstart={(event) => touchStart(agreementFactors, i, event)}
			id="factorPlace_{i}"
		>
			{#if showPosition(agreementFactor, movingAgreementFactor, movingAgreementFactorDelta)}
				<figure
					class="factorFigure"
					class:isB={isB(agreementFactor, delta)}
					class:removingFactor={removeCount &&
						!agreementFactor.outcome}
					id="factor_{i}"
					style="{factorPosition(
						$windowWidth,
						agreementFactor,
						movingAgreementFactorDelta
					)}
					 {transitionStyle(showTransition)}"
					in:fly={{ x: flyX(agreementFactor), duration: 700 }}
				>
					<!--
			transition:fade
			-->
					{#if sideMatch(agreementFactor, "A", switchingOutcome)}
						<var
							class="factor A
					{factorHighlight(
								movingAgreementFactor,
								i,
								movingAgreementFactorDelta,
								container
							)}"
							style="background-color: #{getColor(
								idea.factors[agreementFactor.factorNumber]
									.color,
								container,
								delta
							)};"
						>
							<!--
				id="factor_{i}_A"
				-->
							<!-- TODO: if the default starting value becomes dynamic change this -->
							<header>
								<CharacterButton
									character="A"
									fontSize={20}
									fontX={12}
									fontY={19}
									size={24}
									strokeWidth={1}
									styles="left: 1px; position: absolute; top: -1px;"
								/>
								{idea.factors[agreementFactor.factorNumber]
									.name}
								{#if canRemove(agreementFactors, i, delta)}
									<MoveButton
										onselectStart={(event) =>
											addOrRemove("remove", event)}
										classes="right"
										size={19}
										styles="left: 24px; position: absolute; top: -1.5px"
									/>
								{/if}
								{#if i}
									<MoveButton
										onselectStart={(event) =>
											upStart(i, event, container)}
										classes="up"
										size={19}
										styles="right: 24px; position: absolute; top: -2px"
									/>
								{/if}
							</header>
							<p
								style="color: #{getTextColor(
									idea.factors[agreementFactor.factorNumber]
										.color,
									container,
									delta
								)};"
							>
								{idea.factors[agreementFactor.factorNumber]
									.positions.A.name}
							</p>
						</var>
					{/if}
					{#if sideMatch(agreementFactor, "B", switchingOutcome)}
						<!--
		transition:fly='{x: -200, duration: 1000}'
		-->
						<var
							class="factor B
					{factorHighlight(movingAgreementFactor, i, movingAgreementFactorDelta)}"
							style="background-color: #{getColor(
								idea.factors[agreementFactor.factorNumber]
									.color,
								container,
								delta
							)};"
						>
							<!--
				id="factor_{i}_B"
				-->
							<header>
								{idea.factors[agreementFactor.factorNumber]
									.name}
								<CharacterButton
									character="B"
									fontSize={20}
									fontX={12}
									fontY={19}
									size={24}
									strokeWidth={1}
									styles="right: 1px; position: absolute; top: -1px;"
								/>
								{#if canRemove(agreementFactors, i, delta)}
									<MoveButton
										onselectStart={(event) =>
											addOrRemove("remove", event)}
										classes="right"
										size={19}
										styles="left: 24px; position: absolute; top: -1.5px"
									/>
								{/if}
								{#if i}
									<MoveButton
										onselectStart={(event) =>
											upStart(i, event, container)}
										classes="up"
										size={19}
										styles="right: 24px; position: absolute; top: -2px"
									/>
								{/if}
							</header>
							<p
								style="color: #{getTextColor(
									idea.factors[agreementFactor.factorNumber]
										.color,
									container,
									delta
								)};"
							>
								{idea.factors[agreementFactor.factorNumber]
									.positions.B.name}
							</p>
						</var>
					{/if}
				</figure>
			{:else if showPlaceholder(removeCount, removeDoneCount)}
				<var class="placeholder">
					<MoveButton
						onselectStart={(event) => addOrRemove("add", event)}
						size={19}
						styles="left: 32px; position: absolute; top: 42px"
					/>
				</var>
			{/if}
			{#if showMovePlaceholder(movingAgreementFactor, i, movingAgreementFactorDelta)}
				<figure>
					<var class="placeholder"></var>
				</figure>
			{/if}
		</section>
	{/each}
{/if}

<style>
	@media (min-width: 321px) {
		header + p {
			font-size: 1.1em;
			line-height: 1.1em;
		}
	}

	@media (min-width: 376px) {
		header + p {
			font-size: 1.15em !important;
			line-height: 1.15em !important;
		}
	}

	figure {
		height: 100px;
		position: relative;
		transform-style: preserve-3d;
	}

	/*	footer {
			bottom: 0px;
		}*/

	/*footer,*/
	header {
		color: #fff;
		background-color: #000;
		font-size: 1.2em;
		font-weight: 500;
		line-height: 1.2em;
		overflow: hidden;
		position: absolute;
		text-align: center;
		text-overflow: ellipsis;
		width: 100%;
		white-space: nowrap;
	}

	header {
		top: 0px;
	}

	header + p {
		margin: 0px;
		padding: 3px;
		position: absolute;
		top: 21px;
		word-break: break-word;
	}

	p {
		color: #000;
		font-size: 1.05em;
		line-height: 1.05em;
		margin-block-start: 0em;
		margin-block-end: 0em;
		padding: 7px 5px 14px 5px;
	}

	section {
		height: 100px;
	}

	var {
		border-radius: 5px;
		height: 100px;
		position: absolute;
		width: 100%;
	}

	var.factor {
		border: 3px solid gray;
	}

	var.factor.highlighted {
		border: 5px dashed red;
	}

	var.placeholder {
		border: 1px dotted gray;
	}

	.A {
		transform: translateZ(5px);
	}

	.B {
		transform: rotateY(180deg) translateZ(5px);
	}

	.factorFigure {
		left: 0px;
	}

	.isB {
		transform: rotateY(180deg);
	}

	.removingFactor {
		opacity: 0;
		left: -400px;
	}
</style>
