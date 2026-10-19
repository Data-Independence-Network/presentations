<script lang="ts">
	import {pageTitle} from '@votecube/ui-logic'

	let title = $derived($pageTitle ? $pageTitle : 'TrumentBox')

</script>

<div class="pure-menu custom-menu custom-menu-top">
	<nav
			class="pure-menu-heading custom-menu-brand"
	>
		{title}
	</nav>
	<!--
	<TopMenuToggle></TopMenuToggle>
	-->
</div>
