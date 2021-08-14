var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false; //a way to keep track of whether if the game has started or not

var level = 0; //level that start with 0

//***start the game***//
//to detect any key is pressed
$(document).keypress(function() {

  //when keypress happens for the first time, call nextSequence().
  if (!started) { //if not started

    $("#level-title").text("level " + level);

    nextSequence();
    started = true;
  }
});


//check which button is clicked by the player
$(".btn").click(function() {
  var userChosenColour = this.id; //or $(this).attr("id")
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1); //length - 1 = the index of the last answer in the array
});


//check player answer (gamePattern vs. userClickedPattern)
function checkAnswer(currentLevel) {

  //to check if the last answer is correct
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    console.log(gamePattern);
    console.log(userClickedPattern);

    //check if the sequence is correct
    for (var i = 0; i < userClickedPattern.length; i++) {
      //check against gamePattern every user's click
      if (gamePattern[i] !== userClickedPattern[i]) {
        console.log("wrong sequence");
        playSound("wrong");
        gameOver(); //flash background when pressed wrong button
        $("#level-title").text("Game Over, Press Any Key to Restart"); //change title
        startOver(); //restart the game

      } else {
        console.log("correct sequence")
      }
    }

    //Call nextSequence() when user finish all the clicks in sequence for the current level
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }

  } else {
    console.log("wrong already");
    playSound("wrong");
    gameOver();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


//show the sequence to the user with animations and sounds
function nextSequence() {

  //reset the userClickedPattern to an empty array ready for the next level
  userClickedPattern = [];

  //increase the level by 1 every time nextSequence is called
  level++;

  //update the h1 with the current level
  $("#level-title").text("level " + level);

  //choose random color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //flash the sound for the button colour selected
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //play the sound for the button colour selected
  playSound(randomChosenColour);
};


//add sounds to buttons
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};


//Add Animations to User Clicks
function animatePress(currentColour) {
  //add class "pressed"
  $("#" + currentColour).addClass("pressed");

  //remove class "pressed" after 100 millionseconds
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

//flash background when game over
function gameOver() {
  //add class
  $("body").addClass("game-over");

  //remove class
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
};


//restart the game
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
