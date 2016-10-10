"use strict";

console.log('cheese and puppies');

// We are using 'cheese' as the answer and 'e' as the guess for now.

let answer = "cheese";
let status = createStatus(answer);


function createStatus (answer_string) {
  let status_array = [];
  for (let i = 0; i < answer_string.length; i++) {
    status_array.push("_");
  }
  return status_array;
}

function updateStatus (answer_string, status_array, guess_char) {
  // compare answer_string with guess_char then output and updated status_array.
  let isFound = false;
  for (let i = 0; i < answer_string.length; i++) {
    if (guess_char === answer_string[i]) {
      status_array[i] = guess_char;
      isFound = true;
    }
  }
  return {status: status_array, found: isFound};
}

function updateMessage (guessFeedbackObj){
  if (guessFeedbackObj === undefined){
    // TODO no magic numbers!
    return "yo what up!\nLet's play hangman\nYou have " + 8 + " tries.\nPlease insert a letter.\n" + status.join(" ");
  }
  if (guessFeedbackObj.found === false){
    return "oooopppsssiiieeesss\nYou have " + guessFeedbackObj.tries + " tries remaining.\nPlease try again.\nYour current status is\n" + guessFeedbackObj.status.join(" ");
  }
  if (guessFeedbackObj.found === true){
    return "Awesome\ntry again.\nYou have " + guessFeedbackObj.tries + " tries remaining.\nyour current status is\n" + guessFeedbackObj.status.join(" ");
  }
}

function makeGuess (){
  let guess;
  let guessFeedbackObj;
  let tries = 8;
  while (tries) {
    guess = prompt (updateMessage(guessFeedbackObj));

    // TODO: Make status more functional.

    guessFeedbackObj = updateStatus(answer, status, guess);
    status = guessFeedbackObj.status;
    guessFeedbackObj.tries = guessFeedbackObj.tries || tries;
    if (guessFeedbackObj.found) {
      if (guessFeedbackObj.status.join('') === answer) {
        alert ("Wow, you're something special, because you just won this game!");
        return true;
      }
    }
    else {
      tries--; // Only decreases with incorrect letters.
      guessFeedbackObj.tries = tries;
    }
    console.log(status);
  }
}

makeGuess();
