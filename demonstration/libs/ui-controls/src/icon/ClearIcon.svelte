<script lang="ts">
	interface Props {
		multiLine?: boolean;
		onclick?: (event: MouseEvent) => void;
	}

	let { multiLine = false, onclick }: Props = $props();

	function handleClick(event: MouseEvent) {
		event.stopPropagation()
		onclick?.(event)
	}
</script>

<i
				class:fieldAid="{!multiLine}"
				style="
        vertical-align: top;
    "
				onclick={handleClick}
>
	<svg
					height="33"
					width="33"
	>
		<g>
			<line
							stroke="#aaa"
							stroke-width="3"
							x1="9"
							x2="24"
							y2="24"
							y1="9"
			/>
			<line
							stroke="#aaa"
							stroke-width="3"
							x1="24"
							x2="9"
							y2="24"
							y1="9"
			/>
		</g>
	</svg>
</i>
