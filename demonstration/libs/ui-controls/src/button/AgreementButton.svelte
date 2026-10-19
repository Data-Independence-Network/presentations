<script lang="ts">
	interface Props {
		onclick?: (event: MouseEvent) => void;
		classes?: string;
	}

	let { classes = '', onclick }: Props = $props();
</script>

<div
		class="{classes}"
		{onclick}
>
	<svg width="50" height="50">
		<g>
			<circle
					cx="25"
					cy="25"
					fill="#FFF"
					r="23"
					stroke="#000"
					stroke-width="3"
			/>
			<line stroke="#000" y2="39" x2="25" y1="23" x1="12" stroke-width="5"/>
			<line stroke="#000" y2="23" x2="30" y1="40" x1="24" stroke-width="5"/>
			<line stroke="#000" y2="19" x2="32" y1="26" x1="29" stroke-width="5"/>
			<line stroke="#000" y2="12" x2="36" y1="21" x1="31" stroke-width="5"/>
			<line stroke="#000" y2="41" x2="26" y1="41" x1="23" stroke-width="2"/>
		</g>
	</svg>
</div>
