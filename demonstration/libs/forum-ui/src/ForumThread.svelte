<script lang="ts">
    import { DEPENDENCY_INJECTION, type IChildContainer } from "@airport/direction-indicator";
    import { FormFactory, type IFieldGroup, type IMatchingField } from "@votecube/forms";
    import { pageTitle, routeParams, text } from "@votecube/ui-logic";
    import TextArea from "@votecube/ui-controls/src/field/TextArea.svelte";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import ForumPost from "./ForumPost.svelte";

    let form: IFieldGroup | undefined = $state();
    let isOriginal = true;
    let isValid = false;

    let field = $derived(form ? (form.fields.post as IMatchingField) : undefined);

    let formHandle = {
        setDelta(_newDelta: number) {},
        setIsValid(newIsValid: boolean) {
            isValid = newIsValid;
        },
        setIsOriginal(newIsOriginal: boolean) {
            isOriginal = newIsOriginal;
        },
    };

    async function loadThread(
        forumRepositorySource: string,
        forumRepositoryUuId: string
    ): Promise<any> {}

    function ensureForm(form, formHandle) {
        form.addComponent(formHandle);
        formHandle.setIsOriginal(form.isOriginal());
        formHandle.setIsValid(form.valid);
    }

    onMount(() => {
        const container: IChildContainer = DEPENDENCY_INJECTION.ui("ForumThread");

        (async () => {
            const { forumRepositorySource, forumRepositoryUuId } = get(routeParams) ?? {};
            await Promise.all([
                loadThread(forumRepositorySource, forumRepositoryUuId),
                import("@votecube/forms"),
            ]);

            const formFactory = await container.get(FormFactory);

            const newForm = formFactory.group(
                "Forum",
                {
                    post: formFactory.field([]),
                },
                [],
                get(text).UI
            );

            ensureForm(newForm, formHandle);
            form = newForm;

            pageTitle.set("Ideas");
        })();

        return () => {
            form && form.clearComponents();
        };
    });
</script>

<div>This is a Thread</div>
<ForumPost />
<ForumPost />
<ForumPost />
<ForumPost />
<ForumPost />

{#if field}
    <TextArea
        {field}
        floatLabel={false}
        mid={false}
        mini={false}
    />
{:else}
    <div>No form found</div>
{/if}
