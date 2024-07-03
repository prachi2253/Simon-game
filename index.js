
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


var started = false;


var level = 0;


$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkanswer(userClickedPattern.length-1);
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
var i = 100;
function checkanswer(currentlevel)
{
    if(gamePattern[currentlevel]=== userClickedPattern[currentlevel]){
        console.log("success");
        if(gamePattern.length == userClickedPattern.length){

            setTimeout(function(){
                nextSequence();
            } , i);
           
            if(i<=10){
                i= i/10;
            }
        }
    }
    else{
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $(document).addClass("game-over");
        var wrong = ('sounds/wrong.mp3');
        wrong.play();

        setTimeout(function(){
            $(document).removeClass("game-over")
        } , 200);

        startover();
    }
}
function startover(){
    level =0;
    started = false;
    gamepattern=[];
    userClickedPattern=[];

}


