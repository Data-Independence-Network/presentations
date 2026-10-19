<script lang="ts">
	import { DEPENDENCY_INJECTION, type IChildContainer } from "@airport/direction-indicator";
	import type { IFieldGroup } from "@votecube/forms";
	import { Auth, text } from "@votecube/ui-logic";
	import { onDestroy, onMount } from "svelte";
	import { get } from "svelte/store";
	import EnterButton from "@votecube/ui-controls/src/button/EnterButton.svelte";
	// import * as forms                     from '../form/forms'
	import Text from "@votecube/ui-controls/src/field/Text.svelte";
	import ActionPopover from "@votecube/ui-controls/src/shell/ActionPopover.svelte";
	import { loadForms } from "../libs/forms";

	interface Props {
		onclosed?: () => void;
	}

	let { onclosed }: Props = $props();

	let container: IChildContainer;
	let error;
	let signInForm: IFieldGroup | undefined = $state.raw();
	let signInMode = true;

	onMount(async () => {
		const [formFactory] = await Promise.all([loadForms()]);

		const theText: any = get(text);

		signInForm = formFactory.group(
			"SignIn",
			{
				username: formFactory.field(
					[
						formFactory.validators.required(),
						formFactory.validators.minLength(5),
						formFactory.validators.username(),
					],
					{ maxLength: 64 }
				),
				password: formFactory.field(
					[
						formFactory.validators.required(),
						formFactory.validators.minLength(12),
						formFactory.validators.password(),
					],
					{ maxLength: 32 }
				),
				passwordCheck: formFactory.field(
					[
						formFactory.validators.required(),
						formFactory.validators.minLength(12),
						formFactory.validators.custom(
							"passwordMismatch",
							(field) => {
								const passwordValue =
									field.group.fields.password.value;
								const value = field.value;
								if (value !== passwordValue) {
									return {
										key: "passwordMismatch",
									};
								}
							}
						),
					],
					{ maxLength: 32 }
				),
			},
			[formFactory.validators.required()],
			theText.UI.Account,
			"SignIn"
		);

		// locationsData.countries.sort((a, b) => {
		// 	var nameA = a.text.toUpperCase(); // ignore upper and lowercase
		// 	var nameB = b.text.toUpperCase(); // ignore upper and lowercase
		// 	if (nameA < nameB) {
		// 		return -1;
		// 	}
		// 	if (nameA > nameB) {
		// 		return 1;
		// 	}

		// 	// names must be equal
		// 	return 0;
		// });

		container = DEPENDENCY_INJECTION.ui("SignIn");
	});

	onDestroy(() => DEPENDENCY_INJECTION.remove(container));

	function signIn() {
		if (!signInForm.valid) {
			return;
		}
		doSignIn(signInForm.value.email, signInForm.value.password).then(
			(success) => {
				if (success) {
					onclosed?.();
				}
			}
		);
	}

	async function doSignIn(userName, password) {
		const auth = await container.get(Auth);
		try {
			await auth.signIn(userName, password);
			return true;
		} catch (e) {
			return false;
		}
	}
</script>

<ActionPopover
	maxWidth="400px"
	width={400}
	oncancel={() => onclosed?.()}
>
	{#snippet header()}
		<div>
			{#if signInMode}
				Sign In
			{:else}
				Sign Up
			{/if}
		</div>
	{/snippet}
	{#snippet content()}
		<div>
			{#if error}
				<div class="error">
					{error}
				</div>
			{/if}
			<form>
				{#if signInForm}
					<Text field={signInForm.fields.username} />
					<Text field={signInForm.fields.password} type="password" />
					<Text field={signInForm.fields.passwordCheck} type="password" />
					<br />
				{/if}
			</form>
			<br />
		</div>
	{/snippet}
	{#snippet actions()}
		<div>
			<EnterButton onclick={signIn} />
		</div>
	{/snippet}
</ActionPopover>

<style>
	.error {
		padding: 5px;
		text-align: center;
	}
</style>
