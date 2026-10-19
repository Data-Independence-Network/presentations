<script lang="ts">
	import { currentPage, user } from "@votecube/ui-logic";
	import type { IUiMenuItem } from "@votecube/model";

	interface Props {
		menuItem: IUiMenuItem;
		onselect?: (menuItem: IUiMenuItem) => void;
	}

	let { menuItem, onselect }: Props = $props();

	let selectedClass = $derived(
		$currentPage && menuItem.key === $currentPage.key
			? "pure-menu-selected"
			: ""
	);

	function click() {
		onselect?.(menuItem);
	}

	function getLink(menuItem: IUiMenuItem) {
		return menuItem.path ? menuItem.path : menuItem.key;
	}
</script>

{#if !menuItem.auth || $user}
	<li class="pure-menu-item {selectedClass}" onclick={click}>
		<a href={getLink(menuItem)} class="pure-menu-link">
			{menuItem.name}
		</a>
	</li>
{/if}
