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
let deckIcon = document.querySelectorAll('.deck li i');
// ------------------------------------------------------------


// Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
//     console.log(array.length);
//
//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }
//
//     return array;
// }

function shuffle (arr) {
  let counter = arr.length;
  while (counter > 0) {
    let i = Math.floor(Math.random() * counter);
    counter--;
    let t = arr[counter];
    arr[counter] = arr[i];
    arr[i] = t;
  }
  return arr;
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
let li = document.querySelectorAll('.deck li');
let score = document.querySelector('.score-panel');
let strs = document.querySelectorAll('.stars li i');

// this object literal is defined so that we can pass in the object to access its methods while the DOM is being created and manipulated.
let game = {
  num: score.children[1],
  rst: score.children[2],
  s: strs,
  deck: d.children,
  arr: [],
  arr2: []
};


// this function starts our game.
function start (g) {
  g.num.innerHTML = 0;
  shuffle(deckIcon);
  restart(game);
  gameTracker(game);
  cards(game);
}

// this function is for the cards. It adds the CSS classes whenever a certain perameter is met.
function cards (g) {
  let uLi = li;
  let arr = [];
  for (let i = 0; i < uLi.length; i++) {
    uLi[i].className = 'card';
    let child = uLi[i].children[0];
    let childClass = uLi[i].children[0].className;
    let pairs = [];

    uLi[i].addEventListener('click', (e) => {
      uLi[i].className = 'card show';
      arr.push(child);
      if (arr.length === 2) {
        if (arr[0].className === arr[1].className) {
            pairs.push(arr[0]);
            pairs.push(arr[1]);
            pairs.forEach((j) => {
              j.parentNode.className = 'card match';
            });
            arr = [];
        } else {
          console.log(arr);
          arr.forEach((k) => {
            setTimeout(() => {
              k.parentNode.className = 'card';
            }, 1000);
          });
          arr = [];
        }
      }
    });
  }
}


// this function tracks our movement count and deducts stars after a certain number of turns.
function gameTracker (g) {
  for (let i = 0; i < g.deck.length; i++) {
    g.deck[i].addEventListener('click', function (e) {
      let child = e.target.children;
      for (let i = 0; i < child.length; i++) {
        g.arr.push(child[i]);
        g.arr2.push(g.num);
        g.num.innerHTML = g.arr2.length;
      }

      if (g.arr.length === 7) {
        g.s[2].style.color = 'rgba(0,0,0,0.05)';
      } else if (g.arr.length === 10) {
        g.s[1].style.color = 'rgba(0,0,0,0.05)';
      } else if (g.arr.length === 15) {
        g.s[0].style.color = 'rgba(0,0,0,0.05)';
      }
    });
  }
}

// this function restarts our game. It resets out number of tries and the resets the number of stars.
function restart (g) {
  g.rst.addEventListener('click', function () {
    g.num.innerHTML = 0;
    for (let i = 0; i < g.num.length; i++) {
      g.num = 0;
    }

    for (let i = 0; i < g.s.length; i++) {
      g.s[i].style.color = 'black';
    }
    g.arr = [];
    g.arr2 = [];

    cards();
  });
}

start(game);
