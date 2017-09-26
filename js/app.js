/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 let c = document.querySelectorAll('.card');
 let d = document.querySelector('.deck');
 let li = document.querySelectorAll('.deck li');
 let score = document.querySelector('.score-panel');
 let strs = document.querySelectorAll('.stars li i');
 let deckIcon = document.querySelectorAll('.deck li i');

 let masterArr = [];
deckIcon.forEach((i) => {
  return masterArr.push(i);
});
 // masterArr.sort();

 function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}


// this array is to feed the shuffle function.
// ------------------------------------------------------------

// ------------------------------------------------------------


// Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
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

// function shuffle (arr) {
//   let counter = arr.length;
//   while (counter > 0) {
//     let i = Math.floor(Math.random() * counter);
//     counter--;
//     let t = arr[counter];
//     arr[counter] = arr[i];
//     arr[i] = t;
//   }
//   return arr;
// }

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


// this object literal is defined so that we can pass in the object to access its methods while the DOM is being created and manipulated.
let game = {
  num: score.children[1],
  rst: score.children[2],
  rstBtn: score.children[3],
  s: strs,
  deck: d.children,
  arr: [],
  arr2: [],
  update: [],
  arrCrds: [],
  pairs: []
};


// this function starts our game.
function start (g) {
  g.num.innerHTML = 0;
  shuffle(masterArr);
  restart(game);
  gameTracker(game);
  cards(game);
}

// this function is for the cards. It adds the CSS classes whenever a certain perameter is met.
function cards (g) {
  for (let i = 0; i < li.length; i++) {
    li[i].className = 'card';
    let child = li[i].children[0];
    let childClass = li[i].children[0].className;

    li[i].addEventListener('click', (e) => {
      e.stopPropagation(); // stop bubbling behavior
      li[i].className = 'card show'; // at each click the ul classname is changed to 'card show'
      g.arrCrds.push(child); // the icon element is being pushed into the arr array
      if (g.arrCrds.length === 2) { // the conditional checks if the arr array is equal to 2
        if (g.arrCrds[0].className === g.arrCrds[1].className) { // this next conditional checks if the elements that are inside the array are equal
          g.update.push(g.arrCrds);
            g.pairs.push(g.arrCrds[0]); // if the conditional is met, we push the first element to a new array - pairs
            g.pairs.push(g.arrCrds[1]); // this second element gets pushed to the array pairs
            g.pairs.forEach((j) => { // we then iterate through the pairs array to set the classname of the parent element 'li' to the class 'card match'
              j.parentNode.className = 'card match'; // sets the parent element to class 'card match'
            });
            g.arrCrds = []; // the last piece of the conditional is to set the first array to an empty array
        } else {
          g.arrCrds.forEach((k) => {
            setTimeout(() => {
              e.stopPropagation();
              k.parentNode.className = 'card';
            }, 500);
          });
          g.arrCrds = [];
        }
      }
      if (g.update.length === 8) {
        alert('Would you like to play again?');
      }
    }, false);
  }
}

let sec = 0;
function pad (t) {
  return t > 9 ? t : "0" + t;
}
setInterval(() => {
  document.querySelector('#sec').innerHTML = pad(++sec%60);
  document.querySelector('#min').innerHTML = pad(parseInt(sec/60, 10));
}, 1000);


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
      } else if (g.arr.length === 15) {
        g.s[1].style.color = 'rgba(0,0,0,0.05)';
      } else if (g.arr.length === 20) {
        g.s[0].style.color = 'rgba(0,0,0,0.05)';
      }
    });
  }
}

// this function restarts our game. It resets out number of tries and the resets the number of stars.
function restart (g) {
  g.rstBtn.addEventListener('click', function () {
    g.num.innerHTML = 0;
    for (let i = 0; i < g.num.length; i++) {
      g.num = 0;
    }

    for (let i = 0; i < g.s.length; i++) {
      g.s[i].style.color = 'black';
    }
    for (let k = 0; k < li.length; k++) {
      li[k].className = 'card';
    }

    g.arr = [];
    g.arr2 = [];
    g.update = [];
    g.arrCrds = [];
    g.pairs = [];
    cards(game);
  });
}

start(game);
