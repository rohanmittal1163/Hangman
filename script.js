const keyboard = document.querySelector('.keyboard');
const hintTag = document.querySelector('.hint');
const ulTag = document.querySelector('.word');
const scores = document.querySelector('.scores');
const hangmanImg = document.querySelector('#hangman');
const modal = document.querySelector('.modal');
const box = modal.firstElementChild;
const playAgain = document.querySelector('.play_again');

let currentWord = '';
let WrongOnes = 0;
let maxTrials = 6;
let guessedWord = [];

for (var i = 0; i < 26; i++) {
	const button = document.createElement('button');
	button.innerText = String.fromCharCode(97 + i);
	keyboard.appendChild(button);
	button.onclick = (e) => {
		sol(e.target, e.target.innerHTML);
	};
}

function getRandomWord() {
	const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
	hintTag.innerText = hint;
	currentWord = word;
	ulTag.innerHTML = word
		.split('')
		.map((item, index, array) => {
			return `<li class='letter'></li>`;
		})
		.join('');
	WrongOnes = 0;
	hangmanImg.src = `images/hangman-${WrongOnes}.svg`;
	modal.style.height = `0vh`;
	guessedWord = [];
	scores.innerHTML = `${WrongOnes}/${maxTrials}`;
	keyboard.querySelectorAll('button').forEach((item, index, array) => {
		item.classList.remove('disabled');
	});
}
function sol(e, letterChoosen) {
	if (currentWord.includes(letterChoosen)) {
		[...currentWord].forEach((item, idx, array) => {
			if (item == letterChoosen) {
				document.querySelectorAll('.letter')[idx].innerHTML = letterChoosen;
				document.querySelectorAll('.letter')[idx].classList.add('guessed');
				guessedWord.push(letterChoosen);
			}
		});
		e.classList.add('disabled');
		if (guessedWord.length == currentWord.length) {
			modal.style.height = `100vh`;
			box.children[0].src = `images/victory.gif`;
			box.children[1].innerText = `Congrats`;
			box.children[2].innerHTML = `<p>You found the word: <span class="answer">${currentWord}</span></p>`;
		}
	} else {
		WrongOnes++;
		hangmanImg.src = `images/hangman-${WrongOnes}.svg`;
		scores.innerHTML = `${WrongOnes}/${maxTrials}`;
		if (WrongOnes == maxTrials) {
			modal.style.height = `100vh`;
			box.children[0].src = `images/lost.gif`;
			box.children[1].innerText = 'game over';
			box.children[2].innerHTML = `<p>The correct word was: <span class="answer">${currentWord}</span></p>`;
		}
		e.classList.add('disabled');
	}
}

getRandomWord();

playAgain.onclick = () => {
	getRandomWord();
};

//accenture oa
