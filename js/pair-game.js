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
     
  function startTimer () {
    tens++; 
      
    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }
      
    if (tens > 9){
      appendTens.innerHTML = tens;   
    } 
      
    if (tens > 99) {
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
      
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
  
    if (seconds > 59) {
      minutes++;
      appendMinutes.innerHTML = "0" + minutes;
      seconds = 0;
      appendSeconds.innerHTML = "0" + 0;
    }
      
    if (minutes > 5){
      appendMinutes.innerHTML = minutes;
    }
  }
