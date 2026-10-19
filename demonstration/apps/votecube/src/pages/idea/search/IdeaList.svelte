<script lang="ts">
	import { DEPENDENCY_INJECTION, type IChildContainer } from "@airport/direction-indicator";
	import type { IFieldGroup, IOptionsField } from "@votecube/forms";
	import type { IUiLabel, IUiIdea } from "@votecube/model";
	import {
		navigateToPage,
		pageTitle,
		text
	} from "@votecube/ui-logic";
	import {
		type IIdeaManager,
		LogicUtils,
		IDEA_MAIN,
		IdeaManager
	} from "@votecube/vc-logic";
	import { onDestroy, onMount } from "svelte";
	import { get } from "svelte/store";
	import { fade } from "svelte/transition";
	import CancelButton from "@votecube/ui-controls/src/button/CancelButton.svelte";
	import AutoComplete from "@votecube/ui-controls/src/field/AutoComplete.svelte";
	// import VirtualList from '@sveltejs/svelte-virtual-list';
	import ActionPopover from "@votecube/ui-controls/src/shell/ActionPopover.svelte";
	import IdeaListFab from "../../../components/idea/IdeaListFab.svelte";
	import * as forms from "../../../form/forms";
	import { loadForms } from "../../../libs/forms";
	import IdeaListItem from "./IdeaListItem.svelte";

	let action = $state<string>();
	let container: IChildContainer;
	let delta: number;
	interface IListForm extends IFieldGroup {
		fields: { category: IOptionsField };
	}

	let form: IListForm | undefined = $state.raw();
	let isOriginal: boolean;
	let isValid: boolean;
	let load = new Promise((resolve) => {
		setTimeout(() => {
			resolve(initPage());
		}, 1);
	});
	let logicUtils = $state.raw();
	let mode = $state("factors");
	let ideas: IUiIdea[] = $state.raw();

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

	onMount(async () => {
		container = DEPENDENCY_INJECTION.ui("IdeaList");
		logicUtils = await container.get(LogicUtils);
	});

	onDestroy(() => {
		forms.clearForm(form);
		DEPENDENCY_INJECTION.remove(container);
	});

	function getError(error) {
		console.log(error);

		return error;
	}

	function goTo(repositoryGUID: string) {
		navigateToPage(IDEA_MAIN, {
			mode: "agreement",
			repositoryGUID: repositoryGUID,
		});
	}

	function setAction(theAction) {
		action = theAction;
	}

	function showFactors() {
		mode = "factors";
	}

	function showOutcomes() {
		mode = "outcomes";
	}

	async function initPage() {
		const ideaManager = await container.get(IdeaManager);
		const [formFactory, originalIdeas] = await Promise.all([
			loadForms(),
			findIdeas(null, ideaManager),
		]);
		ideas = originalIdeas;

		const category = formFactory.options(
			[],
			[
				{
					id: 1,
					text: "Politics",
				},
				{
					id: 2,
					text: "Culture",
				},
				{
					id: 3,
					text: "Technology",
				},
				{
					id: 4,
					text: "Space",
				},
				{
					id: 5,
					text: "Security",
				},
			]
		);

		category.onChange((aCategory) => {
			findIdeas(aCategory, ideaManager).then(
				(theIdeas) => {
					ideas = theIdeas;
				}
			);
		});

		form = formFactory.group(
			"List",
			{
				category,
			},
			[],
			get(text).UI.Idea
		) as IListForm;

		forms.ensureForm(form, formHandle);

		pageTitle.set("Ideas");
	}

	async function findIdeas(
		category: IUiLabel,
		ideaManager: IIdeaManager
	) {
		if (!category) {
			return ideaManager.getAllIdeas();
		} else {
			return ideaManager.getIdeasForCategory(category);
		}
	}
</script>

{#await load}
	<!-- nothing to show, yet -->
{:then}
	<article transition:fade={{ duration: 700 }}>
		{#if form}
			<form>
				<AutoComplete field={form.fields.category} />
			</form>
			<table>
				{#each ideas as idea}
					<IdeaListItem
						{logicUtils}
						{mode}
						onclick={() => goTo(idea.repository.GUID)}
						{idea}
					/>
				{/each}
			</table>
			<IdeaListFab
				onfactors={showFactors}
				onsort={() => setAction("sort")}
				onfilter={() => setAction("filter")}
				onoutcomes={showOutcomes}
			/>
			<!--
	<VirtualList items={factors} component={ListItem} />
	-->
			{#if ["filter", "sort"].indexOf(action) > -1}
				<!--			contentClass="smallPadding"-->
				<ActionPopover
					customCancel={true}
					oncancel={() => setAction("none")}
				>
					{#snippet header()}
										<div>
							{#if action === "filter"}
								Coming soon - Filtering
							{:else if action === "sort"}
								Coming soon - Sorting
							{/if}
						</div>
									{/snippet}
					{#snippet content()}
										<div>
							<br />
							<h3>
								{#if action === "filter"}
									Ability filter Ideas is coming right after
									Opinions and will be released mid-Alpha.
								{:else if action === "sort"}
									Ability sort Ideas is at the same time as
									the ability to filter and will be released
									mid-Alpha.
								{/if}
								<br />
								<br />
								Please see the
								<a href="/releasePlan">Release Plan</a> for details.
							</h3>
							<br />
						</div>
									{/snippet}
					<!--
		<div slot="actions">
			<AgreementButton
					on:select="solve()"
			></AgreementButton>
		</div>
	-->
					{#snippet cancel()}
										<div>
							<CancelButton onclick={() => setAction("none")} />
						</div>
									{/snippet}
				</ActionPopover>
			{/if}
		{/if}
	</article>
{:catch error}
	{getError(error)}
{/await}

<style>
	article {
		height: initial;
		position: relative;
		max-width: 420px;
		width: 100%;
	}

	table {
		width: 100%;
	}
</style>
