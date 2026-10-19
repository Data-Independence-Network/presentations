<script lang="ts">
	import BellCurveButton from "@votecube/ui-controls/src/button/BellCurveButton.svelte";
	import BuildButton from "@votecube/ui-controls/src/button/BuildButton.svelte";
	import DescribedButton from "@votecube/ui-controls/src/button/DescribedButton.svelte";
	import EditButton from "@votecube/ui-controls/src/button/EditButton.svelte";
	import OpinionButton from "@votecube/ui-controls/src/button/OpinionButton.svelte";
	import OutcomeButton from "@votecube/ui-controls/src/button/OutcomeButton.svelte";
	import RankingsButton from "@votecube/ui-controls/src/button/RankingsButton.svelte";
	import ShieldButton from "@votecube/ui-controls/src/button/ShieldButton.svelte";
	import UndescribedButton from "@votecube/ui-controls/src/button/UndescribedButton.svelte";
	import IdeaTreeButton from "@votecube/ui-controls/src/button/IdeaTreeButton.svelte";
	import AgreementButton from "@votecube/ui-controls/src/button/AgreementButton.svelte";
	import Fab from "@votecube/ui-components/src/Fab.svelte";

	interface Props {
		mode: string;
		onageSuitability?: () => void;
		onbuild?: () => void;
		onconfirmAgreement?: () => void;
		onderivations?: () => void;
		onedit?: () => void;
		onopinions?: () => void;
		onoutcomes?: () => void;
		onrankings?: () => void;
		onstats?: () => void;
	}

	let { mode, ...handlers }: Props = $props();

	let opened = $state(false);

	let previewMode = $derived(mode === "build" || mode === "alter");
	let editIdeaLabel =
		$derived(mode === "build" ? "Edit Idea" : "Alter Idea");

	type Action =
		| "ageSuitability"
		| "build"
		| "confirmAgreement"
		| "derivations"
		| "edit"
		| "opinions"
		| "outcomes"
		| "rankings"
		| "stats";

	function run(action: Action) {
		opened = false;
		handlers[`on${action}`]?.();
	}
</script>

<Fab bind:opened>
	{#snippet up4()}
		<div class="up">
			<DescribedButton
				bind:opened
				label="Set Age Suitability"
				onclick={() => run("ageSuitability")}
			>
				<ShieldButton />
			</DescribedButton>
		</div>
	{/snippet}
	{#snippet up3()}
		<div class="up">
			<DescribedButton
				bind:opened
				label="View Outcomes"
				onclick={() => run("outcomes")}
			>
				<OutcomeButton />
			</DescribedButton>
		</div>
	{/snippet}
	{#snippet up2()}
		<div class="up">
			<DescribedButton
				bind:opened
				label={editIdeaLabel}
				onclick={() => run("edit")}
			>
				<EditButton />
			</DescribedButton>
		</div>
	{/snippet}
	{#snippet up1()}
		<div class="up">
			<DescribedButton
				bind:opened
				label={previewMode ? "Define Idea" : "Solve"}
				onclick={() => run(previewMode ? "build" : "confirmAgreement")}
			>
				{#if previewMode}
					<BuildButton />
				{:else}
					<AgreementButton />
				{/if}
			</DescribedButton>
		</div>
	{/snippet}
	{#snippet left1()}
		<div class="left">
			<UndescribedButton>
				<IdeaTreeButton
					onclick={() => run("derivations")}
					styles="position: absolute; right: 0px; top: 0px;"
				/>
			</UndescribedButton>
		</div>
	{/snippet}
	{#snippet left2()}
		<div class="left">
			<UndescribedButton>
				<OpinionButton
					onclick={() => run("opinions")}
					styles="position: absolute; right: 0px; top: 0px;"
				/>
			</UndescribedButton>
		</div>
	{/snippet}
	{#snippet left3()}
		<div class="left">
			<UndescribedButton>
				<BellCurveButton
					onclick={() => run("stats")}
					styles="position: absolute; right: 0px; top: 0px;"
				/>
			</UndescribedButton>
		</div>
	{/snippet}
	{#snippet left4()}
		<div class="left">
			<UndescribedButton>
				<RankingsButton
					onclick={() => run("rankings")}
					styles="position: absolute; right: 0px; top: 0px;"
				/>
			</UndescribedButton>
		</div>
	{/snippet}
</Fab>

<style>
	div.up {
		position: absolute;
		right: 10px;
		top: 5px;
	}

	div.left {
		position: absolute;
		right: 10px;
		top: 5px;
	}
</style>
