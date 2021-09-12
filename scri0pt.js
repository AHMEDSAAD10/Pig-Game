'use strict';

//  selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRlol = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
let scores, currentScore, activePlayer, playing;
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

const switchPlayer = function () {
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};


const init = function () {
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

}
init();

btnRlol.addEventListener('click', function () {
    // 1. generating random dice roll
    if (playing) {


        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2.Display dice

        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //. check for rolled 1 : if true, switch to next player
        if (dice !== 1) {
            // add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            //switch to next player
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            switchPlayer();
            // currentScore = 0;
            // activePlayer = activePlayer === 0 ? 1 : 0;
            // player0El.classList.toggle('player--active');
            // player1El.classList.toggle('player--active');

        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {

        //1. Add current score  to avtive player's score 
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. check if player's score is >= 100 
        // finish the game 

        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
            // switch to the next player
            switchPlayer();

        }
        // switch to the next player
        switchPlayer();
    }

});

btnNew.addEventListener('click', init);