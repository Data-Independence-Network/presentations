<script lang="ts">
	import type { INavList, IUiIdea } from "@votecube/model";
	import type { ILogicUtils } from "@votecube/vc-logic";

		import RightButton from "@votecube/ui-controls/src/button/RightButton.svelte";
	import LinkIcon from "@votecube/ui-controls/src/icon/LinkIcon.svelte";
	import TargetIcon from "@votecube/ui-controls/src/icon/TargetIcon.svelte";

	interface Props {
		onclick?: (event: MouseEvent) => void;
		childMode?: boolean;
		classes?: string;
		logicUtils: ILogicUtils;
		mode: any;
		navList: INavList;
		idea: IUiIdea;
		onmoveDownHierarchy?: () => void;
	}

	let {
		childMode = true,
		classes = "",
		logicUtils,
		mode,
		navList,
		idea,
		onclick,
		onmoveDownHierarchy
	}: Props = $props();

	let showLink = $derived(idea.repository.GUID === navList.idea.repository.GUID && !navList.isTarget);

	let showTarget = $derived(idea.repository.GUID === navList.idea.repository.GUID && navList.isTarget);
</script>

<!--
<div
		class="parentContainer"
></div>
-->
<div class="details {classes}" {onclick}>
	{#if showLink}
		<LinkIcon styles="left: 5px; position: absolute; top: 10px;" />
	{:else if showTarget}
		<TargetIcon styles="left: 13px; position: absolute; top: 3px;" />
	{/if}
	<div class="icon">
		<figure>
			<div
				class="surface s1"
				style="background-color: #{logicUtils.getColor(
					idea.factors[1].color
				)};"
			></div>
			<div
				class="surface s2"
				style="background-color: #{logicUtils.getColor(
					idea.factors[3].color
				)};"
			></div>
			<div
				class="surface s5"
				style="background-color: #{logicUtils.getColor(
					idea.factors[2].color
				)};"
			></div>
		</figure>
	</div>
	<div class="description">
		<div class="ideaName" class:outcomes={mode === "outcomes"}>
			{idea.name}
		</div>

		{#if mode === "factors"}
			<var>
				{idea.factors[1].name}
			</var>
			<var>
				{idea.factors[2].name}
			</var>
			<var>
				{idea.factors[3].name}
			</var>
		{:else}
			<section>
				<var class="A">
					{idea.outcomes.A.name}
				</var>
				<var class="B">
					{idea.outcomes.B.name}
				</var>
			</section>
		{/if}
	</div>
</div>
{#if childMode}
	<nav class={classes}>
		<RightButton
			onclick={onmoveDownHierarchy}
			size={25}
			styles="transform: rotate(90deg);"
		/>
	</nav>
{/if}

<style>
	figure {
		border-radius: 3px;
		height: 21px;
		margin: auto;
		position: relative;
		transform: rotateX(-45deg) rotateY(45deg);
		transform-style: preserve-3d;
		width: 21px;
	}

	section {
		display: flex;
		text-align: center;
		width: 100%;
	}

	section > var {
		flex-basis: 100%;
	}

	section > var:first-child {
		padding-right: 5px;
	}

	section > var:last-child {
		padding-left: 5px;
	}

	div > var {
		display: block;
		padding-left: 15px;
	}

	nav {
		text-align: center;
		transition: height 3s;
	}

	nav.closed {
		height: 0px;
		overflow: hidden;
	}

	nav.closing {
		height: 25px;
		overflow: hidden;
	}

	.description {
		padding: 9px;
		flex-grow: 1; /* Set the middle element to grow and stretch */
	}

	.details {
		align-items: center;
		display: flex;
		position: relative;
		transition: height 1s;
	}

	.details.closed {
		height: 0px;
		overflow: hidden;
	}

	.details.closing {
		height: 100px;
		overflow: hidden;
	}

	.icon {
		perspective: 350px;
		perspective-origin: 50% 80px;
		width: 45px;
	}

	.ideaName {
		color: black;
		font-weight: 500;
		overflow: hidden;
	}

	.outcomes {
		text-align: center;
	}

	.s1 {
		transform: rotateX(90deg) translateZ(12px);
	}

	.s2 {
		transform: translateZ(12px);
	}

	.s5 {
		transform: rotateY(90deg) translateZ(-12px);
	}

	.surface {
		position: absolute;
		height: 22.5px;
		width: 22.5px;
		border-radius: 3px;
		border: 2px groove gray;
	}
</style>
