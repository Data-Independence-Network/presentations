<script lang="ts">
	import type { IUiMenuItem, IUiIdea } from "@votecube/model";
	import {
		Auth,
		authChecked,
		cube,
		isDesktop,
		navigateToPage,
		noOverflow,
		routeParams,
		Routes,
		showConfirm,
		showMainMenu,
		showSignIn,
		textToast,
		user,
	} from "@votecube/ui-logic";
	import {
		ABOUT,
		APP_CONTAINER,
		CARD_CLIMATE_CHANGE,
		DERIVATION_LIST,
		FACTOR_INFO_MAIN,
		FACTOR_LIST,
		FEEDBACK,
		IDEA_FORM,
		IDEA_FORUM,
		IDEA_LIST,
		IDEA_LOCATIONS,
		IDEA_MAIN,
		IDEA_TIME_FRAME,
		RELEASE_PLAN,
		scheduleToResize,
		idea,
		ideaActions,
		startResizeInterval,
	} from "@votecube/vc-logic";
	import ActionPopover from "@votecube/ui-controls/src/shell/ActionPopover.svelte";
	import AgeSuitability from "@votecube/ui-controls/src/AgeSuitability.svelte";
	import CancelButton from "@votecube/ui-controls/src/button/CancelButton.svelte";
	import OutcomeButton from "@votecube/ui-controls/src/button/OutcomeButton.svelte";
	import TextToast from "@votecube/ui-controls/src/shell/TextToast.svelte";
	import { onMount, type Component } from "svelte";
	import { get } from "svelte/store";
	import { loadUi } from "./libs/text/ui";
	import Menu from "./shell/menu/Menu.svelte";
	import TopBar from "./shell/top/TopBar.svelte";
	import SignIn from "./shell/SignIn.svelte";
	import AboutUs from "./pages/AboutUs.svelte";
	import FactorMain from "./pages/factor/info/FactorMain.svelte";
	import Feedback from "./pages/feedback/FeedbackForm.svelte";
	import IdeaForm from "./pages/idea/info/IdeaForm.svelte";
	import IdeaForum from "./pages/idea/info/IdeaForum.svelte";
	import IdeaInfoMain from "./pages/idea/info/IdeaMain.svelte";
	import IdeaList from "./pages/idea/search/IdeaList.svelte";
	import DerivationList from "./pages/idea/list/DerivationList.svelte";
	import ReleasePlan from "./pages/ReleasePlan.svelte";
	import Outcomes from "./components/idea/Outcomes.svelte";
	import IdeaFab from "./components/idea/IdeaFab.svelte";

	let action: string | undefined = $state();
	let ageSuitabilityVisible = $state(false);
	let buildAfterAgeSuitability = false;
	let outcomesVisible = $state(false);
	let PageComp: Component | null = $state.raw(null);
	let showTextToast = $state(false);

	let mode = $derived($routeParams ? $routeParams.mode : "none");
	let uiIdea: IUiIdea | null = $derived($idea);
	let inIdea = $derived(!!uiIdea);
	let activeClass = $derived($showMainMenu ? "active" : "");
	let showLogo = $derived($isDesktop || $showMainMenu);

	$effect(() => {
		if (inIdea && $ideaActions.showOutcomes) {
			ideaActions.set({});
			showOutcomes(true);
		}
	});

	function clickMain() {
		if (get(showMainMenu)) {
			toggleMenu();
		}
	}

	function closeSignIn() {
		showSignIn.set(false);
	}

	function handleResize() {
		scheduleToResize();
	}

	function selectMenu(_menuItem: IUiMenuItem) {
		showMainMenu.toggle();
	}

	function toggleMenu() {
		if (get(showConfirm)) {
			return;
		}
		showMainMenu.toggle();
	}

	function setPageComp(pageComp: Component) {
		PageComp = pageComp;
	}

	function showAgeSuitability(newAgeSuitabilityVisible: boolean) {
		ageSuitabilityVisible = newAgeSuitabilityVisible;
	}

	function showOutcomes(newOutcomesVisible: boolean) {
		outcomesVisible = newOutcomesVisible;
	}

	function cancelAgeSuitability() {
		buildAfterAgeSuitability = false;
		showAgeSuitability(false);
	}

	function onAgeSuitabilitySave() {
		showAgeSuitability(false);
		ideaActions.set({
			ageSuitabilitySave: true,
			checkBuild: buildAfterAgeSuitability,
		});
		buildAfterAgeSuitability = false;
	}

	function goToDerivations() {
		const { repositoryGUID } = get(routeParams);
		navigateToPage(DERIVATION_LIST, { repositoryGUID });
	}

	function confirmAgreement() {
		ideaActions.set({
			confirmAgreement: true,
		});
	}

	function alter() {
		ideaActions.set({
			ideaAlter: true,
		});
	}

	function goToOpinions() {
		navigateToPage(IDEA_FORUM, get(routeParams));
	}

	function setAction(newAction: string) {
		action = newAction;
	}

	function checkBuild() {
		// Age suitability is set when the repository is created, so it has
		// to be chosen before a new idea is built
		if (uiIdea && !uiIdea.repository?.GUID) {
			buildAfterAgeSuitability = true;
			showAgeSuitability(true);
			return;
		}
		ideaActions.set({
			checkBuild: true,
		});
	}

	function closeConfirm() {
		setAction("none");
	}

	async function initApp() {
		const routes = await APP_CONTAINER.get(Routes);

		const pageMap = {
			[ABOUT]: AboutUs,
			[CARD_CLIMATE_CHANGE]: IdeaInfoMain,
			[FACTOR_INFO_MAIN]: FactorMain,
			[FEEDBACK]: Feedback,
			[IDEA_FORM]: IdeaForm,
			[IDEA_FORUM]: IdeaForum,
			[IDEA_LIST]: IdeaList,
			[IDEA_MAIN]: IdeaInfoMain,
			[RELEASE_PLAN]: ReleasePlan,
			[DERIVATION_LIST]: DerivationList,
		};

		routes.configPages([
			[ABOUT, false, false],
			[CARD_CLIMATE_CHANGE, false, false],
			[FACTOR_INFO_MAIN, false, false],
			[FACTOR_LIST, false, true],
			[FEEDBACK, false, false],
			[IDEA_FORM, true, false],
			[IDEA_FORUM, true, false],
			[IDEA_LIST, false, true],
			[IDEA_LOCATIONS, true, false],
			[IDEA_MAIN, false, true],
			[IDEA_TIME_FRAME, true, false],
			[RELEASE_PLAN, false, false],
			[DERIVATION_LIST, false, true],
		]);

		routes.setupRoutes(pageMap, setPageComp, ABOUT, IDEA_LIST);

		startResizeInterval();

		const [auth] = await Promise.all([
			APP_CONTAINER.get(Auth),
			loadUi("en-us"),
		]);
		user.set(auth.getUser());

		const userChanges$ = await auth.reactToUser();

		userChanges$.subscribe((authUser) => {
			user.set(authUser);
			authChecked.set(true);
		});
	}

	onMount(() => {
		const textToastUnsubscribe = textToast.subscribe((value) => {
			showTextToast = true;
			setTimeout(() => {
				showTextToast = false;
			}, value.seconds * 1000);
		});

		initApp();

		return textToastUnsubscribe;
	});
</script>

<svelte:window onresize={handleResize} />
<article
	class="{activeClass} wrapper"
	class:noOverflow={$noOverflow}
	class:cube={$cube}
	id="layout"
>
	<!-- Menu toggle -->
	<TopBar />
	{#if showLogo}
		<div>TrumentBox</div>
	{/if}
	
	<nav class="menu-link {activeClass}" id="menuLink" onclick={toggleMenu}>
		<!--Hamburger icon -->
		<span></span>
	</nav>
	<Menu active={$showMainMenu} onselected={selectMenu} />
	<section id="main" onclick={clickMain}>
		{#if PageComp}
			<PageComp />
		{/if}
	</section>
</article>
{#if showTextToast}
	<TextToast text={$textToast.text} />
{/if}
{#if $showSignIn}
	<SignIn onclosed={closeSignIn} />
{/if}
{#if inIdea}
	<IdeaFab
		onageSuitability={() => showAgeSuitability(true)}
		onbuild={checkBuild}
		onconfirmAgreement={confirmAgreement}
		onedit={() => alter()}
		onoutcomes={() => showOutcomes(true)}
		onopinions={goToOpinions}
		onrankings={() => setAction("rankings")}
		onstats={() => setAction("stats")}
		onderivations={goToDerivations}
		{mode}
	/>
	{#if ageSuitabilityVisible}
		<AgeSuitability
			oncancel={cancelAgeSuitability}
			onsave={onAgeSuitabilitySave}
			idea={uiIdea}
		/>
	{/if}
	{#if outcomesVisible}
		<ActionPopover customCancel={true} infoOnly={true}>
			{#snippet header()}
						<div>
					{$idea.name}
				</div>
					{/snippet}
			{#snippet content()}
						<div>
					<Outcomes idea={$idea} />
				</div>
					{/snippet}
			{#snippet cancel()}
						<div>
					<OutcomeButton onclick={() => showOutcomes(false)} />
				</div>
					{/snippet}
		</ActionPopover>
	{/if}
	{#if ["stats", "rankings"].indexOf(action) > -1}
		<!--			contentClass="smallPadding"-->
		<ActionPopover customCancel={true} oncancel={closeConfirm}>
			{#snippet header()}
						<div>
					{#if action === "rankings"}
						Coming soon - Idea Rankings
					{:else if action === "stats"}
						Coming in Beta - Idea Statistics
					{/if}
				</div>
					{/snippet}
			{#snippet content()}
						<div>
					<!--
				<div>
					{idea.name}
				</div>
				-->
					<!--
				<AgreementComponentSummary
						bind:delta
						bind:idea
						verticalLayout="Y"
						bind:agreement
						maxBarSize="{120}"
						mode="confirm"
						agreementFactors="{agreementFactors}"
				></AgreementComponentSummary>
				-->
					<br />
					<h3>
						{#if action === "rankings"}
							We'll start providing basic Idea Rankings at the
							end of Alpha testing period. More will be added in
							subsequent releases.
						{:else if action === "stats"}
							Basic Idea Statistics will be available in Beta
							release. More advanced stats will be provided in version
							1.
						{/if}
						<br />
						<br />
						Please see the <a href="/releasePlan">Release Plan</a> for details.
					</h3>
					<br />
				</div>
					{/snippet}
			<!--
		<div slot="actions">
			<AgreementButton
					on:select="submitAgreement()"
			></AgreementButton>
		</div>
-->
			{#snippet cancel()}
						<div>
					<CancelButton onclick={closeConfirm} />
				</div>
					{/snippet}
		</ActionPopover>
	{/if}
{/if}
<style>
	@media (min-width: 62em) {
		#main {
			margin: 1em 23%;
			width: 54%;
		}
	}

	.logo {
		color: white;
		background: #191818;
		height: 44px;
		line-height: 44px;
		position: fixed;
		text-align: center;
		top: 0px;
		vertical-align: middle;
		width: 160px;
		z-index: 1200;
	}

	article {
		overflow-y: auto;
		overflow-x: hidden;
	}

	article.noOverflow {
		overflow: initial;
	}

	nav {
		z-index: 1100;
	}
</style>
