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
  //set stopTime
  game.stopTime = new Date();
  //calculate gameTime
  game.gameTime = new Date(game.stopTime - game.startTime);
  //update timer on page to show correct gameTime
  const timer = document.getElementsByClassName('timer')[0];
  timer.innerText = game.gameTime.toLocaleTimeString([], {minute: '2-digit', second: '2-digit', hour12: false});

  //display end game modal
  //update game time
  const endGameModal = document.getElementsByClassName('end-game-modal')[0];
  const timeResult = document.getElementsByClassName('time-result')[0];
  timeResult.innerText = game.gameTime.toLocaleTimeString([], {minute: '2-digit', second: '2-digit', hour12: false});
  //update moves
  const movesResult = document.getElementsByClassName('moves-result')[0];
  movesResult.innerText = game.moves;
  //update stars
  const starResult = document.getElementsByClassName('star-result')[0];
  if(game.starRating === 0) {
    starResult.innerText = '( 0 stars )';
  } else {
    let starResultHtml = '';
    for(let i=0; i<game.starRating; i++) {
      starResultHtml += '<span class="fa fa-star"></span>'
    }
    starResult.innerHTML = starResultHtml;
  }
  //display end game modal
  endGameModal.classList.remove('hidden');
}


function setupGame() {
  //shuffle and hide all cards
  resetDeck();
}


function handleMatchingCards() {
    console.log("cards are matching");
    game.openCards.forEach(function(card) {
      card.classList.add('match');
    });
    //increases number of matched cards
    game.matches++;
    //empty open cards list
    game.openCards = [];
    //check for end of game
    if(game.matches === winningScore) {
      //add timeout, to avoid end of game message shown before the last pair of cards are redrawn
      setTimeout(handleEndGame, 10);
    }
}

function handleDiffrentCards() {
  game.openCards.forEach(function(card) {
    setTimeout(function() { card.classList.remove('show', 'open');}, 1000);
  });
  game.openCards = [];
}

function showSymbol(card) {
  card.classList.add('show', 'open');
}

function decreaseStars() {
  game.starRating--;
  const star = document.getElementsByClassName('fa-star')[game.starRating];
  setTimeout(function() { star.classList.add('hidden'); },10);
}

function increaseMoves() {
  game.moves++;
  const moves =   document.getElementsByClassName('moves')[0];
  moves.innerText = game.moves;
  //decrease stars after certain number of moves
  if(game.moves === level1 || game.moves === level2 || game.moves === level3){
    decreaseStars();
  }
}

function addToOpenCards(card) {
  game.openCards.push(card);
  if(game.openCards.length === 2) {
    if (game.openCards[0].firstElementChild.classList.value === game.openCards[1].firstElementChild.classList.value) {
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
  //check if card clicked is already shown
  if(card.classList.contains('show')) {
    console.log('card is already shown');
  } else {
    increaseMoves();
    showSymbol(card);
    addToOpenCards(card);
  }
}

function displayTime() {
  const timeNow = new Date();
  const elapsedTime = new Date(timeNow - game.startTime);
  const timer = document.getElementsByClassName('timer')[0];
  timer.innerText = elapsedTime.toLocaleTimeString([], {minute: '2-digit', second: '2-digit', hour12: false});
}

function startTimer() {
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
  game.openCards = [];
}

function closeEndGameModal() {
  const endGameModal = document.getElementsByClassName('end-game-modal')[0];
  endGameModal.classList.add('hidden');
}

function newGame() {
  closeEndGameModal();
  resetGame();
}

//define game variables
let game = {
  matches: 0,
  started: false,
  starRating: 3,
  moves: 0,
  startTime: null,
  endTime: null,
  gameTime: null,
  openCards: []
};

let level1 = 30;
let level2 = 40;
let level3 = 50;
let winningScore = 8;

//variables for testing
const testing = true;
if(testing) {
  level1 = 10;
  level2 = 20;
  level3 = 30;
  winningScore = 1;
}

//get game ready to star
setupGame();
//add clik event listener to cards
const deck = document.getElementsByClassName('deck')[0];
deck.addEventListener('click', respondToClick );
//add click event listener to restart game button
const restartButton = document.getElementsByClassName('restart')[0];
restartButton.addEventListener('click', resetGame );

//END GAME MODAL SETUP
//add click listener to end game modal close button
const modalClose = document.getElementsByClassName('close')[0];
modalClose.addEventListener('click', closeEndGameModal);
//add click event listener to end game modal new game button
const modalNewGame = document.getElementsByClassName('new-game')[0];
modalNewGame.addEventListener('click', newGame);
//add click event listener to end game modal no new game button
const modalNoNewGame = document.getElementsByClassName('no-new-game')[0];
modalNoNewGame.addEventListener('click', closeEndGameModal);
