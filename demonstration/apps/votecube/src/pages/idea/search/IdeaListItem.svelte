<script lang="ts">
	import type { IUiIdea } from "@votecube/model";

	interface Props {
		logicUtils: any;
		mode: string;
		idea: IUiIdea;
		onclick?: (event: MouseEvent) => void;
	}

	let { logicUtils, mode, idea, onclick }: Props = $props();

</script>

<style>
	div {
		color: black;
		font-weight: 500;
		overflow: hidden;
	}

	div.outcomes {
		text-align: center;
	}

	figure {
		margin: auto;
		position: relative;
		transform: rotateX(-45deg) rotateY(45deg);
		transform-style: preserve-3d;
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

	td {
		border-top: 1px solid #ddd;
	}

	td > var {
		display: block;
		padding-left: 15px;
	}

	.description {
		border-left: none;
		padding: 9px;
		width: calc(100% - 40px);
	}

	.icon {
		height: 45px;
		perspective: 350px;
		perspective-origin: 50% 80px;
		width: 45px;
	}

	figure {
		border-radius: 3px;
		margin: auto;
		height: 21px;
		width: 21px;
	}

	.s1 {
		transform: rotateX(90deg) translateZ(12px)
	}

	.s2 {
		transform: translateZ(12px)
	}

	.s5 {
		transform: rotateY(90deg) translateZ(-12px)
	}

	.surface {
		position: absolute;
		height: 22.5px;
		width: 22.5px;
		border-radius: 3px;
		border: 2px groove gray;
	}
</style>

<tr
		{onclick}
>
	<td
			class="icon"
	>
		<figure>
			<div
					class="surface s1"
					style="background-color: #{logicUtils.getColor(idea.factors[1].color)};"
			></div>
			<div
					class="surface s2"
					style="background-color: #{logicUtils.getColor(idea.factors[3].color)};"
			></div>
			<div
					class="surface s5"
					style="background-color: #{logicUtils.getColor(idea.factors[2].color)};"
			></div>
		</figure>
	</td>
	<td
			class="description"
	>
		<div
				class:outcomes="{mode === 'outcomes'}"
		>
			{idea.name}
		</div>

		{#if mode === 'factors'}
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
			<var
					class="A"
			>
				{idea.outcomes.A.name}
			</var>
			<var
					class="B"
			>
				{idea.outcomes.B.name}
			</var>
		</section>

		{/if}
	</td>
</tr>
