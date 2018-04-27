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
    console.log("compare arrays call with [" + arr1 + "] and [" + arr2 + "]");
    // return false if either argument isn't an array
    if (!Array.isArray(arr1) || !Array.isArray(arr2)){
        console.log("inputs aren't both arrays");
        return false;
    }
    // return false if the two arrays aren't the same length
    if (arr1.length !== arr2.length) {
        console.log("input arrays aren't the same length");
        return false;
    }
    // iterate through every element of input arrays
    console.log("iterating through arrays");
    for (var i=0; i < arr1.length; i++){
        // check for nested arrays
        if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            // compare nested arrays, if not equivalent, return false, 
            // else continue iterating
            console.log("nested array found, recursing");
            if (!compareArrays(arr1[i], arr2[i])){
                console.log("nested array elements not equivalent");
                return false;
            }
            console.log("nested array recursion end");
        } else if (arr1[i] !== arr2[i]) {
        // if not nested arrays, check value of elements against each other
            console.log("checking array elements " + arr1[i] + " and " + arr2[i]);
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
    getElem("guesses").textContent = guessesLeft;
    getElem("playerChoices").textContent = "";
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
        letterCard.attr("class","card m-1 p-1 pt-2 pb-2 col-md-1 bg-dark text-light");
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

function displayGuessesLeft() {

}

gameReset();

// get user guess
document.onkeyup = function(userInput) {
    
    getElem("playerMessage").textContent = "";
    
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
        getElem("playerChoices").textContent = guessedLetters.join(" ");

        // if there are no guesses left, increment losses, reset game
        if (guessesLeft <= 0){
            losses += 1;
            getElem("playerMessage").textContent = "You ran out of guesses! The correct word was " + targetWord.join("") + "!";
            gameReset();
        }
    }

    getElem("wins").textContent = wins;
    getElem("losses").textContent = losses;
    getElem("guesses").textContent = guessesLeft;

}