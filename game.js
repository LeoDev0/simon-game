var buttonColors = ["green", "blue", "yellow", "red"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

$(document).keydown(function(){
  if (start === false) {
    nextSequence();
    start = true;
    $("h1").text("Level "+level);
  }
});

$(".btn").click(function() {
  var userChosenColor = event.originalTarget.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  $("#"+userChosenColor).addClass("pressed");
  setTimeout(function(){
    $("#"+userChosenColor).removeClass("pressed");
  }, 100);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(150).fadeIn(150);
  level++;
  $("h1").text("Level "+level);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 300);
    restart();
    }
  }

function restart() {
  gamePattern = [];
  start = false;
  level = 0;
}

function playSound(color) {
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}
