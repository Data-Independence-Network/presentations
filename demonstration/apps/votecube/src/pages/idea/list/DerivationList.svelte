<script lang="ts">
	import { DEPENDENCY_INJECTION, type IChildContainer } from "@airport/direction-indicator";
	import {
		navigateToPage,
		pageTitle,
		routeParams,
		text
	} from "@votecube/ui-logic";
	import {
		LogicUtils,
		IDEA_MAIN,
		IdeaManager,
		RELEASE_PLAN,
		type ILogicUtils,
	} from "@votecube/vc-logic";
	import { onDestroy, onMount } from "svelte";
	import { get } from "svelte/store";
	import { fade } from "svelte/transition";
	import type { INavList, IUiIdea } from "@votecube/model";
	import CancelButton from "@votecube/ui-controls/src/button/CancelButton.svelte";
	import RightButton from "@votecube/ui-controls/src/button/RightButton.svelte";
	// import VirtualList from '@sveltejs/svelte-virtual-list';
	import ActionPopover from "@votecube/ui-controls/src/shell/ActionPopover.svelte";
	import IdeaListFab from "../../../components/idea/idea/IdeaListFab.svelte";
	import * as forms from "../../../form/forms";
	import { loadForms } from "../../../libs/forms";
	import IdeaListItem from "./IdeaListItem.svelte";
	import type { IFieldGroup } from "@votecube/forms";

	let action = $state<string>();
	let leafIdeas: IUiIdea[] = $state.raw();
	let container: IChildContainer;
	let currentIdea: IUiIdea = $state.raw();
	let delta = 0;
	let error = "";
	let form: IFieldGroup = $state.raw();
	let isOriginal = true;
	let isValid = false;
	let logicUtils: ILogicUtils = $state.raw();
	let mode = $state("factors");
	let navList: INavList = $state.raw();
	let switching: 0 | 1 | 2 = $state();
	let switchedToRepositoryUuId: string = $state();

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
		container = DEPENDENCY_INJECTION.ui("DerivationList");

		const { repositoryGUID } = get(routeParams);
		let results = await getListingsAndOther(
			repositoryGUID,
			loadForms(),
			container
		);

		let stemIdea = results[0];
		leafIdeas = results[1];
		let formFactory = results[2];

		form = formFactory.group(
			"List",
			{
				search: formFactory.field([]),
			},
			[],
			get(text).UI.Idea
		);

		navList = {
			direction: 0,
			isTarget: true,
			previous: null,
			idea: stemIdea,
		};

		logicUtils = await container.get(LogicUtils);

		forms.ensureForm(form, formHandle);

		pageTitle.set("Ideas");
	});

	onDestroy(() => {
		forms.clearForm(form);
	});

	function switchToClasses(
		switching: 0 | 1 | 2,
		switchedToRepositoryUuId: string,
		currentIdea: IUiIdea
	) {
		if (!switching) {
			return "";
		}
		const switchedToItem =
			switchedToRepositoryUuId === currentIdea.repository.GUID;
		if (switching === 1) {
			return switchedToItem ? "" : "closing";
		} else if (switching === 2) {
			return switchedToItem ? "" : "closed";
		}
	}

	function goTo(repositoryGUID) {
		navigateToPage(IDEA_MAIN, {
			mode: "agreement",
			repositoryGUID: repositoryGUID,
		});
	}

	function goToReleasePlan() {
		navigateToPage(RELEASE_PLAN);
	}

	function moveDownHierarchy(leafIdeas, moveToIdea, navList) {
		doMoveDown(moveToIdea, navList, leafIdeas.length);
	}

	function moveUpHierarchy(leafIdeas, moveToIdea, navList) {
		doMoveUp(moveToIdea, navList, leafIdeas.length);
	}

	function setAction(theAction) {
		action = theAction;
		error = "";
	}

	function showFactors() {
		mode = "factors";
	}

	function showOutcomes() {
		mode = "outcomes";
	}

	async function getListingsAndOther(
		repositoryGUID: string,
		otherPromise: Promise<any>,
		container
	) {
		const ideaManager = await container.get(IdeaManager);
		let [stemIdea, leafIdeas, otherResult] = await Promise.all([
			ideaManager.getIdea(repositoryGUID),
			ideaManager.getLeafIdeas(repositoryGUID),
			otherPromise,
		]);

		return [stemIdea, leafIdeas, otherResult];
	}

	function doMoveDown(
		moveToIdea: IUiIdea,
		navList: INavList,
		numLeafs: number
	) {
		switching = 1;
		switchedToRepositoryUuId = moveToIdea.repository.GUID;

		setTimeout(() => {
			switching = 2;
			getDataAndMoveDown(moveToIdea, navList, numLeafs).then();
		}, 10);
	}

	function doMoveUp(
		moveToIdea: IUiIdea,
		navList: INavList,
		numLeafs: number
	) {
		switching = 1;
		switchedToRepositoryUuId = moveToIdea.repository.GUID;

		setTimeout(() => {
			switching = 2;
			getDataAndMoveUp(moveToIdea, navList, numLeafs).then();
		}, 10);
	}

	async function getDataAndMoveDown(
		moveToIdea: IUiIdea,
		navList: INavList,
		numLeafs: number
	) {
		const { stemIdea, leafIdeas } = await getSwitchData(
			moveToIdea.repository.GUID,
			numLeafs
		);

		if (
			[0, 1].indexOf(navList.direction) > -1 &&
			navList.idea.repository.GUID !== moveToIdea.repository.GUID
		) {
			navList = {
				direction: 1,
				isTarget: false,
				previous: navList,
				idea: moveToIdea,
			};
		} else if (navList.direction === -1) {
			if (
				navList.idea.repository.GUID ===
				moveToIdea.repository.GUID
			) {
				navList = navList.previous;
			} else {
				navList = {
					direction: 1,
					isTarget: false,
					previous: navList,
					idea: moveToIdea,
				};
			}
		}

		finishSwitching(leafIdeas, stemIdea, navList);
	}

	async function getDataAndMoveUp(
		moveToIdea: IUiIdea,
		navList: INavList,
		numLeafs: number
	) {
		const { stemIdea, leafIdeas } = await getSwitchData(
			moveToIdea.repository.GUID,
			numLeafs
		);

		if (navList.direction === -1) {
			navList = {
				direction: -1,
				isTarget: false,
				previous: navList,
				idea: stemIdea,
			};
		} else if (
			navList.direction === 0 &&
			moveToIdea.repository.GUID !== navList.idea.repository.GUID
		) {
			navList = {
				direction: -1,
				isTarget: false,
				previous: navList,
				idea: moveToIdea,
			};
		} else if (navList.direction === 1) {
			navList = navList.previous;
		}

		finishSwitching(leafIdeas, stemIdea, navList);
	}

	async function getSwitchData(repositoryGUID: string, numLeafs: number) {
		let [stemIdea, leafIdeas, _] = await getListingsAndOther(
			repositoryGUID,
			new Promise<void>((resolve) => {
				setTimeout(
					() => {
						resolve();
					},
					numLeafs ? 1500 : 0
				);
			}),
			container
		);

		return {
			stemIdea,
			leafIdeas,
		};
	}

	function finishSwitching(
		newLeafIdeas: IUiIdea[],
		newCurrentIdea: IUiIdea,
		newNavList: INavList
	) {
		leafIdeas = newLeafIdeas;
		currentIdea = newCurrentIdea;
		navList = newNavList;

		setTimeout(() => {
			switching = 1;
			setTimeout(
				() => {
					switching = 0;
				},
				leafIdeas.length ? 1500 : 0
			);
		}, 10);
	}
</script>

<article transition:fade={{ duration: 700 }}>
	{#if logicUtils && currentIdea && form}
		<!--
	<form>
		<Text
				field="{form.fields.search}"
		></Text>
	</form>
	-->

		<nav>
			<div>
				<RightButton
					styles="transform: rotate(-90deg);"
					onclick={() =>
						moveUpHierarchy(
							leafIdeas,
							currentIdea,
							navList
						)}
					size={25}
				/>
			</div>
			<var> &nbsp;&nbsp;Go to stem Idea </var>
		</nav>
		<IdeaListItem
			childMode={false}
			classes={switchToClasses(
				switching,
				switchedToRepositoryUuId,
				currentIdea
			)}
			{logicUtils}
			{mode}
			{navList}
			onclick={() => goTo(currentIdea.repository.GUID)}
			idea={currentIdea}
		/>
		<div class="divider"></div>
		{#each leafIdeas as idea}
			<IdeaListItem
				classes={switchToClasses(
					switching,
					switchedToRepositoryUuId,
					idea
				)}
				{logicUtils}
				{mode}
				{navList}
				onmoveDownHierarchy={() =>
					moveDownHierarchy(leafIdeas, idea, navList)}
				onclick={() => goTo(idea.repository.GUID)}
				{idea}
			/>
		{/each}
		{#if !leafIdeas.length}
			<div class="noLeafIdeas">No derived Ideas exist yet.</div>
		{/if}
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
								Ability filter Idea results is coming right
								after Opinions and will be released mid-Alpha.
							{:else if action === "sort"}
								Ability sort Idea results is at the same time
								as the ability to filter and will be released
								mid-Alpha.
							{/if}
							<br />
							<br />
							Please see the <a href="/releasePlan">Release Plan</a> for
							details.
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

<style>
	article {
		height: initial;
		max-width: 420px;
		position: relative;
		width: 100%;
	}

	nav {
		display: flex;
		text-align: center;
		width: 100%;
	}

	nav > div {
		flex-basis: 100%;
		text-align: right;
	}

	nav > var {
		color: black;
		flex-basis: 100%;
		text-align: left;
		line-height: 27px;
		vertical-align: middle;
	}

	.divider {
		height: 3px;
		background-color: black;
		margin: 2px 10px 2px 10px;
		max-width: 100%;
	}

	.noLeafIdeas {
		padding: 15px;
		text-align: center;
		width: 100%;
	}
</style>
