<script lang="ts">
		interface Props {
		name: string;
		styles?: string;
		value: any;
		onselect?: (value: any) => void;
	}

	let { name, styles = "", value, onselect }: Props = $props();

	function onInput(value) {
		onselect?.(value);
	}
</script>

<div class="container" style={styles}>
	<label onclick={() => onInput(value)}>
		<input {name} oninput={() => onInput(value)} type="radio" {value} />
		<span class="choice"></span>
	</label>
</div>

<style>
	input[type="radio"] {
		display: none;
	}

	label {
		margin: 0;
	}

	.choice {
		border: 3px solid #000;
		border-radius: 50%;
		color: black;
		display: block;
		height: 25px;
		margin: 10px;
		width: 25px;
	}

	/* Customize the label (the container) */
	.container {
		height: 24px;
		cursor: pointer;
		margin-bottom: 10px;
		user-select: none;
	}

	/* Hide the browser's default checkbox */
	.container input {
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	/* Create a custom checkbox */
	.choice {
		top: 0;
		left: 0;
		height: 24px;
		width: 24px;
	}

	/* Create the choice/indicator (hidden when not checked) */
	.choice:after {
		content: "";
	}

	/* Show the choice when checked */
	.container input:checked ~ .choice:after {
		display: block;
	}

	/* Style the choice/indicator */
	.container .choice:after {
		background: black;
		border-radius: 50%;
		height: 12px;
		left: 3px;
		position: relative;
		top: 3px;
		width: 12px;
	}
</style>
