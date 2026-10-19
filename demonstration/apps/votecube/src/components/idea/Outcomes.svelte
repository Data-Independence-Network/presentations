<script lang="ts">
	import type { IUiIdea } from "@votecube/model";
	import CharacterButton from "@votecube/ui-controls/src/button/CharacterButton.svelte";
	import { onMount } from "svelte";

	interface Props {
		final?: boolean;
		idea: IUiIdea;
	}

	let { final = true, idea }: Props = $props();

	let autosized = $state(false);

	onMount(() => {
		setTimeout(() => {
			final = true;
			setTimeout(() => {
				autosized = true;
			}, 1000);
		}, 10);
	});
</script>

<!--
<summary
		class="title"
>
	By:
</summary>
<div
		class="category"
>
	{idea.by}
</div>
-->
{#if idea}
	<summary class="title"> Age Groups: </summary>
	<div class="labels">
		{#each idea.ageGroups as ageGroup}
			{ageGroup.name}
		{/each}
	</div>
	<summary class="title"> Labels: </summary>
	<div class="labels">
		{#each idea.labels as label}
			{label.name}
		{/each}
	</div>
	<summary class="title"> Outcomes: </summary>
	<div>
		<section class="A">
			<header>
				<CharacterButton
					character="A"
					fontSize={20}
					fontX={12}
					fontY={19}
					size={24}
					strokeWidth={1}
				/>
			</header>
			<main class:final class:autosized>
				{idea.outcomes.A.name}
				<!--
			This is outcome A, this is what we should do if A outweighs B.
			And some reasonably wordy details below to make sure that the outcomes
			can be quite descriptive, if needed. -->
				<!-- Though they shouldn't be so long
		 as to dis-interest the user in reading wordy and boring details. -->
			</main>
		</section>
		<section class="B">
			<header>
				<CharacterButton
					character="B"
					fontSize={20}
					fontX={12}
					fontY={19}
					size={24}
					strokeWidth={1}
				/>
			</header>
			<main class:final>
				{idea.outcomes.B.name}
				<!--
			This is outcome B, this is what we should do if B outweighs A.
			And some reasonably wordy details below to make sure that the outcomes
			can be quite descriptive, if needed.
			 -->
				<!-- Though they shouldn't be so long
			as to dis-interest the user in reading wordy and boring details. -->
			</main>
		</section>
	</div>
{/if}

<style>
	@media (min-width: 321px) {
		summary.title {
			font-size: 1.6em;
		}

		section main.final {
			font-size: 11em;
		}
	}

	@media (min-width: 376px) {
		summary.title {
			font-size: 1.7em !important;
		}

		section main.final {
			font-size: 12em !important;
		}
	}

	div {
		display: flex;
		text-align: center;
		width: 100%;
	}

	header {
		margin: 10px;
	}

	main {
		font-size: 0.1em;
		height: 5px;
		position: absolute;
		/*transition: font-size 1.5s, height 1.5s, right 1.5s, transform 1.5s, width 1.5s;*/
		transition: font-size 1s, height 1s, width 1s;
		width: 5px;
		word-break: break-word;
	}

	main.final {
		font-size: 10em;
		/*transform: rotate(1800deg);*/
		width: 100%;
	}

	main.autosized {
		position: initial;
	}

	section {
		flex-basis: 100%;
		font-size: 0.1em;
		height: 190px;
		position: relative;
	}

	section.A main {
		right: 0px;
		padding-left: 5px;
		padding-right: 5px;
	}

	section.B main {
		padding-left: 5px;
		padding-right: 5px;
	}

	summary {
		font-size: 1.5em;
		font-weight: 300;
		text-align: center;
		width: 100%;
	}

	.labels {
		display: block;
		text-align: center;
		width: 100%;
		margin: 5px 0 10px 0;
	}
</style>
