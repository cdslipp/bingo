<script>
	let { songs, fontFamily, baseFontSize } = $props();

	function adjustedFontSize(size) {
		let scale = 1;
		if (size === 'small') scale = 0.8;
		else if (size === 'medium') scale = 1;
		else if (size === 'large') scale = 1.2;
		else if (size === 'x-large') scale = 1.4;
		return `${baseFontSize * scale}px`;
	}
</script>

<div class="bingo-card" style="font-family: {fontFamily};">
	{#each songs as { song, fontSize }}
		<div class="bingo-cell" style="font-size: {adjustedFontSize(fontSize)};">
			{song}
		</div>
	{/each}
</div>

<style>
	.bingo-card {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
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
		border: 1px solid black;
	}
</style>
