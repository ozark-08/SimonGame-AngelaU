var buttonColors = ["red","blue","green","yellow"]
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0

document.addEventListener("keydown",function () {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSeq();
        started = true;
    }
});


$(".btn").on('click',function() {
    // var userChosenColour = this.randomChosenColor;
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound("./sounds/" + userChosenColour + ".mp3");
    animatePress(userChosenColour);
    // console.log(userClickedPattern)
    checkAnswer(userClickedPattern.length-1);
    
})

//here currLevel is the index of the last clicked button[color]
function checkAnswer(currLevel) {
    if(userClickedPattern[currLevel] === gamePattern[currLevel]){
        // console.log("success");
        //both the user-pattern array and game-pattern array will increase dynamically at every click, so thats why no fix number can be compared in the below if statement
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSeq();
            }, 1000);
        }

    }
    else{
        // console.log("wrong");
        playSound("./sounds/wrong.mp3")
        $("body").addClass("game-over")

        setTimeout(() => {
           $("body").removeClass("game-over") 
        }, 200);

        $("#level-title").text("Game over, Press any key to Restart!")
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSeq() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNum = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound("./sounds/" + randomChosenColor + ".mp3");
}



function playSound(name) {
    var soundEffect = new Audio(name);
    soundEffect.play();
}


function animatePress(currentColor) {
    document.querySelector("."+currentColor).classList.add("pressed"); //-> using JS  

    setTimeout(() => {
        document.querySelector("."+currentColor).classList.remove("pressed");
    }, 100);
    
}

