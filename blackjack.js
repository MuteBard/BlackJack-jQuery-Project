/*
edit 1: edited calculatePoints to get proper numerical values for Ace, Jack, Queen and King
addition 1: added function shuffleDeck()
edit 2: changed selectCard such that it just returns a popped card

*/

deck = newDeck();
cards = shuffleDeck(deck)
DealerPoints = 0;
PlayerPoints = 0;
Deal = true;
pi = 0;
di = 0;
playerCards = []
dealerCards = []

function newDeck(){
  var array = [];
  var type = ['spades','hearts','clubs','diamonds'];
  for (var i = 0; i < 13; i++) {
    if(i === 1){
      for ( var j = 0; j < 4; j++){
        array.push({ point: "ace", suit: type[j] });
      }
    }else if (i >= 1 && i < 10){
      for ( var j = 0; j < 4; j++){
        array.push({ point: i+1, suit: type[j] });
      }
    }else if(i >= 10 && i < 13){
      for (var j = 0; j < 4; j++){
        if(i == 10) array.push({ point: 'jack', suit: type[j] });
        else if (i == 11) array.push({ point: 'queen', suit: type[j] });
        else if (i == 12) array.push({ point: 'king', suit: type[j] });
      }
    }
  }
  return array;
}

  function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min)) + min;
  }

  function shuffleDeck(cards){
    for (var i = 0; i < cards.length; i++){
      var randi = getRandomInt(0,cards.length);
      var temp = cards[randi];
      cards[randi] = cards[i];
      cards[i] = temp;
    }
    return cards;
  }

function selectCard(){
  return cards.pop()

}

function getStrValue(removedCard){
  return removedCard.point+"_of_"+removedCard.suit;
}

function calculatePoints(cards,sum){
  cards.sort(function(a, b) {
    return b.point - a.point;
  });

  var sum = 0
  for(var i = 0; i < cards.length; i++){
    if(cards[i].point >= 2 && cards[i].point < 10){
      sum += cards[i].point;

    }else if(cards[i].point === "jack" || cards[i].point === "queen" || cards[i].point === "king") {
      sum += 10;

    }else if(cards[i].point === "ace" ){
      if(11+sum > 21){
        sum += 1;
      }else {
        sum += 11
      }
    }
  }
  return sum;
}

$(function(){

  $('#deal-button').click(function(){
    $('#deal-button').hide();

    //DEAL DEALER CARDS
    dealerCards.push(selectCard())
    $('#dealer-hand').append('<img class = "cards" src="images/'+getStrValue(dealerCards[di])+'.png">')

    di++;
    dealerCards.push(selectCard())
    $('#dealer-hand').append('<img class = "cards" src="images/'+getStrValue(dealerCards[di])+'.png">')

    di++;
    if ($('#dealer-points').text() === "" ){
      sumD = calculatePoints(dealerCards)
    }else{
      sumD = calculatePoints(dealerCards) + sumD
    }
    $('#dealer-points').text(sumD.toString())


    //DEAL PLAYER CARDS
    playerCards.push(selectCard())
    $('#player-hand').append('<img class = "cards" src="images/'+getStrValue(playerCards[pi])+'.png">')

    pi++;
    playerCards.push(selectCard())
    $('#player-hand').append('<img class = "cards" src="images/'+getStrValue(playerCards[pi])+'.png">')

    pi++;
    if ($('#player-points').text() === "" ){
       sumP = calculatePoints(playerCards)
    }else{
       sumP = calculatePoints(playerCards) + sumP
    }
    $('#player-points').text(sumP.toString())

  });

  $('#hit-button').click(function(){

    sumP = Number($('#player-points').text())
    if(!(sumP === 0)){
      playerCards.push(selectCard())
      $('#player-hand').append('<img class = "cards" src="images/'+getStrValue(playerCards[pi])+'.png">')
      pi++;
      if ($('#player-points').text() === "" ){
        sumP = calculatePoints(playerCards)

      }else{
        sumP = calculatePoints(playerCards)
      }
      $('#player-points').text(sumP.toString())
    }
  });


  $('#stand-button').click(function()){
    sumD = Number($('#dealer-points').text())
    if(!(sumD === 0)){
      dealerCards.push(selectCard())
      $('#dealer-hand').append('<img class = "cards" src="images/'+getStrValue(dealerCards[pi])+'.png">')
      pi++;
      if ($('#dealer-points').text() === "" ){
        sumD = calculatePoints(dealerCards)

      }else{
        sumD = calculatePoints(dealerCards)
      }
      $('#dealer-points').text(sumD.toString())
    }
  });


  }

  console.log("Player points at the end of this turn: " + Number($('#player-points').text()))
  console.log("Dealer points at the end of this turn: " + Number($('#dealer-points').text()))

})
