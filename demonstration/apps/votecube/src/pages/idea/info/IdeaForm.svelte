<script lang="ts">
    import { DEPENDENCY_INJECTION, type IChildContainer } from "@airport/direction-indicator";
    import {
        FACTOR_INFO_MAIN,
        IdeaFormLogic,
        IDEA_LIST,
        IDEA_LOCATIONS,
        IDEA_MAIN,
        IdeaManager,
        IDEA_TIME_FRAME,
    } from "@votecube/vc-logic";
    import {
        navigateToPage,
        pageTitle,
        routeParams,
        text,
    } from "@votecube/ui-logic";
    import { onDestroy, onMount } from "svelte";
    import { get } from "svelte/store";
    import CharacterButton from "@votecube/ui-controls/src/button/CharacterButton.svelte";
    import PreviewButton from "@votecube/ui-controls/src/button/PreviewButton.svelte";
    import MultiSelect from "@votecube/ui-controls/src/field/MultiSelect.svelte";
    import Text from "@votecube/ui-controls/src/field/Text.svelte";
    import TextArea from "@votecube/ui-controls/src/field/TextArea.svelte";
    import ActionPopover from "@votecube/ui-controls/src/shell/ActionPopover.svelte";
    import SelectionBlock from "../../../components/factor/SelectionBlock.svelte";
    import { saveIdeaForm } from "../../../form/cache";
    import * as forms from "../../../form/forms";
    import { loadForms } from "../../../libs/forms";

    let container: IChildContainer;
    let delta = $state(0);
    let error;
    let form = $state.raw(null);
    let interFormNavigation;
    let invalidAlter = $state(false);
    let isOriginal = $state(true);
    let isValid = $state(false);
    let modified = $derived(
        !form || $routeParams.mode !== "alter" || isOriginal
            ? false
            : !form.isOriginal()
    );

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

    // timeframe: ({form}) => form ? form.fields.timeframe : null

    /*
            getArrayValueTexts: (
                arrayValue,
            ) => {
                const {container} = this.get()

                container.get(LOGIC_UTILS)

                if (!logicUtils) {
                    return ''
                }
                return logicUtils.getArrayValueTexts(arrayValue)
            },
            getDate: (
                date
            ) => {
                const {container} = this.get()

                container.get(LOGIC_UTILS)

                if (!logicUtils) {
                    return ''
                }
                return logicUtils.getDate(date)
            }
            */

    function ack() {
        invalidAlter = false;
    }

    function selectFactor(factorForm, theRouteParams) {
        interFormNavigation = true;
        forms.setForm(forms.CREATE_FACTOR, factorForm);
        navigateToPage(FACTOR_INFO_MAIN, theRouteParams);
    }

    function selectLocations(theRouteParams) {
        navigateToPage(IDEA_LOCATIONS, theRouteParams);
    }

    function selectTimeframe(theRouteParams) {
        navigateToPage(IDEA_TIME_FRAME, theRouteParams);
    }

    function submit(theRouteParams, modified) {
        doSubmit(theRouteParams, modified).then();
    }

    onMount(async () => {
        container = DEPENDENCY_INJECTION.ui("IdeaForm");
        const [
            formFactory,
            // locations,
            // _,
        ] = await Promise.all([
            loadForms(),
            // loadLocations(),
            // loadLocText(page.store, 'en-us'),
        ]);

        // let labels = await labelDao.getAll()

        form = forms.getForm(forms.DEFINE_IDEA_TOP);

        const theText = get(text);

        if (!form) {
            const { hostingPlatform, mode, repositoryGUID } = get(routeParams);

            try {
                const ideaManager = await container.get(IdeaManager);

                const cachedIdea = ideaManager.cachedIdea;

                if (!cachedIdea.ui) {
                    cachedIdea.ui = await ideaManager.getIdea(
                        hostingPlatform,
                        repositoryGUID
                    );
                }

                if (!cachedIdea.ui && mode !== "build") {
                    navigateToPage(IDEA_LIST);
                    return;
                }

                const ideaFormLogic = await container.get(
                    IdeaFormLogic
                );

                form = await ideaFormLogic.getIdeaForm(
                    cachedIdea,
                    mode === "alter",
                    mode !== "create",
                    theText,
                    formFactory
                );

                forms.setForm(forms.DEFINE_IDEA_TOP, form);
            } catch (theError) {
                error = theError;
                return;
            }
        }

        forms.ensureForm(form, formHandle);

        pageTitle.set("Idea Info");
    });

    onDestroy(() => {
        saveIdeaForm(interFormNavigation).then();
        form && form.clearComponents();
    });

    async function doSubmit(theRouteParams, modified) {
        const ideaManager = await container.get(IdeaManager);

        const form = ideaManager.cachedIdea.form;
        form.touch();

        if (!form.valid) {
            return;
        }

        if (theRouteParams.mode === "alter" && !modified) {
            invalidAlter = true;
            return;
        }

        forms.navigateOnValid(form, IDEA_MAIN, theRouteParams);
    }
    // cities: ({form}) => form ? form.fields.locations.fields.cities.value : [],
    // continents: ({form}) => form ? form.fields.locations.fields.continents.value : [],
    // countries: ({form}) => form ? form.fields.locations.fields.countries.value : [],
    // locations: ({form}) => form ? form.fields.locations : null,
    
    /*
    factorsModified: ({$routeParams, isOriginal, form}) => {
        if (!form
            || $routeParams.mode !== 'alter'
            || isOriginal) {
            return false
        }
        return !form.fields.factors.isOriginal()
    },
    */
    /*
locationOrTimeframeModified: ({$routeParams, isOriginal, form}) => {
if (!form
|| $routeParams.mode !== 'alter'
|| isOriginal) {
return false
}
return !form.fields.locations.isOriginal()
|| !form.fields.timeframe.isOriginal()
},
*/
    // states: ({form}) => form ? form.fields.locations.fields.states.value : [],
    let submitHighlight = $derived.by(() => {
        void delta; // re-evaluate on every manual change signal
        if (!isValid) {
            return "b00";
        }
        if ($routeParams.mode !== "alter") {
            return "0b0";
        }

        return modified ? "0b0" : "b00";
    });
</script>

{#if form}
    <form>
        <legend>Define Idea</legend>
        <Text field={form.fields.name} />
        <!--
        <div class="pure-control-group">
            <AutoComplete
                    field="{form.fields.category}"
            ></AutoComplete>
        </div>
        -->
        <div class="pure-control-group">
            <MultiSelect field={form.fields.ageGroups} />
        </div>
        <div class="pure-control-group">
            <MultiSelect field={form.fields.labels} />
        </div>
        <div class="outcomes">
            <div class="A">
                <CharacterButton
                    character="A"
                    fontSize={20}
                    fontX={12}
                    fontY={19}
                    size={24}
                    strokeWidth={1}
                />
                <TextArea
                    field={form.fields.outcomes.fields.A}
                    floatLabel={false}
                    mid={false}
                    mini={true}
                />
            </div>
            <div class="B">
                <CharacterButton
                    character="B"
                    fontSize={20}
                    fontX={12}
                    fontY={19}
                    size={24}
                    strokeWidth={1}
                />
                <TextArea
                    field={form.fields.outcomes.fields.B}
                    floatLabel={false}
                    mid={false}
                    mini={true}
                />
            </div>
        </div>
        <!--
        <div class="pure-control-group">
            <MultiSelect
                    field="{form.fields.labels}"
            ></MultiSelect>
        </div>
        <IconBlock
                fieldGroup="{form.fields.locations}"
                on:select="selectLocations($routeParams)"
        >
            <div slot="icon">
                <LocationIcon
                        width="42"
                ></LocationIcon>
            </div>
            <div slot="text">
                {#if locations && locations.touched}
                {#if continents.length}
                {#if countries.length}
                {#if states.length}
                {#if cities.length}
                Cities:
                <br>
                {getArrayValueTexts(cities)}
                <br>
                <br>
                {/if}
                States:
                <br>
                {getArrayValueTexts(states)}
                <br>
                <br>
                {/if}
                Countries:
                <br>
                {getArrayValueTexts(countries)}
                <br>
                <br>

                {/if}
                Continents:
                <br>
                {getArrayValueTexts(continents)}
                {:else}
                Select Geography
                {/if}
                {:else}
                Select Geography
                {/if}
            </div>
        </IconBlock>

        <IconBlock
                fieldGroup="{form.fields.timeframe}"
                on:select="selectTimeframe($routeParams)"
        >
            <div slot="icon">
                <TimeIcon></TimeIcon>
            </div>
            <div slot="text">
                {#if timeframe && timeframe.touched}
                <table
                        class="timeframe"
                >
                    <tr>
                        <td>
                            Start Date:
                        </td>
                        <td>
                            {getDate(timeframe.fields.startDate.value, logicUtils)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            End Date:
                        </td>
                        <td>
                            {getDate(timeframe.fields.endDate.value, logicUtils)}
                        </td>
                    </tr>
                </table>
                {:else}
                Select Time-frame
                {/if}
            </div>
        </IconBlock>
        -->
        <SelectionBlock
            factor={form.fields.factors.fields[1]}
            text={form.fields.factors.text[1]}
            onselect={() =>
                selectFactor(form.fields.factors.fields[1], $routeParams)}
        />
        <SelectionBlock
            factor={form.fields.factors.fields[2]}
            text={form.fields.factors.text[2]}
            onselect={() =>
                selectFactor(form.fields.factors.fields[2], $routeParams)}
        />
        <SelectionBlock
            factor={form.fields.factors.fields[3]}
            text={form.fields.factors.text[3]}
            onselect={() =>
                selectFactor(form.fields.factors.fields[3], $routeParams)}
        />
        <nav class="pure-controls">
            <PreviewButton
                classes="submitButton"
                highlightColor={submitHighlight}
                onclick={() => submit($routeParams, modified)}
            />
        </nav>
    </form>
    {#if invalidAlter}
        <ActionPopover oncancel={ack} infoOnly={true}>
            {#snippet header()}
                        <div>Error</div>
                    {/snippet}
            {#snippet content()}
                        <div>Please make a modification.</div>
                    {/snippet}
        </ActionPopover>
    {/if}
{/if}

<style>
    legend {
        display: none;
    }

    .A,
    .B {
        flex-basis: 100%;
        text-align: center;
    }

    .B {
        margin-left: 0.4em;
    }

    .outcomes {
        display: flex;
        margin-top: 10px;
        width: 100%;
    }

    /*
        .timeframe td {
            padding: 5px;
        }

        .timeframe td:first-child {
            text-align: right;
        }

        .timeframe td:nth-child(2) {
            text-align: left;
        }
    */
</style>
