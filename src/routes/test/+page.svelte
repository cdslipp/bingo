<script>
	let currentCardIndex = $state(0);
	let numberOfCards = $state(5);

	function prevCard() {
		if (currentCardIndex > 0) {
			currentCardIndex--;
			console.log('prevCard clicked, currentCardIndex:', currentCardIndex);
		}
	}

	function nextCard() {
		if (currentCardIndex < numberOfCards - 1) {
			currentCardIndex++;
			console.log('nextCard clicked, currentCardIndex:', currentCardIndex);
		}
	}
</script>

<div>
	<p>Current Card Index: {currentCardIndex}</p>
	<button onclick={prevCard}>Prev</button>
	<button onclick={nextCard}>Next</button>
</div>
