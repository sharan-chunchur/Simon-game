

var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern= [];
var started = false;
var level=1;
var i=0;
function nextSequence(){
    $("h1").text("Level "+level++);
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
};

$(".btn").click(function(){
    if(started){
        var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    }
    
});

function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },50);
}


$(document).keydown(function(){
    if(!started){
        started = true;
        nextSequence();
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        playSound(userClickedPattern[currentLevel]);
        if(userClickedPattern.length === gamePattern.length){
            userClickedPattern = [];
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        $("h1").text("Game over!!!  press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },250);
        playSound("wrong");
        started = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
}