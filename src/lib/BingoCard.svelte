<script>
	export let songs = [];

	// Create a new array for the bingo card with "Free" in the middle
	let bingoCard = [];
	const middleIndex = 12; // Index for the middle of a 5x5 grid

	$: {
		bingoCard = [...songs];
		if (bingoCard.length >= middleIndex) {
			bingoCard.splice(middleIndex, 0, 'Free');
		}
	}
</script>

<div class="bingo-card">
	{#each bingoCard as song}
		<div class="bingo-cell" style="font-size: calc(10px + 1vw);">
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
		height: 1.5in;
		width: 1.5in;
		text-align: center;
		padding: 4px;
		border: 1px solid black;
	}
</style>
