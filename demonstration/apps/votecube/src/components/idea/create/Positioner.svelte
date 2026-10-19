<script lang="ts">
	import RightButton          from '@votecube/ui-controls/src/button/RightButton.svelte'
	import SwitchPositionButton from '@votecube/ui-controls/src/button/SwitchPositionButton.svelte'

	interface Props {
		onmoveRight?: () => void
		onmoveDown?: () => void
		onmoveLeft?: () => void
		onmoveUp?: () => void
		onswitchDir?: () => void
	}

	let { onmoveRight, onmoveDown, onmoveLeft, onmoveUp, onswitchDir }: Props = $props()
</script>

<RightButton
				classes="moveRight"
				onclick={onmoveRight}
></RightButton>
<RightButton
				classes="moveDown"
				onclick={onmoveDown}
></RightButton>
<RightButton
				classes="moveLeft"
				onclick={onmoveLeft}
></RightButton>
<RightButton
				classes="moveUp"
				onclick={onmoveUp}
></RightButton>
<SwitchPositionButton
				classes="switchPosition"
				onclick={onswitchDir}
></SwitchPositionButton>
