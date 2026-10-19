<script lang="ts">
	import { DEPENDENCY_INJECTION, type IChildContainer } from "@airport/direction-indicator";
	import type { IUiMenuItem } from "@votecube/model";
	import {
		Auth,
		emInPx,
		showMainMenu,
		showSignIn,
		user,
	} from "@votecube/ui-logic";
	import {
		ABOUT,
		FEEDBACK,
		IDEA_FORM,
		IDEA_LIST,
		RELEASE_PLAN,
	} from "@votecube/vc-logic";
	import { onMount } from "svelte";
	import MenuItem from "./MenuItem.svelte";

	interface Props {
		active: boolean;
		onselected?: (menuItem: IUiMenuItem) => void;
	}

	let { active, onselected }: Props = $props();

	let container: IChildContainer;

	let menuItems: IUiMenuItem[] = [
		{
			auth: false,
			key: IDEA_LIST,
			name: "Ideas",
			path: IDEA_LIST,
		},
		{
			auth: true,
			key: IDEA_FORM,
			path: IDEA_FORM.replace(":mode", "build"),
			name: "Define Idea",
		},
		{
			auth: false,
			key: ABOUT,
			name: "About Us",
			path: ABOUT,
		},
		{
			auth: false,
			key: RELEASE_PLAN,
			name: "Release Plan",
			path: RELEASE_PLAN,
		},
		{
			auth: false,
			key: FEEDBACK,
			name: "Feedback",
			path: FEEDBACK,
		},
	];

	onMount(() => {
		emInPx.set(getEmInPx());
		container = DEPENDENCY_INJECTION.ui("Menu");
	});

	function getEmInPx(): number {
		const div = document.getElementById("sizer");
		div.style.height = "1em";
		return div.offsetHeight;
	}

	function selectMenu(menuItem: IUiMenuItem) {
		onselected?.(menuItem);
	}

	function signIn() {
		showSignIn.set(true);
		showMainMenu.toggle();
	}

	function signOut() {
		(async () => {
			const auth = await container.get(Auth);
			await auth.signOut();
			showMainMenu.toggle();
		})().then();
	}
</script>

<nav class:active id="menu">
	<section class="pure-menu">
		<ul class="pure-menu-list">
			{#each menuItems as menuItem}
				<MenuItem {menuItem} onselect={() => selectMenu(menuItem)} />
			{/each}

			{#if $user}
				<li class="pure-menu-item" onclick={signOut}>
					<div class="pure-menu-link">Sign Out</div>
				</li>
			{:else}
				<li class="pure-menu-item" onclick={signIn}>
					<div class="pure-menu-link">Sign In</div>
				</li>
			{/if}
		</ul>
	</section>
	<div id="sizer"></div>
</nav>

<style>
	section {
		margin-top: 44px;
	}
</style>
