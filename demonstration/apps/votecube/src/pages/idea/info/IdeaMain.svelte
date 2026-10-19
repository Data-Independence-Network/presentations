<script lang="ts">
    import { DEPENDENCY_INJECTION, type IChildContainer } from "@airport/direction-indicator";
    import {
        CubeEventListener,
        MutationApi,
        type Outcome_Ordinal,
        type PercentChange,
        type PositionPercent,
    } from "@votecube/cube-logic";
    import type {
        ITweenAgreement,
        ITweenAgreementFactor,
        IUiIdea,
        IUiAgreement,
        IUiAgreementFactor,
    } from "@votecube/model";
    import {
        cardMove,
        cube,
        mode,
        navigateToPage,
        noOverflow,
        routeParams,
        user,
    } from "@votecube/ui-logic";
    import {
        CubeLogic,
        DetailedCubeLogic,
        LogicUtils,
        IDEA_FORM,
        IDEA_LIST,
        IdeaMainLogic,
        IdeaManager,
        setResizeCllBck,
        AgreementManager,
        type ILogicUtils,
        ideaActions,
        idea as ideaStore,
        IDEA_MAIN,
    } from "@votecube/vc-logic";
    import { onDestroy, onMount, untrack } from "svelte";
    import { get } from "svelte/store";
    import ActionPopover from "@votecube/ui-controls/src/shell/ActionPopover.svelte";
    import AlignmentButton from "@votecube/ui-controls/src/button/AlignmentButton.svelte";
    import BuildButton from "@votecube/ui-controls/src/button/BuildButton.svelte";
    import CancelButton from "@votecube/ui-controls/src/button/CancelButton.svelte";
    import ManualOverwriteButton from "@votecube/ui-controls/src/button/ManualOverwriteButton.svelte";
    import PercentPicker from "@votecube/ui-components/src/PercentPicker.svelte";
    import SaveButton from "@votecube/ui-controls/src/button/SaveButton.svelte";
    import DetailedCube from "../../../components/idea/DetailedCube.svelte";
    import FactorRanking from "../../../components/idea/FactorRanking.svelte";
    import AgreementComponentGraph from "../../../components/agreement/AgreementComponentGraph.svelte";

    import { getBlankTweenAgreement, setupCubeView } from "../../../database";
    // import AgreementComponentSummary from '../../../components/agreement/AgreementComponentSummary.html'

    let action: string | undefined = $state();
    let beforeCardView = false;
    let beforeCubeView = $state(false);
    let confirm: boolean;
    let cubeSideMap = $state.raw();
    let cubeSides = $state.raw();
    let cubeView = $state(false);

    const container: IChildContainer = DEPENDENCY_INJECTION.ui("IdeaMain");
    let currentAgreement: ITweenAgreement = $state.raw(
        getBlankTweenAgreement(container)
    );
    let delta = $state(0);
    let effectiveCubeView = $derived(cubeView && !beforeCubeView);
    let error: unknown = $state();
    let logicUtils: ILogicUtils | undefined = $state.raw();
    let moveDelta = 0;
    let moveType: string;
    let mutationApi;
    let percentMode = $state(false);
    let idea: IUiIdea | null = $state.raw(null);
    let positionMode = $state(false);
    let previousDelta = 0;
    let saving = false;
    let savingMessage = $state();
    let theCurrentAgreementFactors: IUiAgreementFactor[] = [];
    let theAgreementFactors: IUiAgreementFactor[] = [];
    let tweenDelta = $state(0); // Only for the factor cubes
    let verticalLayout = true;
    let agreement: IUiAgreement | undefined = $state.raw();
    let zoomFactor = $state(0.65);
    let alignmentMode = $state(false);

    // let routeParamsUnsubscribe;

    onMount(async () => {
        cardMove.set(null);

        let params = get(routeParams);

        resize();
        if (window.location.href.indexOf("card/ClimateChange") > 0) {
            params.repositoryGUID = "1e62db65-807b-457f-ba34-4410013e8d39";
        }
        cube.set(true);
        noOverflow.set(true);

        const cubeLogicModule = await import("@votecube/cube-logic");

        const [cubeEventListener, cubeLogic] = await container.get(
            cubeLogicModule.CubeEventListener,
            CubeLogic
        );

        cubeLogic.setCubeViewPort(
            cubeEventListener,
            (theMutationApi) => {
                mutationApi = theMutationApi;
            },
            () => {
                /*
                if (percentMode) {
                    TODO: implement correct card and graph animations for the PercentPicker, IF NEEDED
                }
                */
                delta = delta + 1;
                // 				percentMode = false
            }
        );
        await loadIdea(
            params.hostingPlatform,
            params.repositoryGUID,
            params.mode
        );

        // routeParamsUnsubscribe = routeParams.subscribe((params) => {
        //     if (params.repositoryGUID == "unsolved") {
        //         return;
        //     }
        //     loadIdea(
        //         params.hostingPlatform,
        //         params.repositoryGUID,
        //         params.mode
        //     ).then();
        // });
    });

    async function loadIdea(
        hostingPlatform: string,
        repositoryGUID: string,
        displayMode: string
    ) {
        const cubeLogicModule = await import("@votecube/cube-logic");

        const [cubeEventListener, cubeLogic, detailedCubeLogic, theLogicUtils] =
            await container.get(
                cubeLogicModule.CubeEventListener,
                CubeLogic,
                DetailedCubeLogic,
                LogicUtils
            );

        const cubeViewResult = await setupCubeView(
            hostingPlatform,
            repositoryGUID,
            cubeLogic,
            cubeEventListener,
            container
        );

        idea = cubeViewResult.idea;
        ideaStore.set(idea);

        const cubeSideResult = await detailedCubeLogic.getCubeSides(
            idea
        );

        await doToggleView(!cubeView, cubeView);

        agreement = cubeViewResult.agreement;
        cubeSideMap = cubeSideResult.cubeSideMap;
        cubeSides = cubeSideResult.cubeSides;
        logicUtils = theLogicUtils;
        mode.set(displayMode);
    }

    onDestroy(async () => {
        setResizeCllBck(null);
        ideaStore.set(null);

        const [cubeEventListener, cubeLogic] = await container.get(
            CubeEventListener,
            CubeLogic
        );

        cubeLogic.shutDownCubeListener(cubeEventListener);
        mutationApi = null;
        cube.set(false);
        noOverflow.set(false);

        // routeParamsUnsubscribe();

        DEPENDENCY_INJECTION.remove(container);
    });

    $effect.pre(() => {
        const currentDelta = delta;
        const currentAgreementValue = agreement;

        untrack(() => {
            const deltaChanged = currentDelta !== previousDelta;
            previousDelta = currentDelta;
            if (!deltaChanged || !currentAgreementValue) {
                return;
            }
            tweenAgreement().then();
        });
    });

    async function tweenAgreement() {
        const logic = await container.get(IdeaMainLogic);

        if (logic.agreementsEqual(currentAgreement, agreement)) {
            return;
        }

        let lastAgreement = currentAgreement;
        currentAgreement = logic.copyAgreementToTween(agreement, lastAgreement);

        logic
            .scheduleFactorTweens(
                lastAgreement,
                currentAgreement,
                agreement.changeMillis ? agreement.changeMillis : 400
            )
            .subscribe((_) => {
                tweenDelta = tweenDelta + 1;
            });
    }

    function position() {
        alignmentMode = !alignmentMode;
        togglePositionMode();
    }

    // confirmAlter(event) {
    // 	confirmAlter.set(true)
    // },
    // doNotAlter() {
    // 	confirmAlter.set(false)
    // },
    function build(theUser, createNewRepository: boolean) {
        save(theUser, createNewRepository);
    }

    function closeConfirm() {
        // setCubeAdjustment(true).then(() => {
        setAction("none");
        // })
    }

    function showOutcomes() {
        ideaActions.set({
            showOutcomes: true,
        });
    }

    function setAction(newAction) {
        action = newAction;
        error = "";
    }

    function ideaAltered(newCubeSides?: any[]) {
        cubeSides = newCubeSides ?? cubeSides;
        delta = delta + 1;
        moveDelta = moveDelta + 1;
    }

    function ideaAdjusted() {
        ideaAltered();
        container.get(MutationApi).then((mutationApi) => {
            mutationApi.recompute();
        });
    }

    function move(event: {
        factorNumber: IUiAgreementFactor["factorNumber"];
        outcome: Outcome_Ordinal;
        percentChange: number;
    }) {
        percentMode = true;
        container.get(MutationApi).then((mutationApi) => {
            mutationApi.move(
                event.factorNumber,
                event.outcome,
                event.percentChange as PercentChange
            );
        });
    }

    function moveToValue(event: {
        factorNumber: IUiAgreementFactor["factorNumber"];
        value: string;
    }) {
        percentMode = true;
        container.get(MutationApi).then((mutationApi) => {
            mutationApi.moveToValue(
                event.factorNumber,
                event.value as unknown as PositionPercent
            );
        });
    }

    function togglePercentPicker() {
        let newPercentMode = !percentMode;
        setCubeAdjustment(!percentMode).then(() => {
            if (newPercentMode) {
                cubeView = true;
            }
            percentMode = newPercentMode;
        });
    }

    function togglePositionMode() {
        positionMode = !positionMode;
        cubeView = positionMode ? true : cubeView;
    }

    function toggleSurface(factorNumber) {
        let originalMoveType = moveType;
        moveType = "toggle";
        setTimeout(() => {
            container.get(MutationApi).then((mutationApi) => {
                mutationApi.toggleSurface(factorNumber);
                delta = delta + 1;
                setTimeout(() => {
                    moveType = originalMoveType;
                }, 500);
            });
        }, 1);
    }

    function toggleView(currentlyInCubeView, forCubeView) {
        doToggleView(currentlyInCubeView, forCubeView).then();
    }

    function toIdeaForm(theRouteParams) {
        navigateToPage(IDEA_FORM, theRouteParams);
    }

    function submitAgreement() {
        confirm = false;
        // doSubmitAgreement()
    }

    async function setCubeAdjustment(enableCubeAdjustment) {
        const [cubeEventListener, cubeLogic] = await container.get(
            CubeEventListener,
            CubeLogic
        );

        cubeLogic.setCubeAdjustment(cubeEventListener, enableCubeAdjustment);
    }

    async function doToggleView(currentlyInCubeView, forCubeView) {
        const cubeEventListener = await container.get(CubeEventListener);

        if (forCubeView) {
            if (!currentlyInCubeView) {
                // Animate Factor Rankings out of the view
                beforeCubeView = true;

                cubeEventListener.resumeInteraction();

                cubeView = forCubeView;
                setTimeout(() => {
                    beforeCubeView = false;
                }, 5);
            }
        } else {
            if (currentlyInCubeView) {
                // Animate Factor Rankings out of the view
                beforeCardView = true;

                cubeEventListener.suspendInteraction();

                cubeView = forCubeView;
                setTimeout(() => {
                    beforeCardView = false;
                }, 701);
            }
        }
    }

    function resize() {
        setResizeCllBck((portalHeight, windowWidth) => {
            const figureHeight = portalHeight * 0.55 + 95;

            const cubeAreaLeastFactor =
                windowWidth < figureHeight ? windowWidth : figureHeight;

            zoomFactor = (Math.sqrt(cubeAreaLeastFactor) * 3) / 100;
        });
    }

    async function save(theUser, createNewRepository: boolean) {
        savingMessage = "Saving ...";
        const ideaManager = await container.get(IdeaManager);
        try {
            action = "save";
            const repositoryIdentifier =
                await ideaManager.saveCachedIdea(
                    theUser,
                    createNewRepository
                );
            confirm = false;
            // navigateToPage(IDEA_LIST);

            navigateToPage(IDEA_MAIN, {
                mode: "agreement",
                hostingPlatform: repositoryIdentifier.source,
                repositoryGUID: repositoryIdentifier.GUID,
            });

            closeConfirm();
        } catch (theError) {
            error = theError;
            savingMessage = "Error";
        } finally {
        }
    }

    async function doSubmitAgreement() {
        // confirm = false
        const agreementManager = await container.get(AgreementManager);
        try {
            await agreementManager.saveCachedIdeaAgreement(agreement);
            confirm = false;
            navigateToPage(IDEA_LIST);
        } catch (theError) {
            error = theError;
            savingMessage = "Error";
        }
    }
    $effect(() => {
        const actions = $ideaActions;

        untrack(() => {
            if (actions.ageSuitabilitySave) {
                ideaActions.set({});
                if (saving) {
                    setTimeout(() => {
                        setAction("confirm");
                    });
                }
                delta = delta + 1;
            }
            if (actions.confirmAgreement) {
                ideaActions.set({});
                setCubeAdjustment(false).then(() => {
                    setAction("agreement");
                });
            }
            if (actions.ideaAlter) {
                ideaActions.set({});
                const params = get(routeParams);
                let mode = params.mode;
                if (mode === "agreement") {
                    mode = "alter";
                }
                navigateToPage(IDEA_FORM, {
                    ...params,
                    mode,
                });
            }
            if (actions.checkBuild) {
                ideaActions.set({});
                if (idea) {
                    const action = idea.repository.GUID
                        ? "confirmUpdate"
                        : "confirm";
                    setAction(action);
                }
            }
        });
    });

    let currentAgreementFactors = $derived.by(() => {
        void delta; // re-evaluate on every manual change signal
        if (logicUtils && currentAgreement) {
            theCurrentAgreementFactors =
                logicUtils.getAgreementFactorNodesInValueOrder(currentAgreement);
        }

        return theCurrentAgreementFactors as any as ITweenAgreementFactor[];
    });

    let horizontalLayout = $derived(!verticalLayout);
    let transformScale = $derived(
        effectiveCubeView
            ? `transform: scale(${zoomFactor}, ${zoomFactor});`
            : ""
    );
    let agreementFactors = $derived.by(() => {
        void delta; // re-evaluate on every manual change signal
        if (logicUtils && agreement) {
            theAgreementFactors =
                logicUtils.getAgreementFactorNodesInValueOrder(agreement);
        }

        return theAgreementFactors;
    });
    let previewMode = $derived(
        $routeParams.mode === "build" || $routeParams.mode === "alter"
    );
</script>

<article>
    <!-- for toggling the view -->
    <!--
    <nav>
    </nav>
    should clicking on non-buttons cause the view to change - probably not,
    the interface should be simple and orthogonal, only the buttons toggle,
    not free floating icons.

    And all buttons are always behind the Fab

    Fab has all of the actions related to that screen, system wide
    actions are in ?top menu?

    for example for the idea screens Fab shows the:

    vertical - on screen actions
    horizontal - related views

    ?but what if you have to navigate to an unrelated view?  some views
    are accessible from anywhere, like:
        create new idea
        idea listings (there is only one with filters)
        favorites (like bookmarks of saved listing filters) - post beta launch
        about (mission statement and the team)

    so a top level menu seems appropriate, BUT we can hide it until
    you click on the Fab.  But in that case, where does the idea title
    go - probably just across the screen on the top, without a menu.
    That leaves more space for the title (of idea or just screen,
    if needed)

    how important are animations

    for ranking view it is important that:

        using it is intuitive
        the information on it ties in with the rest the cube and the percentages

    general UI automation:

        while it is very important it is not essential for the initial launch

    to a certain degree transition between the default ranking screen and the
    cube screen is important, we should tie in the main ranking with the miniature
    cube speaks for itself

    clicking:

    All clickable buttons are round, so the individual dimension buttons are
    also round.  To make them toggle up and down images are used (for lack of
    a better known way).

    10/6/2019 - The miniatures are also clickable to give the users a quick access
    point.  They do not have equivalents in the Fab so the interface is orthogonal.
    The chart miniature brings up the percentage view.
    -->
    <!--			moveType="{moveType}"-->
    <!--			positionMode="{positionMode}"-->
    <!--			verticalLayout="{verticalLayout}"-->
    <AgreementComponentGraph
        {cubeSides}
        cubeView={effectiveCubeView}
        {delta}
        ontoggleView={() => toggleView(cubeView, !cubeView)}
        ontogglePercent={togglePercentPicker}
        ontoggleChart={showOutcomes}
        {idea}
        {tweenDelta}
        {agreement}
        agreementFactors={currentAgreementFactors}
    />
    <!-- the main view -->
    <!--			class:ranking="!effectiveCubeView"-->
    <section
        class:cube={effectiveCubeView}
        class:card={!effectiveCubeView}
    >
        <main>
            <section
                id="viewport"
                class:leftViewport={horizontalLayout}
                style={transformScale}
            >
                {#if effectiveCubeView}
                    <!--						cubeView="{effectiveCubeView}"-->
                    <!--						delta="{delta}"-->
                    <!--						moveType="{moveType}"-->
                    <DetailedCube
                        {cubeSideMap}
                        {cubeSides}
                        oncubeAltered={ideaAltered}
                        {idea}
                        {positionMode}
                        {verticalLayout}
                        {agreement}
                    />
                {:else}
                    <!--						verticalLayout="{verticalLayout}"-->
                    <FactorRanking
                        {delta}
                        onrankingAdjusted={ideaAdjusted}
                        {idea}
                        {agreement}
                        {agreementFactors}
                    />
                {/if}
            </section>
        </main>
    </section>
    {#if agreement && idea}
        {#if percentMode}
            <PercentPicker
                {delta}
                onclose={togglePercentPicker}
                onmove={move}
                onmoveToValue={moveToValue}
                {idea}
                {agreementFactors}
            />
        {/if}
        {#if action === "save"}
            <ActionPopover
                oncancel={closeConfirm}
                viewOnly={!error}
                infoOnly={!!error}
            >
                {#snippet header()}
                                <div>
                        {savingMessage}
                    </div>
                            {/snippet}
                {#snippet content()}
                                <div>
                        {error}
                    </div>
                            {/snippet}
            </ActionPopover>
        {:else if action === "agreement"}
            <!--			contentClass="smallPadding"-->
            <ActionPopover customCancel={true} oncancel={closeConfirm}>
                {#snippet header()}
                                        <div>Coming soon - Solve</div>
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
                            Voting is scheduled to be released at the end of Alpha
                            testing period.
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
                            on:select="submitAgreement()"
                    ></AgreementButton>
                </div>
        -->
                {#snippet cancel()}
                                        <div class="cancel">
                        <CancelButton onclick={closeConfirm} />
                    </div>
                                    {/snippet}
            </ActionPopover>
        {:else if action === "confirm"}
            <ActionPopover oncancel={closeConfirm}>
                {#snippet header()}
                                                <div>Please Confirm</div>
                                            {/snippet}
                {#snippet content()}
                                                <div>
                        Define the "{idea.name}" Idea?
                        <br />
                        Age Groups: {idea.ageGroups
                            .map((ageGroup) => ageGroup.name)
                            .join(" , ")}
                        <br />
                        Labels: {idea.labels
                            .map((label) => label.name)
                            .join(" , ")}
                    </div>
                                            {/snippet}
                {#snippet actions()}
                                                <div>
                        <BuildButton onclick={() => build($user, true)} />
                    </div>
                                            {/snippet}
            </ActionPopover>
        {:else if action === "confirmUpdate"}
            <ActionPopover oncancel={closeConfirm}>
                {#snippet header()}
                                                        <div>Please Confirm</div>
                                                    {/snippet}
                {#snippet content()}
                                                        <div>
                        Define a new "{idea.name}" Idea or modify existing
                        one?
                        <br />
                        Age Groups: {idea.ageGroups
                            .map((ageGroup) => ageGroup.name)
                            .join(" , ")}
                        <br />
                        Labels: {idea.labels
                            .map((label) => label.name)
                            .join(" , ")}
                    </div>
                                                    {/snippet}
                {#snippet actions()}
                                                        <div>
                        <BuildButton onclick={() => build($user, true)} />
                        <SaveButton onclick={() => build($user, false)} />
                    </div>
                                                    {/snippet}
            </ActionPopover>
        {/if}
    {/if}
    <!--	{#if $confirmAlter}
        <ActionPopover
                on:cancel="doNotAlter()"
        >
            <div slot="header">
                Alter Idea
            </div>
            <div slot="content">
                Alter this idea?
            </div>
            <div slot="actions">
                <AlterButton
                        on:click="alter($routeParams)"
                ></AlterButton>
            </div>
        </ActionPopover>
        {/if}-->
</article>
{#if effectiveCubeView}
    <aside class="left-bottom-aside">
        <div class="left-bottom-hover-button">
            {#if previewMode}
                <AlignmentButton {alignmentMode} onclick={position} />
            {:else}
                <ManualOverwriteButton onclick={togglePercentPicker} />
            {/if}
        </div>
    </aside>
{/if}

<style>
    article {
        max-width: 420px;
    }

    @media (min-width: 321px) {
        section.card {
            top: 145px !important;
        }

        section.cube {
            top: 56% !important;
        }
    }

    #viewport {
        height: 100%;
        perspective: 900px; /* FIXME: make the cube more approachable 1500px ~ 2500px;*/
        /* 1500 increases range from 11% to 9%, 2500 increases to 6% */
        perspective-origin: 50% 160px; /* 670px; */
        /*transform: scale(0.75,0.75);*/
        width: 100%;
    }

    .cancel {
        text-align: center;
    }

    section.card {
        left: 0px;
        position: absolute;
        top: 110px;
        width: 100%;
    }

    section.cube {
        left: 50%;
        margin-right: -50%;
        position: absolute;
        top: 56%;
        transform: translate(-50%, -50%);
    }

    .left-bottom-aside {
        bottom: 5px;
        height: 1px;
        position: fixed;
        z-index: 2000;
    }

    .left-bottom-hover-button {
        bottom: 5px;
        position: absolute;
        left: 10px;
    }

    /*	.ranking {
            top: 275px;
        }*/
</style>
