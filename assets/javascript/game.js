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
var dictionary = ["sad", "bad", "cool", "random", "super"];

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
    getElem("wordProgress").textContent = wordProgress.join(" ");
    getElem("guesses").textContent = guessesLeft;
    getElem("playerChoices").textContent = "";
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
        getElem("wordProgress").textContent = wordProgress.join(" ");

        // check if word has been completed
        if (wordProgress.join("") === targetWord.join("")) {
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



// add the letter to the already guessed array




// if the guess array is completed and equal to the word array,
// add 1 to wins, reset guesses, already guessed array,
//  and guess array to default
// set a new random word to be guessed and 
//  format the guess array and word array



// if there are no guesses left, increment losses, reset game
// else go back to getting user input