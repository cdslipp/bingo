<script>
	import BingoCard from '$lib/BingoCard.svelte';
	import PaperSheet from '$lib/PaperSheet.svelte';
	import { generateBingoCards } from '$lib/generateBingoCards';

	let csvFile = $state(null);
	let currentCardIndex = $state(0);
	let numberOfCards = $state(50);
	let bingoCards = $state([]);
	let pdfUrl = $state(null);
	let bingoTitle = $state('');

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
		const allCardsHTML = bingoCards.map(generateBingoCardHTML).join('');

		const response = await fetch('/api/makePDF', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ html: allCardsHTML })
		});

		const data = await response.json();

		if (data.status === 'success') {
			console.log('PDF generated:', data.pdfUrl);
			pdfUrl = data.pdfUrl;
		} else {
			console.error('Failed to generate PDF:', data.message);
		}
	}

	function generateBingoCardHTML(bingoCard) {
		const bingoCardHTML = bingoCard.map((song) => `<div class="bingo-cell">${song}</div>`).join('');

		return `
       <div class="paper-sheet">
           <div class="bingo-card">
               ${bingoCardHTML}
           </div>
       </div>
   `;
	}

	$effect(() => {
		if (csvFile) {
			console.log('generating bingo card');
			bingoCards = generateBingoCards(csvFile, numberOfCards);
		}
	});
</script>

<h1>Bingo Maker</h1>

<h3>Title your bingo</h3>
<input type="text" bind:value={bingoTitle} />

<h3>How many bingo cards would you like to generate?</h3>
<input type="number" bind:value={numberOfCards} />

<h3>Upload CSV</h3>
<input type="file" on:change={readFile} accept=".csv" />

<p>{currentCardIndex}</p>
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

<button on:click={generatePDF}>Generate PDF</button>

{#if pdfUrl}
	<a href={pdfUrl} download>Download PDF</a>
{/if}
