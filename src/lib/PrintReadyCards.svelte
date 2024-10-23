<script>
	let {
		bingoTitle = 'Bingo Card',
		bingoCards,
		fontFamily = 'sans-serif',
		baseFontSize = 16
	} = $props();

	function adjustedFontSize(size) {
		let scale = 1;
		if (size === 'small') scale = 0.8;
		else if (size === 'medium') scale = 1;
		else if (size === 'large') scale = 1.2;
		else if (size === 'x-large') scale = 1.4;
		return `${baseFontSize * scale}px`;
	}
</script>

{#each bingoCards as bingoCard}
	<div class="paper-sheet" style="font-family: sans-serif;">
		<h1>{bingoTitle}</h1>
		<div class="bingo-card">
			{#each bingoCard as { song, fontSize }}
				{#if song === 'FREE'}
					<div
						class="bingo-cell"
						style="font-weight: bolder; font-size: {adjustedFontSize('x-large')};"
					>
						{song}
					</div>
				{:else}
					<div class="bingo-cell" style="font-size: {adjustedFontSize(fontSize)};">
						{song}
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/each}

<style>
	:root {
		--small: 20px;
		--medium: 24px;
		--large: 27px;
		--x-large: 34px;
	}
	div {
		font-family: inherit;
	}
	.paper-sheet {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 8in;
		height: 10in;
		page-break-after: always;
	}

	.bingo-card {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		gap: 2px;
		padding: 0;
	}

	.bingo-cell {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		height: 1.55in;
		width: 1.55in;
		padding: 6px;
		text-align: center;
		border-top: 1px solid black; /* Add top border to all cells */
		border-left: 1px solid black; /* Add left border to all cells */
	}

	.bingo-card > .bingo-cell:nth-child(5n) {
		/* Target every 5th cell (last column) */
		border-right: 1px solid black; /* Add right border to last column */
		border-left: 1px solid black; /* Remove left border from last column */
	}

	.bingo-card > .bingo-cell:nth-last-child(-n + 5) {
		/* Target last 5 cells (last row) */
		border-bottom: 1px solid black; /* Add bottom border to last row */
		border-top: 1px solid black; /* Remove top border from last row */
	}
</style>
