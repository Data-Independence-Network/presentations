<script lang="ts">
	import DescribedButton         from '@votecube/ui-controls/src/button/DescribedButton.svelte'
	import FactorButton            from '../factor/FactorButton.svelte'
	import FilterButton            from '@votecube/ui-controls/src/button/FilterButton.svelte'
	import OutcomeButton           from '@votecube/ui-controls/src/button/OutcomeButton.svelte'
	import SortButton              from '@votecube/ui-controls/src/button/SortButton.svelte'
	import Fab                     from '@votecube/ui-components/src/Fab.svelte'

	let factorMode = $state(true)
	let opened      = $state(false)

	interface Props {
		onfactors?: () => void
		onfilter?: () => void
		onoutcomes?: () => void
		onsort?: () => void
	}

	let { ...handlers }: Props = $props()

	function run(
		action: 'factors' | 'filter' | 'outcomes' | 'sort'
	) {
		opened = false
		handlers[`on${action}`]?.()
	}

	function toggleFactorMode() {
		factorMode = !factorMode
		run(factorMode ? 'factors' : 'outcomes')
	}

</script>

<style>
	div.up {
		position: absolute;
		right: 10px;
		top: 5px;
	}
</style>

<Fab
		bind:opened
>
	{#snippet up3()}
		<div class="up">
			<DescribedButton
					bind:opened
					label="Sort Ideas"
					onclick={() => run('sort')}
			>
				<SortButton
				></SortButton>
			</DescribedButton>
		</div>
	{/snippet}
	{#snippet up2()}
		<div class="up">
			<DescribedButton
					bind:opened
					label="Filter Ideas"
					onclick={() => run('filter')}
			>
				<FilterButton
				></FilterButton>
			</DescribedButton>
		</div>
	{/snippet}
	{#snippet up1()}
		<div class="up">
			<DescribedButton
					bind:opened
					label={factorMode ? 'Show Factors' : 'Show Outcomes'}
					onclick={() => toggleFactorMode()}
			>
				{#if factorMode}
				<OutcomeButton
				></OutcomeButton>
				{:else}
				<FactorButton
				></FactorButton>
				{/if}
			</DescribedButton>
		</div>
	{/snippet}
</Fab>
