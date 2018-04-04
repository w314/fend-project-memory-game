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


function setupGame() {
  resetDeck();
  //reset moves:
  document.getElementsByClassName('moves')[0].innerText=0;
}

function handleMatchingCards() {
    console.log("cards are matching");
    openCards.forEach(function(card) {
      card.classList.add('open');
    });
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
  //TO DO: if first click start timer

  const card = event.target;
  console.log('my card');
  console.log(card);
  //check if card clicked is already shown
  if(card.classList.contains('show')) {
    console.log('card is already shown');
  } else {
    showSymbol(card);
    addToOpenCards(card);
  }
}

setupGame();

let openCards = [];
deck = document.getElementsByClassName('deck')[0];
deck.addEventListener('click', respondToClick );



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
