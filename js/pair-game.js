'use strict';

const myCards = document.querySelector('.container');
let resultsArray = [];
let counter = 0;
const text = document.querySelector('.text');
let minutes = 0;
let seconds = 0; 
let tens = 0; 
const appendTens = document.querySelector(".tens");
const appendSeconds = document.querySelector(".seconds");
const appendMinutes = document.querySelector(".minutes")
let Interval ;

let images = [
  '1', 
  '2', 
  '3', 
  '4', 
  '5'
];

let clone = images.slice(0); 
let cards = images.concat(clone); 

function shuffle(o){
    for(let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i],   o[i] = o[j], o[j] = x);
    return o;
  }
  shuffle(cards);

  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement('div');
    card.dataset.item = cards[i];
    card.dataset.view = "card";
    myCards.appendChild(card);
       
    card.onclick = function () {
     
      if (this.className != 'flipped' && this.className != 'correct'){
          this.className = 'flipped';
          var result = this.dataset.item;
          resultsArray.push(result);
          clearInterval(Interval);
          Interval = setInterval(startTimer, 10);
      }
      if (resultsArray.length > 1) {

        if (resultsArray[0] === resultsArray[1]) {
          check("correct");
          counter ++;
          win();
          resultsArray = [];
        } else {
          check("reverse");
          resultsArray = [];
        }
      } 
    }
  };
  
  const check = function(className) {
  
    let x = document.querySelectorAll(".flipped");
    setTimeout(function() {
  
      for(let i = (x.length - 1); i >= 0; i--) {
        x[i].className = className;
      } 
    },500);   
  }

  const win = function () {
    if(counter === 5) {
      clearInterval(Interval);
      text.innerHTML = `Your time is ${minutes}:${seconds}:${tens}`;
      setTimeout(function(){ location.reload(); }, 5000);
    } 
  }
     
  
  function timer(num) {
    let mins = Math.floor(num/60);
    let secs = num % 60;
    if (mins < 10) mins = 0'${mins}';
    if (secs < 10) secs = 0'${secs}';
    console.log('${mins}:${secs}');
}
timer(25);
timer(109);
timer(125);
timer(1105);