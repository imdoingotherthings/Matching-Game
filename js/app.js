/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// this array is to feed the shuffle function.
// ------------------------------------------------------------
let arr = [];
let deck = document.querySelectorAll('.deck li i');
deck.forEach(function (i) {
  return arr.push(i);
});
// ------------------------------------------------------------


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


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

let c = document.querySelectorAll('.card');
let d = document.querySelector('.deck');
let li = document.querySelector('li');
let score = document.querySelector('.score-panel');
let strs = document.querySelectorAll('.stars li i');


function color () {
  d = d.children;

  for (let i = 0; i < d.length; i++) {
    let deck = d[i];
    deck.addEventListener('click', function () {
      deck.style.backgroundColor = 'red';
    });

    deck.addEventListener('dblclick', function () {
      deck.style.backgroundColor = '';
    });
  }
}

// this function starts our game.
function start () {
  let num = score.children[1];
  num.innerHTML = 0;
  shuffle(arr);
  restart();
  color();
  gameTracker();
}

// this function tracks our movement count and deducts stars after a certain number of turns.
function gameTracker () {
  let num = score.children[1];
  let s = strs;
  let deck = d;
  let arr = [];
  let arr2 = [];
  for (let i = 0; i < deck.length; i++) {
    deck[i].addEventListener('click', function (e) {
      let child = e.target.children;
      for (let i = 0; i < child.length; i++) {
        arr.push(child[i]);
        arr2.push(num);
        num.innerHTML = arr2.length;
      }

      if (arr.length === 7) {
        s[2].style.color = 'rgba(0,0,0,0.05)';
      } else if (arr.length === 10) {
        s[1].style.color = 'rgba(0,0,0,0.05)';
      } else if (arr.length === 15) {
        s[0].style.color = 'rgba(0,0,0,0.05)';
      }
    });
  }
}


// this function restarts our game. It resets out number of tries and the resets the number of stars.
function restart () {
  let s = strs;
  let num = score.children[1];
  let rst = score.children[2];
  rst.addEventListener('click', function () {
    num.innerHTML = 0;
    s[0].style.color = 'black';
    s[1].style.color = 'black';
    s[2].style.color = 'black';
  });
}
