/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function resetDeck() {

  const symbols = [
    'fa-dimond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb',
    'fa-dimond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb'
  ];

  shuffle(symbols);

  const cards = document.getElementsByClassName('card');

  for(let i=0; i < 16; i++){
    //remove classes from cards showing game status
    cards[i].classList.remove('match', 'show', 'open');
    //remove old symbol class from card
    let oldSymbol =   cards[i].firstElementChild.classList[1];
    cards[i].firstElementChild.classList.remove(oldSymbol);
    //add new symbol class to card
    cards[i].firstElementChild.classList.add(symbols[i]);
  }

}

function handleEndGame() {
  //stop timer
  clearInterval(game.intervalId);
  game.stopTime = new Date();
  const gameTime = new Date(game.stopTime - game.startTime)
  alert(gameTime.toLocaleTimeString([], {minute: '2-digit', second: '2-digit', hour12: false}));
}


function setupGame() {
  //shuffle and hide all cards
  resetDeck();
}


function handleMatchingCards() {
    console.log("cards are matching");
    openCards.forEach(function(card) {
      card.classList.add('match');
    });
    //increases number of matched cards
    game.matches++;
    //empty open cards list
    openCards = [];
    //check for end of game
    if(game.matches===8) {
      //add timeout, to avoid end of game message shown before the last pair of cards are redrawn
      setTimeout(handleEndGame, 10);
    }
}

function handleDiffrentCards() {
  openCards.forEach(function(card) {
    setTimeout(function() { card.classList.remove('show', 'open');}, 1000);
  });
  openCards = [];
}

function showSymbol(card) {
  card.classList.add('show', 'open');
}

function decreaseStars() {
  game.starRating--;
  const star = document.getElementsByClassName('fa-star')[game.starRating];
  star.style.display = 'none';
}

function increaseMoves() {
  game.moves++;
  const moves =   document.getElementsByClassName('moves')[0];
  moves.innerText = game.moves;
  //decrease stars after certain number of moves
  if(game.moves === 30 || game.moves === 40 || game.moves === 50){
    decreaseStars();
  }
}

function addToOpenCards(card) {
  openCards.push(card);
  if(openCards.length === 2) {
    if (openCards[0].firstElementChild.classList.value === openCards[1].firstElementChild.classList.value) {
      handleMatchingCards();
    } else{
      handleDiffrentCards();
    }
  }
}

function respondToClick(event) {
  //At the first click start the game
  if(!game.started) {
    startTimer();
    game.started = true;
  }

  const card = event.target;
  // console.log('my card');
  // console.log(card);
  //check if card clicked is already shown
  if(card.classList.contains('show')) {
    console.log('card is already shown');
  } else {
    increaseMoves();
    showSymbol(card);
    addToOpenCards(card);
  }
}

function displayTime(startTime) {
  const timeNow = new Date();
  // console.log('time now:');
  // console.log(timeNow.toLocaleTimeString([], {minute: '2-digit', second: '2-digit', hour12: false}));
  const elapsedTime = new Date(timeNow - game.startTime);
  const timer = document.getElementsByClassName('timer')[0];
  timer.innerText = elapsedTime.toLocaleTimeString([], {minute: '2-digit', second: '2-digit', hour12: false});
  // console.log(elapsedTime.toLocaleTimeString([], {minute: '2-digit', second: '2-digit', hour12: false}));
}

function startTimer(mode) {
  game.startTime =  new Date();
  console.log('starting at:');
  console.log(game.startTime.toLocaleTimeString([], {minute: '2-digit', second: '2-digit', hour12: false}));
  game.intervalId = setInterval(function() { displayTime(); }, 800);
}

function resetGame() {
  //TO DO: ask for are you sure

  //if game has not started yet, nothing to do
  if(!game.started) {
    return;
  }

  resetDeck();
  //reset moves to 0
  document.getElementsByClassName('moves')[0].innerText=0;
  //reset timer to 00:00
  document.getElementsByClassName('timer')[0].innerText='00:00';
  //reset all three stars to be visible
  const stars = document.getElementsByClassName('fa-star');
  for(let i=0; i<3; i++) {
    stars[i].classList.remove('hidden');
  }
  //empty open card list
  openCards = [];
  //stop timer
  clearInterval(game.intervalId)
  //reset game values
  game.matches = 0;
  game.started = false;
  game.starRating = 3;
  game.moves = 0;
  game.startTime = null;
  game.endTime = null;
  game.intervalId = null;
}

let openCards = [];
let game = {
  matches: 0,
  started: false,
  starRating: 3,
  moves: 0,
  startTime: null,
  endTime: null
};


setupGame();

const deck = document.getElementsByClassName('deck')[0];
deck.addEventListener('click', respondToClick );
const restartButton = document.getElementsByClassName('restart')[0];
restartButton.addEventListener('click', resetGame );
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
