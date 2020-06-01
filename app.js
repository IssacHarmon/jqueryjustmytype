$(document).ready(function () {
	let sentences = [
		'ten ate neite ate nee enet ite ate inet ent eate',
		'Too ato too nOt enot one totA not anot tOO aNot',
		'oat itain oat tain nate eate tea anne inant nean',
		'itant eate anot eat nato inate eat anot tain eat',
		'nee ene ate ite tent tiet ent ine ene ete ene ate'
	];

	let sentenceIndex = 0;
	let letterIndex = 0;
	let currentSentence = sentences[sentenceIndex];
	let currentLetter = currentSentence[letterIndex];
	let currentLetterDiv = $('#target-letter');
	let errors = 0;
	let start = null;
	let finish = null;

	$('#keyboard-upper-container').hide();
	$('#sentence').append(currentSentence);
	$('#target-letter').append(currentLetter);

	$(document).keydown(function (e) {
		if (e.which === 16) {
			$('#keyboard-lower-container').hide();
			$('#keyboard-upper-container').show();
		}
	});

	$(document).keyup(function (e) {
		let asciiCode = e.key.charCodeAt(0);
		if (event.which === 16) {
			$('#keyboard-lower-container').show();
			$('#keyboard-upper-container').hide();
		}

		$(`#${asciiCode}`).css('background-color', '#f5f5f5');
		$(`#${e.keyCode}`).css('background-color', '#f5f5f5');
	});

	$(document).keypress(function (e) {
		let asciiCode = e.key.charCodeAt(0);
		$(`#${e.keyCode}`).css('background-color', 'yellow');
		$(`#${asciiCode}`).css('background-color', 'yellow');

		// currentSentence = sentences[sentenceIndex];
		// currentLetter = currentSentence[letterIndex];

		if (start === null) {
			start = Date.now();
			console.log((start = Date.now()));
		}

		$('#yellow-block').css('left', '+=17.5px');

		let nextLetter = currentSentence[letterIndex];
		currentLetterDiv.text(nextLetter);

		if (letterIndex < currentSentence.length - 1) {
			if (asciiCode === sentences[sentenceIndex][letterIndex].charCodeAt(0)) {
				$('#feedback').append("<span class= 'glyphicon glyphicon-ok'></span>");
			} else {
				$('#feedback').append("<span class = 'glyphicon glyphicon-remove'></span>");
				errors++;
			}
		}

		letterIndex++;

		if (letterIndex == currentSentence.length) {
			$('#sentence').empty();
			$('#feedback').empty();
			sentenceIndex++;
			currentSentence = sentences[sentenceIndex];
			if (currentSentence === undefined) {
                gameOver();
                $(document).off();
                $('#target-letter').empty();
                $('#target-letter').append(`<button class ="button" onClick="window.location.reload();"> Would you like to try again?</button>`)
			} else {
				$('#sentence').append(currentSentence);

				letterIndex = 0;
				if (sentenceIndex < sentences.length - 1) {
					nextLetter = currentSentence[letterIndex];
				}

				currentLetterDiv.text(nextLetter);
				$('#yellow-block').css({ left: 17 });
			}
		}
	});

	function gameOver() {
		sentenceIndex = 0;
		finish = Date.now();
		let time = finish - start;
		time /= 60000;
		let score = Math.round(54 / time - 2 * errors);
		$('#feedback').text('Your score is ' + score + ' words per minute. GET IT MY HOMIE!');
	}
});
