//array of all button colors
var btnColors = ["red", "blue", "green", "yellow"];
//array for simon's patterns
var gamePattern = [];
//array for player's selections
var userPattern = [];
//sets started as false upon page load
var started = false;
//sets level as 0 upon page load
var level = 0;

//listens for button click and executes
$(".btn").click(function() {
  if ($(this).hasClass("btn-warning")) {
    //if started is false then executes
    if (!started) {
      //changes h1
      $("#level-title").text("Level " + level);
      //executes function
      nextSequence();
      //started is set to true
      started = true;
    } else {
      playSound("wrong");
      //updates body with a red flash
      $("body").toggleClass("game-over");
      //after half a second removes the class
      setTimeout(function() {
        $("body").toggleClass("game-over");
      }, 250);
      $("#level-title").text("Press game buttons");
    }
  } else {
    if (!started) {
      playSound("wrong");
      //updates body with a red flash
      $("body").toggleClass("game-over");
      //after half a second removes the class
      setTimeout(function() {
        $("body").toggleClass("game-over");
      }, 250);
      $("#level-title").text("Please press Start");
    } else {
      //gets the id of selected button and stores in a variable
      var userChosenColor = $(this).attr("id");
      //adds the variable to selected array;
      userPattern.push(userChosenColor);
      //executes a function
      playSound(userChosenColor);
      animatePress(userChosenColor);
      //-1 as array starts with 0 and the last element is array length - 1
      checkAns(userPattern.length - 1);
    }
  }
});

function checkAns(currentLevel) {
  //checks if the last pattern of player and simon matches
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    //checks if the lenghts of player and simon matches
    if (userPattern.length === gamePattern.length) {
      //executes a function after 1 second
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    //updates body with a red flash
    $("body").toggleClass("game-over");
    //after half a second removes the class
    setTimeout(function() {
      $("body").toggleClass("game-over");
    }, 250);
    //updates the header
    $("#level-title").text("Game Over! Press start to Restart");
    startOver();
  }
}

function nextSequence() {
  //resets user array
  userPattern = [];
  //increments level
  level++;
  //updates the h1
  $("#level-title").text("Level " + level);
  //creates a random number between 0 to 4 and stores in a variable
  var randomNum = Math.floor(Math.random() * 4);
  //selects random color name from the array using previous num and stores in a variable
  var randomChosenColor = btnColors[randomNum];
  //adds the color to selected array
  gamePattern.push(randomChosenColor);
  //selects id and animates
  $("#" + randomChosenColor).fadeIn(250).fadeOut(250).fadeIn(250);
  //executes a function
  playSound(randomChosenColor);
}

function animatePress(currentColor) {
  //selects a certain class and adds it
  $("." + currentColor).toggleClass("pressed");
  //removes the class after 0.3 sec
  setTimeout(function() {
    $("." + currentColor).toggleClass("pressed");
  }, 300)
}

function playSound(fileName) {
  //selects file and stores in a variable
  var audio = new Audio(fileName + ".mp3");
  //plays the audio
  audio.play();
}

function startOver() {
  //resets the variables to start a new game
  level = 0;
  gamePattern = [];
  started = false;
}
