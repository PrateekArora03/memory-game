
/*
 * Create a list that holds all of your cards
 */
let crds = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-anchor",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-diamond",
  "fa fa-bomb",
  "fa fa-leaf",
  "fa fa-bomb",
  "fa fa-bolt",
  "fa fa-bicycle",
  "fa fa-paper-plane-o",
  "fa fa-cube"
];
/*
 * Create a variable thats hold Selectors
 */
let deck=document.querySelector(".deck");   
let card=document.getElementsByClassName("card");
let cards=[...card];
var time=document.querySelector("#timer");
let moves=document.querySelector(".moves");
let star=document.getElementsByClassName("fa-star");
let move=0;
let openedcard=[];
let matchedCard = document.getElementsByClassName("match");
let model=document.getElementById("popup1");
let reset_card= document.querySelector('.restart');
let close=document.querySelector('.close');
/*
 * Create a per Varibale for cards
 */
let second=0,minute=1;
let check_time=true;
let Interval;

/*
 * Create a Set time Funtion Thats Manitain Time
 */

 function setTime(){
    Interval=setInterval(() => {
        if(matchedCard.length!=16){
            time.innerHTML =`mins: ${minute} seconds: ${second}`;
            second++;
            if(second==60){
                minute++;
                second=0;
            }
            }       
        else{
/*
 * Handel Pop up Text Intergating Moves, Star and Time
 */
            let pop_moves=document.querySelector('#finalMove');
            let pop_time=document.querySelector('#totalTime');
            let pop_Star=document.querySelector(".stars").innerHTML;
            pop_moves.innerHTML=move;
            pop_time.innerHTML=`mins: ${minute} seconds: ${second}`;
            document.getElementById("starRating").innerHTML =pop_Star;
            model.classList.add('show');
        }
    }, 1000);
 }
/*
 * Create Start Function to create cards and restart Game
 */
    function start(){
    let li;
    let ii;
    let shfCards = shuffle(crds);
    let deckc=document.getElementById("deck");
    deckc.innerHTML=''
    shfCards.forEach(function(e){
      li=document.createElement("LI")
      li.setAttribute("class",'card')
      ii=document.createElement("i")
      ii.setAttribute('class',e)
      li.appendChild(ii)
      deckc.appendChild(li) 
})
    move=0;
    moves.innerHTML=move;
    check_time=true;
    second=0,minute=0;
    check_time=true;
    clearInterval(Interval);
    time.innerHTML =`mins: ${minute} seconds: ${second}`;
    star[star.length-1].style.visibility = "visible";
    star[star.length-2].style.visibility = "visible";
    openedcard=[];
    for (var i = 0; i < 16; i++){
    card[i].addEventListener('click',deck_click);
    }
}
/*
 * Calling of start Game
 */
start();
/*
 * Create a Function to restart Game for event
 */
function playagain(){
   start();
   model.classList.remove('show');
}
    
/*  
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*
 * Create Funtion To record Moves
 */
 function move_add(){
    move++;
    moves.innerHTML=move;
    if(move>10&&move<14)
        star[star.length-1].style.visibility = "collapse";
    else if(move>15&&move<18){
        star[star.length-2].style.visibility = "collapse";
    }
 }
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
 * Thats Handel The Event on a game its also handel Already clicked or not to start time and add class on cards
 */
    function deck_click(event){
        if(event.target.classList.contains('open')){
            console.log("Already Clicked");
        }
        else if(openedcard.length === 0){
            openedcard.push(event.target);
            event.target.classList.add('open','show');
            console.log(openedcard);
               if(check_time){
                setTime();
                check_time=false;
        }
        }
        else if (openedcard.length=== 1) {
            openedcard.push(event.target)  
            event.target.classList.add('open','show');
            setTimeout(card_check,500);
        }
    }
/*
 * Create a function to compare same type of cards?? If card matched its add Matched class on both card thats opened and if its not matched its add unmatch to make it as normal
 */
    function card_check(){
        
        //console.log(openedcard[1].childNodes[1].classList[1].replace(/fa-/, ""));
        if(openedcard[0].childNodes[0].classList[1].replace(/fa-/, "")!=openedcard[1].childNodes[0].classList[1].replace(/fa-/, "")){
            console.log(openedcard[0]);
            
            openedcard[0].classList.add('unmatched');
          
            openedcard[1].classList.add('unmatched');
          setTimeout(function(){
            openedcard[0].classList.remove('open','show','unmatched');
            openedcard[1].classList.remove('open','show','unmatched');
             openedcard=[];
          },300)
            console.log(openedcard.length);
        }
        else{
            console.log("matched");
            // openedcard[0].childNodes[1].classList.remove('open');
            // openedcard[0].childNodes[1].classList.remove('open');
            openedcard[0].classList.add('match');
            openedcard[1].classList.add('match');
            openedcard=[];
        }
        move_add();
       
    }
/*
 * Too Class Pop-up
 */
    close.addEventListener('click',function(){
        matchedCard=0;
        clearInterval(Interval);
        model.classList.remove('show');
    });
/*
 * Create a Events for play again button on pop-up
 */
    reset_card.addEventListener('click',start);
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
