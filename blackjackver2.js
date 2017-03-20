//Card constructor
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

//Hand constructor
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

//Deck constructor
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

$(function(){
  //create the deck of cards and shuffle it before the game starts
  if($('#player-points').text() == "0"){
    tableDeck = new Deck();
    tableDeck.shuffle();
    $('#hit-button').hide();
    $('#stand-button').hide();
    $('#reset-button').hide();
  }
  //Check For Winner/Loser
  var win = function checkVictor(dealerHand,playerHand){
      var reset = false;
    if(dealerHand.getPoints() > 21 && playerHand.getPoints() > 21){
      $('#result').text("Bust! You Lost!")
      reset = true;
    }else if(dealerHand.getPoints() == 21 && playerHand.getPoints() !== 21){
      $('#result').text("Bust! You Lost!")
      reset = true;
    }else if(playerHand.getPoints() > 21){
      $('#result').text("Bust! You Lost!")
      reset = true;
    }else if(dealerHand.getPoints() > 21){
      $('#result').text("You Won!")
      reset = true;
    }

    //toggle the reset button when it is the end of the game
    if(reset == true){
      $('#hit-button').hide();
      $('#stand-button').hide();
      $('#reset-button').toggle();
    }
  }

  //DEAL
  //when the deal button is clicked, hide the button and start dealing 2 cards to each player
  $('#deal-button').click(function(){
    $('#deal-button').hide();
    $('#hit-button').toggle();
    $('#stand-button').toggle();

    //draw two cards from the deck and assign both to card values
    var card = tableDeck.draw()
    var playerCard1 = new Card(card.point,card.suit);
    var card = tableDeck.draw()
    var playerCard2 = new Card(card.point,card.suit);

    //the player will take the cards and will be added to their hand (Global variable)
    playerHand = new Hand();
    playerHand.addCard(playerCard1)
    playerHand.addCard(playerCard2)

    //same as above for the dealer
    var card = tableDeck.draw()
    var dealerCard1 = new Card(card.point,card.suit);
    var card = tableDeck.draw()
    var dealerCard2 = new Card(card.point,card.suit);


    dealerHand = new Hand();
    dealerHand.addCard(dealerCard1)
    dealerHand.addCard(dealerCard2)

    //display their hands on the screen
    $('#player-hand').append('<img class = "cards" src='+playerCard1.getImageUrl()+'>')
    $('#player-hand').append('<img class = "cards" src='+playerCard2.getImageUrl()+'>')
    $('#dealer-hand').append('<img class = "cards" src='+dealerCard1.getImageUrl()+'>')
    $('#dealer-hand').append('<img class = "cards" src='+dealerCard2.getImageUrl()+'>')

    //display their points on the screen
    $('#player-points').text(playerHand.getPoints())
    $('#dealer-points').text(dealerHand.getPoints())
  });



  //HIT
  $('#hit-button').click(function(){

    // let the player acquire a hit card from the deck
    var card = tableDeck.draw()
    var playerHitCard = new Card(card.point,card.suit);

    //add this card to the player hand
    playerHand.addCard(playerHitCard)

    //display this card on the screen
    $('#player-hand').append('<img class = "cards" src='+playerHitCard.getImageUrl()+'>')

    //display updated score
    $('#player-points').text(playerHand.getPoints())

    win(dealerHand,playerHand)
  });

  //STAND
  $('#stand-button').click(function(){
    //Dealer must take a card if the sum of their points is less than 17
    if(Number(dealerHand.getPoints()) < 17){
      // let the dealer acquire a stand card from the deck
      var card = tableDeck.draw()
      var dealerStandCard = new Card(card.point,card.suit);

      //add this card to the player hand
      dealerHand.addCard(dealerStandCard)

      //display this card on the screen
      $('#dealer-hand').append('<img class = "cards" src='+dealerStandCard.getImageUrl()+'>')

      //display updated score
      $('#dealer-points').text(dealerHand.getPoints())

    //otherwise the dealer does not need to take more cards
    }else{
      $('#stand-button').toggle();
    }
    win(dealerHand,playerHand)
  });

  //PLAY AGAIN
  $('#reset-button').click(function(){
    //reset all points, deck are togge buttons to be ready for a new game
    $('#reset-button').toggle();
    $('#deal-button').toggle();
    $('#player-points').text("0");
    $('#dealer-points').text("0");
    $('#player-hand').text("");
    $('#dealer-hand').text("");
    $('#result').text("");
    });
});
