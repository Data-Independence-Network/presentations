<script lang="ts">
	import {showTopMenu} from '@votecube/ui-logic'
	import TopBarHeader  from './TopBarHeader.svelte'

	let wrapperMarginBottom = $derived($showTopMenu ? 2.5 : 0)
</script>

<style>
	div {
		z-index: 1100;
	}
</style>

<div
				class="custom-menu-wrapper"
				style="margin-bottom: {wrapperMarginBottom}em"
>
	<TopBarHeader></TopBarHeader>
	<!--
	<TopMenu
					on:setViewType
	></TopMenu>
	-->
</div>
