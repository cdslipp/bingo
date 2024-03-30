<script>
	import BingoCard from '$lib/BingoCard.svelte';
	import PaperSheet from '$lib/PaperSheet.svelte';
	import { generateBingoCards } from '$lib/generateBingoCards';

	let csvFile = $state(null);
	let currentCardIndex = $state(0);
	let numberOfCards = $state(50);
	let bingoCards = $state([]);
	let pdfUrl = $state(null);
	let bingoTitle = $state('Bingo Title');
	let isLoading = $state(false);

	function readFile(event) {
		console.log('Reading file');
		let file = event.target.files[0];
		let reader = new FileReader();
		reader.readAsText(file);

		reader.onload = function () {
			console.log(reader.result);
			csvFile = reader.result;
		};

		reader.onerror = function () {
			console.log(reader.error);
		};
	}

	function prevCard() {
		if (currentCardIndex > 0) {
			currentCardIndex--;
		}
	}

	function nextCard() {
		if (currentCardIndex < numberOfCards - 1) {
			currentCardIndex++;
		}
	}

	async function generatePDF() {
		isLoading = true;
		const allCardsStyledHTML = bingoCards.map(generateBingoCardHTML).join('');

		const response = await fetch('/api/makePDF', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ html: allCardsStyledHTML })
		});

		const data = await response.json();

		if (data.status === 'success') {
			console.log('PDF generated:', data.file_url);
			pdfUrl = data.file_url;
		} else {
			console.error('Failed to generate PDF:', data.message);
		}
		isLoading = false;
	}

	function generateBingoCardHTML(bingoCard) {
		const bingoCardHTML = bingoCard
			.map(
				(song) => `<div class="bingo-cell" style="
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			height: 1.5in;
			width: 1.5in;
			text-align: center;
			padding: 4px;
			border: 1px solid black;">${song}</div>`
			)
			.join('');

		return `
        <div class="paper-sheet" style="display: flex; flex-direction: column; align-items: center; width: 8in; height: 10in; margin: 0;page-break-after: always">
        <h1>${bingoTitle}</h1>
        <div class="bingo-card" style="display: grid; grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(5, 1fr); gap: 2px; width: 100%; height: 100%;">
                ${bingoCardHTML}
            </div>
        </div>
    `;
	}

	function getStyledHTML() {
		const hiddenPrintArea = document.getElementById('hiddenPrintArea');
		let styledHTML = '';

		hiddenPrintArea.querySelectorAll('.paper-sheet').forEach((sheet) => {
			const computedStyle = getComputedStyle(sheet);
			let inlineStyle = '';

			for (let property of computedStyle) {
				inlineStyle += `${property}:${computedStyle.getPropertyValue(property)};`;
			}

			styledHTML += `<div class="paper-sheet" style="${inlineStyle}">${sheet.innerHTML}</div>`;
		});

		console.log(styledHTML);
		return styledHTML;
	}

	$effect(() => {
		if (csvFile) {
			console.log('generating bingo card');
			bingoCards = generateBingoCards(csvFile, numberOfCards);
		}
	});
</script>

<div class="wrapper">
	<div class="sidebar pico">
		<article>
			<h1>Bingo Maker</h1>
			<h3>Title your bingo</h3>
			<input type="text" bind:value={bingoTitle} />
			<h3>How many bingo cards would you like to generate?</h3>
			<input type="number" bind:value={numberOfCards} />
			<h3>Upload CSV</h3>
			<input type="file" on:change={readFile} accept=".csv" />
			<button
				on:click={generatePDF}
				aria-busy={isLoading ? 'true' : 'false'}
				aria-label={isLoading ? 'Please wait…' : 'Generate PDF'}
			>
				{#if isLoading}
					Please wait…
				{:else}
					Generate PDF
				{/if}
			</button>
			{#if pdfUrl}
				<a href={pdfUrl} download>Download PDF</a>
			{/if}
		</article>
	</div>
	<div class="content">
		<PaperSheet>
			<h1>{bingoTitle}</h1>
			{#if bingoCards.length === 0}
				<p>Upload a CSV file to generate bingo cards</p>
			{:else}
				<div>
					<p>Card {currentCardIndex + 1} of {numberOfCards}</p>
					<button on:click={prevCard}>Prev</button>
					<button on:click={nextCard}>Next</button>
				</div>
				<BingoCard songs={bingoCards[currentCardIndex]} />
			{/if}
		</PaperSheet>
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 2fr 2fr;
		gap: 20px;
	}

	.sidebar {
		/* Styles for the sidebar */
	}

	.content {
		/* Styles for the content area */
	}
</style>
