"use strict";
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
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

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
    [items[i], items[j]] = [items[j], items[i]];
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
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let container = document.createElement('div');
    let blank = document.createElement('div');
    let colored = document.createElement('div');
    container.classList.add('cardContainer');
    blank.classList.add('cards blankCard');
    colored.classList.add(`cards ${color} hidden`);
    container.append(blank, colored);
    gameBoard.append(container);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  if(evt.target.classList.includes('blankCard')) {
    evt.target.classList.toggle(`${evt.target.nextElementSibling.classList[0]} ${evt.target.nextElementSibling.classList[1]}`);
  }
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
}

/** Handle clicking on a card: this could be first-card or second-card. */
// event listener for click and then flip card 
// push class color into global array
// if array length is 2 check if match
// if they are a match remove something to keep it from flipping
// else clear array
// settimeout and unflip after 1 sec
function handleCardClick(evt) {
  // ... you need to write this ...
  
}
