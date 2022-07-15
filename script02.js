var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts ❤️", "diamonds ♦️", "clubs ♣️", "spades ♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }

  // Return the shuffled deck
  return cardDeck;
};

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(makeDeck());

// initialised all the general parameter
var dealerHands = [];
var playerHands = [];
var dealerTotal = 0;
var playerTotal = 0;
var dealerFirstHand = "Dealer Hand: <br>";
var dealerOutput = "Dealer Hand: <br>";
var playerOutput = "Player Hand: <br>";
var extraOutput = "";
var dealerAceCount = 0;
var playerAceCount = 0;
var dealerTokensTotal = 500;
var playerTokensTotal = 500;

// Dealer draw a card and the card will be included into dealer hand
var dealerDrawCard = function (shuffledDeck) {
  var dealerDraw = shuffledDeck.pop();

  // If the card drew was Ace (the dealerAceCount is to calculate the number of Ace in hand)
  // If the card drew fall within the range of 2 to 9
  // If the card drew was 10 or above
  if (dealerDraw.rank == 1) {
    dealerAceCount++;
    if (dealerAceCount == 1) {
      dealerTotal = dealerTotal + 11;
    } else if (dealerAceCount > 1) {
      dealerTotal = dealerTotal + dealerDraw.rank;
    }
  } else if (dealerDraw.rank < 10) {
    dealerTotal = dealerTotal + dealerDraw.rank;
  } else if (dealerDraw.rank >= 10) {
    dealerTotal = dealerTotal + 10;
  }
  //dealerFirstHand is to show dealer's first card and hide the other
  if (dealerHands.length == 0) {
    dealerFirstHand =
      dealerFirstHand + `${dealerDraw.name} of ${dealerDraw.suit} <br>`;
  } else if (dealerHands.length >= 1) {
    dealerFirstHand = dealerFirstHand + `XX of ${dealerDraw.suit} <br>`;
  }
  //dealerOutput is to show all the dealer hand
  dealerOutput = dealerOutput + `${dealerDraw.name} of ${dealerDraw.suit} <br>`;
  dealerHands.push(dealerDraw);
  return dealerHands;
};

// Player draw a card and the card will be included into player hand
var playerDrawCard = function (shuffledDeck) {
  var playerCurrentCard = shuffledDeck.pop();

  // If the card drew was Ace (the dealerAceCount is to calculate the number of Ace in hand)
  // If the card drew fall within the range of 2 to 9
  // If the card drew was 10 or above
  if (playerCurrentCard.rank == 1) {
    playerAceCount++;
    if (playerAceCount == 1) {
      playerTotal = playerTotal + 11;
    } else if (playerAceCount > 1) {
      playerTotal = playerTotal + playerCurrentCard.rank;
    }
  } else if (playerCurrentCard.rank < 10 && playerCurrentCard.rank != 1) {
    playerTotal = playerTotal + playerCurrentCard.rank;
  } else if (playerCurrentCard.rank >= 10) {
    playerTotal = playerTotal + 10;
  }

  //playerOutput is to show all the dealer hand
  playerOutput =
    playerOutput +
    `${playerCurrentCard.name} of ${playerCurrentCard.suit} <br>`;
  playerHands.push(playerCurrentCard);

  console.log(playerCurrentCard);

  return playerHands;
};

//function for hit button
var playerDraw = function () {
  var playerExtraDraw = playerDrawCard(shuffledDeck);

  //If the card drew was the first Ace in hand, it counted as 11
  //Else if the card drew was not the first Ace in hand, it counted as 1
  //Else if the card drew was 2 to 9, add by its rank
  //Otherwise, add 10
  if (playerExtraDraw.rank == 1 && playerAceCount == 0) {
    playerAceCount++;
    playerTotal = playerTotal + 11;
  } else if (playerExtraDraw.rank == 1 && playerAceCount > 0) {
    playerAceCount++;
    playerTotal = playerTotal + playerExtraDraw.rank;
  } else if (playerExtraDraw.rank < 10 && playerExtraDraw.rank != 1) {
    playerTotal = playerTotal + playerExtraDraw.rank;
  } else if (playerExtraDraw.rank >= 10) {
    playerTotal = playerTotal + 10;
  }

  // if player hand total was lower than 15, must draw card
  // else if player hand total was between 16 to 21, ask for hit or stand
  // else if player hand total was over 21 and there was an Ace in hand, the total minus by 10
  // else if player hand total was over 21 and there was no Ace in hand, dealer wins
  // else if both player and dealer busted, it's a tie
  if (playerTotal <= 15) {
    extraOutput = `Your hand total now is lower than 16, you must draw a card. `;
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "hidden";
    document.getElementById("hit-button").className = "show";
    document.getElementById("stand-button").className = "hidden";

    var myOutputValue =
      dealerFirstHand + "<br><br>" + playerOutput + "<br><br>" + extraOutput;
  } else if (playerTotal > 15 && playerTotal <= 21) {
    extraOutput = `Your hand total now is ${playerTotal}, would you like to hit or stand? `;
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "hidden";
    document.getElementById("hit-button").className = "show";
    document.getElementById("stand-button").className = "show";
    myOutputValue =
      dealerFirstHand + "<br><br>" + playerOutput + "<br><br>" + extraOutput;
  } else if (playerTotal < 31 && playerTotal > 21 && playerAceCount >= 1) {
    playerTotal = playerTotal - 10;
    extraOutput = `Your hand total now is ${playerTotal}, would you like to hit or stand? `;
    playerAceCount--;
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "hidden";
    document.getElementById("hit-button").className = "show";
    document.getElementById("stand-button").className = "show";
    myOutputValue =
      dealerFirstHand + "<br><br>" + playerOutput + "<br><br>" + extraOutput;
  } else if (playerTotal > 21 && playerAceCount < 1 && dealerTotal <= 21) {
    extraOutput = "Player busted.<br>Dealer wins.";
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "show";
    document.getElementById("hit-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
    myOutputValue =
      dealerOutput + "<br><br>" + playerOutput + "<br><br>" + extraOutput;
  } else if (playerTotal > 21 && playerAceCount < 1 && dealerTotal > 21) {
    extraOutput = "Both Dealer and Player busted.";
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "show";
    document.getElementById("hit-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
    myOutputValue =
      dealerOutput + "<br><br>" + playerOutput + "<br><br>" + extraOutput;
  } else {
    myOutputValue = `Your hand total now is ${playerTotal}, BUSTED!!!`;
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "show";
    document.getElementById("hit-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
  }

  if (playerTotal == dealerTotal && playerTotal < 21) {
    extraOutput = extraOutput + `<br><br>It's a tie.`;
    myOutputValue =
      dealerOutput + "<br><br>" + playerOutput + "<br><br>" + extraOutput;
  }

  console.log(dealerOutput);
  console.log(playerOutput);
  console.log(playerTotal);
  console.log(playerExtraDraw);
  console.log(shuffledDeck.length);
  return myOutputValue;
};

//function for stand button
var showResults = function () {
  // Construct an output string to communicate which cards were drawn

  var myOutputValue = dealerOutput + "<br>" + playerOutput;

  // Compare computer and player cards by rank attribute
  // If computer card rank is greater than player card rank, computer wins

  if (dealerTotal > 21 && playerTotal > 21) {
    myOutputValue =
      myOutputValue + "<br>Both player and dealer are busted.<br>It's a tie.";
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "show";
    document.getElementById("hit-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
  } else if (dealerTotal > 21 && playerTotal <= 21) {
    myOutputValue = myOutputValue + "<br>Dealer busted.<br>Player wins.";
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "show";
    document.getElementById("hit-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
  } else if (dealerTotal <= 21 && playerTotal > 21) {
    myOutputValue = myOutputValue + "<br>Player busted.Dealer wins.";
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "show";
    document.getElementById("hit-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
  } else if (dealerTotal > playerTotal) {
    // Add conditional-dependent text to the output string
    myOutputValue = myOutputValue + "<br>Dealer wins.";
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "show";
    document.getElementById("hit-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
    // Else if computer card rank is less than player card rank, player wins
  } else if (dealerTotal < playerTotal) {
    myOutputValue = myOutputValue + "<br>Player wins!";
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "show";
    document.getElementById("hit-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
    // Otherwise (i.e. ranks are equal), it's a tie
  } else {
    myOutputValue = myOutputValue + "<br>It's a tie.";
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "show";
    document.getElementById("hit-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
  }

  // Return the fully-constructed output string
  return myOutputValue;
};

//function for Done button
var refreshPage = function () {
  dealerHands = [];
  playerHands = [];
  dealerTotal = 0;
  playerTotal = 0;
  dealerFirstHand = "Dealer Hand: <br>";
  dealerOutput = "Dealer Hand: <br>";
  playerOutput = "Player Hand: <br>";
  extraOutput = "";
  dealerAceCount = 0;
  playerAceCount = 0;
  //window.location.reload();
  document.getElementById("submit-button").className = "show";
  document.getElementById("refresh-button").className = "hidden";
  document.getElementById("hit-button").className = "hidden";
  document.getElementById("stand-button").className = "hidden";

  var myOutputValue = `Welcome to Sern's Cards! Click the START button to get started!`;
  
  if(shuffledDeck.length < 10){
    // shuffle Cards
    shuffledDeck = shuffleCards(makeDeck());
    myOutputValue += `<br>Dealer wash new cards.`;
  }
  
  console.log(dealerHands);
  console.log(playerHands);
  console.log(playerTotal);
  console.log(dealerTotal);
  console.log(dealerOutput);
  console.log(playerOutput);
  console.log(dealerAceCount);
  console.log(playerAceCount);
  return myOutputValue;
};

var main = function () {
  //Draw 2 cards for dealer and palyer each
  for (var i = 0; i < 2; i++) {
    var dealerCard = dealerDrawCard(shuffledDeck);
    var playerCard = playerDrawCard(shuffledDeck);
  }

  //Verify whether there is Black Jack; If yes, game over
  //Else if player hand total was 15, there is a chance for player to forfeit this round
  //Else if dealer hand total lower than 15, draw card until it's enough 16 or above
  //Else if player hand total lower than 15, ask player to draw another card
  //Else if both dealer and player total are lower than 15, both draw card
  if (dealerTotal == 21 || playerTotal == 21) {
    if (
      dealerAceCount == 1 &&
      dealerTotal == 21 &&
      playerAceCount == 1 &&
      playerTotal == 21
    ) {
      dealerTotal = "blackJack";
      playerTotal = "blackJack";
      dealerOutput = dealerOutput + `<br>Dealer had a Black Jack.`;
      playerOutput = playerOutput + `<br>Player had a Black Jack.`;
    } else if (dealerAceCount == 1 && dealerTotal == 21) {
      dealerTotal = "blackJack";
      dealerOutput = dealerOutput + `Dealer had a Black Jack.`;
    } else if (playerAceCount == 1 && playerTotal == 21) {
      playerTotal = "blackJack";
      playerOutput = playerOutput + `Player had a Black Jack.`;
    }
    // Construct an output string to communicate which cards were drawn

    var myOutputValue =
      dealerOutput + "<br><br>" + playerOutput + "<br><br>" + extraOutput;
  } else if (playerTotal == 15) {
    extraOutput = `<br>Your hand total is 15. <br>Would you like to draw another card or forfeit this round?`;
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "show";
    document.getElementById("hit-button").className = "show";
    document.getElementById("stand-button").className = "hidden";

    myOutputValue =
      dealerFirstHand + "<br><br>" + playerOutput + "<br><br>" + extraOutput;
  } else if (dealerTotal <= 15 && playerTotal > 15) {
    for (var j = 0; dealerTotal < 16; j++) {
      var dealerCard = dealerDrawCard(shuffledDeck);
    }
    extraOutput = `Your hands total now is ${playerTotal}, would you like to hit or stand? `;
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "hidden";
    document.getElementById("hit-button").className = "show";
    document.getElementById("stand-button").className = "show";

    myOutputValue =
      dealerFirstHand + "<br><br>" + playerOutput + "<br><br>" + extraOutput;
  } else if (dealerTotal > 15 && playerTotal < 15) {
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
    document.getElementById("hit-button").className = "show";
    extraOutput = `<br>Your hand total is lower than 15. <br>You must draw another card.`;

    myOutputValue =
      dealerFirstHand + "<br><br>" + playerOutput + "<br><br>" + extraOutput;
  } else if (dealerTotal <= 15 && playerTotal < 15) {
    for (var j = 0; dealerTotal < 16; j++) {
      var dealerCard = dealerDrawCard(shuffledDeck);
    }
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
    document.getElementById("hit-button").className = "show";
    extraOutput = `<br>Your hand total is lower than 15. <br>You must draw another card.`;

    myOutputValue =
      dealerFirstHand + "<br><br>" + playerOutput + "<br><br>" + extraOutput;
  } else if (dealerTotal > 15 && playerTotal > 15) {
    extraOutput = `Your hand total now is ${playerTotal}, would you like to hit or stand? `;
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "hidden";
    document.getElementById("hit-button").className = "show";
    document.getElementById("stand-button").className = "show";

    myOutputValue =
      dealerFirstHand + "<br><br>" + playerOutput + "<br><br>" + extraOutput;
  }

  console.log(dealerCard);
  console.log(dealerTotal);
  console.log(dealerHands);
  console.log(dealerOutput);

  console.log(playerCard);
  console.log(playerTotal);
  console.log(playerHands);
  console.log(playerOutput);

  // Compare computer and player cards by rank attribute
  // If computer card rank is greater than player card rank, computer wins

  if (playerTotal == "blackJack" && dealerTotal == "blackJack") {
    myOutputValue = myOutputValue + "<br>It's a tie.";
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "show";
    document.getElementById("hit-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
  } else if (playerTotal == "blackJack") {
    myOutputValue = myOutputValue + `<br>Player wins by Black Jack.`;
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "show";
    document.getElementById("hit-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
  } else if (dealerTotal == "blackJack") {
    myOutputValue = myOutputValue + `<br>Dealer wins by Black Jack.`;
    document.getElementById("submit-button").className = "hidden";
    document.getElementById("refresh-button").className = "show";
    document.getElementById("hit-button").className = "hidden";
    document.getElementById("stand-button").className = "hidden";
  }

  console.log(shuffledDeck.length);
  // Return the fully-constructed output string
  return myOutputValue;
};
