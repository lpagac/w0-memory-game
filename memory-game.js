'use strict';
// create elements function
// first create a container div
// add a blank div as the base class for each card (card back)
// add a card front div with a class of color name and a class for hidden
// append both divs to container
// append container div to board

// flip card func
// check if the event target is a blank class div
// if true then toggle the class of the div to its sibling color class inside of the container div
//

// Set timeout will contain unflip func
// unflip func
// toggle the class of target element back to blank after one second
//

/** Memory game: find matching pairs of cards and flip both of them. */


const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

const colors = shuffle(COLORS);
const gameBoard = document.getElementById('game');
let waitingPeriod = false;
let isFlipped = false;
let card1;
let card2;
let scoresCollector = [];
let score = 0;
let scoreBoard = document.querySelector('.score');
let highScores = document.querySelector('.previousScores');

window.addEventListener('load', function() {
  scoresCollector = JSON.parse(localStorage.getItem('scores'));
  highScores.innerText = scoresCollector;
});


createCards(colors);

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
	// This algorithm does a "perfect shuffle", where there won't be any
	// statistical bias in the shuffle (many naive attempts to shuffle end up not
	// be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
	// you're interested, you can learn about it, but it's not important.

	for (let i = items.length - 1; i > 0; i--) {
		// generate a random index between 0 and i
		let j = Math.floor(Math.random() * i);
		// swap item at i <-> item at j
		[ items[i], items[j] ] = [ items[j], items[i] ];
	}

	return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
	for (let color of colors) {
		let container = document.createElement('div');
		let blank = document.createElement('div');
		let colored = document.createElement('div');
		container.classList.add('cardContainer');
		blank.classList = 'cards blankCard';
		colored.classList.add('cards', color, 'hidden');
		container.append(blank, colored);
		gameBoard.append(container);
	}
}

//leave card face up

function matchedCard() { // better verb
	card1.parentElement.removeEventListener('click', handleCardClick);
	card2.parentElement.removeEventListener('click', handleCardClick);
}
//handle if match

function isMatch(c1, c2) {
  console.log(c1, c2);
  //add comment about what's been compared
	if (c1.style.backgroundColor === c2.style.backgroundColor) {
		//leave face up, remove evt listener
    matchedCard();
    score+= 1;
    scoreBoard.innerText = score;
	
	} else {
    waitingPeriod = true;

    setTimeout(() => {
      unFlipCard();
    }, 1000)
	}
}

/** Flip a card face-up. */

function flipCard(evt) { //limit to two flip
	if (evt.target.classList.contains('blankCard')) {
    evt.target.style.backgroundColor = evt.target.nextElementSibling.classList[1];
    //evt.target.classList = `${evt.target.nextElementSibling.classList[0]} ${evt.target.nextElementSibling
			//.classList[1]}`;

		if (!isFlipped) {
			isFlipped = true;
			card1 = evt.target;
		} else {
			isFlipped = false;
      card2 = evt.target;
      //prevent user from clicking third card
    
      isMatch(card1, card2);
		}
	}
}

/** Flip a card face-down. */

function unFlipCard() {
	// setTimeout(() => {
    console.log(waitingPeriod);
		card1.style.backgroundColor = '';
    card2.style.backgroundColor = '';
    waitingPeriod = false;

  
	// }, FOUND_MATCH_WAIT_MSECS);
}

/** Handle clicking on a card: this could be first-card or second-card. */
// event listener for click and then flip card
// push class color into global array
// if array length is 2 check if match
// if they are a match remove something to keep it from flipping
// else clear array
// settimeout and unflip after 1 sec

//click event listener

let children = [ ...gameBoard.children ];

let startButton = document.querySelector('.start');
let resetButtonForm = document.querySelector('form');

startButton.addEventListener('click', gameStart);
resetButtonForm.addEventListener('submit', function() {

  scoresCollector.push(score);
  localStorage.setItem('scores', JSON.stringify(scoresCollector));

})

function gameStart() {
  children.forEach((card) => {
	card.addEventListener('click', handleCardClick);
  });
};

function handleCardClick(evt) {
  if(waitingPeriod) return;
	flipCard(evt);
}

