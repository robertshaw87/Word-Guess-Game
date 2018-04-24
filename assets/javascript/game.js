// declare initial variable values
var wins = 0;
var losses = 0;
var guessesAlloted = 7;
var guessesLeft, guessedLetters, targetWord, userGuess, userWord;

// make an array of potential words
var dictionary = ["sad", "bad", "cool"];

// function to get a random element from an input array
function getRandomElement(inputArray){
    return inputArray[(Math.floor(Math.random() * (inputArray.length - 1)))];
}

// return an array of the same length as the input array with each element replaced with asterisks
// this should not change the input array
function obfuscateArray(inputArray){
    var tempArray = inputArray.slice();
    tempArray.forEach(
        function(current, index){
            tempArray[index] = "*";
    })
    return tempArray;
}
// make an array of the letters already guessed by the user
// decide on a random word to be the target word
// turn the word into an array of its component letters
// make an array of place holder characters to represent
//  correctly guessed letters by the player
function gameReset() {
    guessedLetters = [""];
    guessesLeft = guessesAllotted;
    targetWord = getRandomElement(dictionary).split("");
    userWord = obfuscateArray(targetWord);
    
}

// get user guess
// clean user input

// check user input to make sure it is a new guess

// add the letter to the already guessed array

// if it is a letter within the correct word array,
// replace the correct placeholder characters in the guess array 
//  with the letter guessed

// if the guess array is completed and equal to the word array,
// add 1 to wins, reset guesses, already guessed array,
//  and guess array to default
// set a new random word to be guessed and 
//  format the guess array and word array

// if it is not a correct letter,
// add guess to already guessed array, reduce guesses left

// if there are no guesses left, increment losses, reset game
// else go back to getting user input