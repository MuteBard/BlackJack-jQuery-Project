function Card(point, suit){
  this.point = point;
  this.suit = suit;
}


Card.prototype.getImageUrl = function(){
  if((this.point) == 1){
    return 'images/'+'ace'+'_of_'+this.suit+'.png'

  }else if (this.point === 11){
    return 'images/'+'jack'+'_of_'+this.suit+'.png'

  }else if (this.point === 12){
    return 'images/'+'queen'+'_of_'+this.suit+'.png'

  }else if (this.point === 13){
    return 'images/'+'king'+'_of_'+this.suit+'.png'

  }else{
    return 'images/'+this.point+'_of_'+this.suit+'.png'
  }
}

function Hand(){
  this.hand = [];
}

Hand.prototype.addCard = function(card){
  (this.hand).push(card)
}

Hand.prototype.getPoints = function(){

  //create a variable to store the sum
  var sum = 0;
  //assigned to a local variable for readablity
  var myhand = this.hand
  //iterate through the entire deck to get the sum
  for(var i = 0; i < myhand.length; i++){
    //if the the current card in the hand is an ace
    if((myhand[i]).point == 1){
      //check to see if the value of sum+11 is greater than 21. if so, a value of 1 for ace is added to the sum
      if(11+sum > 21){
        sum += 1;
      //otherwise, a value of 11 for ace is added to the sum
      }else {
        sum += 11
      }
    //if the the current card in the hand is either a jack, queen or king
    }else if((myhand[i]).point > 10){
      // then a value of 10 for jack, queen or king is added to the sum
      sum += 10
    //for numbers between 2 - 10, add their at face values
    }else{
      sum += (myhand[i]).point;
    }
  }
  //return the sum
  return sum;
}

Hand.prototype.getCard() = function(index){
  var hand = this.hand
  return hand[index];
}


function Deck(){
  this.createDeck();
}

Deck.prototype.createDeck = function(){
  var array = [];
  var type = ['spades','hearts','clubs','diamonds'];
  for (var i = 1; i <= 13; i++) {
      for ( var j = 0; j < 4; j++){
        array.push({ point: i, suit: type[j] });
      }
    }
  this.deck = array;
}


Deck.prototype.shuffle = function(){

  function getRandomInt(min, max){
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
  this.deck = shuffleDeck(this.deck);
}

Deck.prototype.draw = function(){
  return (this.deck).pop();
}

Deck.prototype.numCardsLeft = function(){
  return (this.deck).length;
}
