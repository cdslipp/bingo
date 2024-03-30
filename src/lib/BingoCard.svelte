<script>
	export let songs = [];

	// Create a new array for the bingo card with "Free" in the middle
	let bingoCard = [];

	$: {
		bingoCard = [...songs];
	}
</script>

<div class="bingo-card">
	{#each bingoCard as song}
		<div class="bingo-cell">
			{song}
		</div>
	{/each}
</div>

<style>
	.bingo-card {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		gap: 2px;
		width: 100%;
		height: 100%;
	}
	.bingo-cell {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		height: 150px;
		width: 150px;
		text-align: center;
		font-size: 12pt;
		padding: 4px;
		border: 1px solid black;
	}
</style>
