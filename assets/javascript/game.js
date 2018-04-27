// declare initial variable values
var wins = 0;
var losses = 0;
// this is the number of guesses the user has
var guessesAllotted = 7;
var guessesLeft, guessedLetters, targetWord, userGuess, wordProgress;

// make an array of the alphabet
var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
alphabet = alphabet.split("");

// make an array of potential words
var dictionary = ["Eridanus", "Scorpius", "Crux", "Andromeda", "Cygnus", "Cepheus", 
                    "Draco", "Delphinus", "Pegasus", "Perseus", "Corvus", "Pisces", "Vela", "Aquila", "Serpens", 
                    "Phoenix", "Vulpecula", "Carina", "Hercules", "Hydra", "Delphinus", "Lyra"];

// get a pointer to an element in the html when provided with a link
function getElem(id) {
    return document.getElementById(id);
}

// function to get a random element from an input array
function getRandomElement(inputArray){
    return inputArray[(Math.floor(Math.random() * inputArray.length))];
}

// return an array of the same length as the input array with each element replaced with asterisks
// this should not change the input array
function obfuscateArray(inputArray){
    var tempArray = [];
    for (var i=0; i<inputArray.length; i++){
        tempArray.push("*");
    }
    return tempArray;
}

// compares two input arrays and returns whether they're equivalent
// not used in this implementation, but it can handle nested arrays
function compareArrays(arr1, arr2) {
    // return false if either argument isn't an array
    if (!Array.isArray(arr1) || !Array.isArray(arr2)){
        return false;
    }
    // return false if the two arrays aren't the same length
    if (arr1.length !== arr2.length) {
        return false;
    }
    // iterate through every element of input arrays
    for (var i=0; i < arr1.length; i++){
        // check for nested arrays
        if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            // compare nested arrays, if not equivalent, return false, 
            // else continue iterating
            if (!compareArrays(arr1[i], arr2[i])){
                return false;
            }
        } else if (arr1[i] !== arr2[i]) {
        // if not nested arrays, check value of elements against each other
            return false;
        }
    }
    // returns true if the arrays pass all the above checks
    return true;
}


// make an array of the letters already guessed by the user
// decide on a random word to be the target word
// turn the word into an array of its component letters
// make an array of place holder characters to represent
//  correctly guessed letters by the player
function gameReset() {
    guessedLetters = [];
    guessesLeft = guessesAllotted;
    targetWord = getRandomElement(dictionary).toUpperCase().split("");
    wordProgress = obfuscateArray(targetWord);
    console.log(targetWord);
    getElem("wins").textContent = wins;
    getElem("losses").textContent = losses;
    // getElem("guesses").textContent = guessesLeft;
    displayGuessesLeft();
    displayGuessedLetters()
    // getElem("playerChoices").textContent = "";
    displayProgress();
}

// append an empty col to the element passed in as an argument
function appendEmptyCol(id){
    var emptyCol=$("<div>");
    emptyCol.attr("class", "col");
    id.append(emptyCol)
}

// this function displays the progress the player has made towards the word
function displayProgress() {
    var cardProgress = $("#wordProgress");
    cardProgress.empty();
    appendEmptyCol(cardProgress);

    for (var i=0; i<wordProgress.length; i++){
        var letterCard = $("<div>");
        letterCard.attr("class","card m-1 p-1 pt-2 pb-2 col-md-1 col-1 col-sm-1 bg-dark text-light word-progress");
        var cardText = $("<div>");
        cardText.attr("class", "card-text");
        var cardLetter = $("<h2>");
        cardLetter.text(wordProgress[i]);
        cardText.append(cardLetter);
        letterCard.append(cardText);
        cardProgress.append(letterCard);
    }
    appendEmptyCol(cardProgress);
}

// display one star for each guess the player has left
function displayGuessesLeft() {
    var guessesStars = $("#guessesLeft");
    guessesStars.empty();

    for (var i=0; i<guessesLeft; i++){
        var starPic = $("<div>");
        starPic.attr("class", "col-md-3 col-1 col-sm-1 m-0 p-0 guessesStar");
        starPic.append("<img height=auto width=100% src='assets/images/star.png' alt='star'>");
        guessesStars.append(starPic);
    }

}

// display the letters the player has already guessed
function displayGuessedLetters(){
    var wrongGuesses = $("#guessedLetters");
    wrongGuesses.empty();
    appendEmptyCol(wrongGuesses);

    for (var i=0; i<guessedLetters.length; i++){
        var letterCard = $("<div>");
        letterCard.attr("class","card m-1 p-0 pt-3 pb-2 col-md-1 col-1 col-sm-1 bg-danger text-light guessed-letters");
        var cardText = $("<div>");
        cardText.attr("class", "card-text");
        var cardLetter = $("<h4>");
        cardLetter.text(guessedLetters[i]);
        cardText.append(cardLetter);
        letterCard.append(cardText);
        wrongGuesses.append(letterCard);
    }

    appendEmptyCol(wrongGuesses);
}

function playerMessageAstronaut() {
    var message = $("#playerMessage");
    message.empty();
    message.append("<img id='astronautPic' height=120px width=auto src='assets/images/astronaut.png' alt='astronaut'>");
}
$(document).ready(function() {
    // reset the game to start everything off
    gameReset();
    playerMessageAstronaut();

    // lower the volume of the song so it's not deafening
    $("#fireflySong")[0].volume=.2;

    // get user guess
    document.onkeyup = function(userInput) {
        
        // display the astronaut as a default player message
        playerMessageAstronaut();
        
        // clean user input
        userGuess = userInput.key;
        userGuess = userGuess.toUpperCase();
        console.log("User Guess: " + userGuess);

        // ignore any key that isn't a letter
        if (-1 === alphabet.indexOf(userGuess)) {
            getElem("playerMessage").textContent = "Please guess a letter between A-Z.";
        } else if (-1 !== guessedLetters.indexOf(userGuess)) {
            // check user input to make sure it is a new guess
            getElem("playerMessage").textContent = "You have already guessed " + userGuess;
        } else if (targetWord.indexOf(userGuess) !== -1) {
            // if it is a letter within the correct word array,
            // replace the correct placeholder characters in the guess array 
            //  with the letter guessed
            for (var i=0; i < targetWord.length; i++){
                if (targetWord[i] === userGuess) {
                    wordProgress[i] = userGuess;
                }
            }
            displayProgress();
            // getElem("wordProgress").textContent = wordProgress.join(" ");

            // check if word has been completed
            if (wordProgress.join("") === targetWord.join("")) {
                // add 1 to wins, reset game
                wins += 1;
                getElem("playerMessage").textContent = "You guessed the correct word! It was " + targetWord.join("") + "!";
                gameReset();
            }

        } else {
            // if it is not a correct letter,
            // add guess to already guessed array, reduce guesses left
            guessedLetters.push(userGuess);
            guessesLeft -= 1;
            displayGuessedLetters()
            // getElem("playerChoices").textContent = guessedLetters.join(" ");

            // if there are no guesses left, increment losses, reset game
            if (guessesLeft <= 0){
                losses += 1;
                getElem("playerMessage").textContent = "You ran out of guesses! The correct word was " + targetWord.join("") + "!";
                gameReset();
            }
        }

        getElem("wins").textContent = wins;
        getElem("losses").textContent = losses;
        displayGuessesLeft();
        // getElem("guesses").textContent = guessesLeft;

    }
});