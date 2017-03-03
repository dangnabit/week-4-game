//delare variable for that game
var wins = 0;
var loss = 0;
var score = 0;
var target;
var crysVal = [];
var turns = 0;
var ruleClk = 0;
var rulesShown = true;
var rot;
//declaring jQuery elements for easy reference
var $targetScore = $("#targetScore");
var $currentScore = $("#currentScore");
var $crystal = $(".crystal");
var $turns = $("#turns");
var $wins = $("#wins");
var $losses = $("#losses");
var $rules = $("#rules");
var $ruleBtn = $(".rules")


//Function for when any crystal is clicked
gemClick = function(crys) {
    var ammount = crysVal[$(crys).attr("crys")];
    score = score + ammount;
    $currentScore.text(score);
}

//Hover animation function
gemAnimate = function(crys) {
    $(crys).addClass('hueRotate');
}

//randomly generates target number for the game
generateTarget = function() {
    target = 19 + Math.floor(Math.random() * 100);
    $targetScore.text(target);
}

//creates the values for each crystal in an array. 
generateCrysVal = function() {
    crysVal = []; //empties Value array

    //for loop runs until crysVal has 4 values. If statement checks each entry against the current random value to make sure no crystals have duplicates. 
    for (var i = 0; crysVal.length < 4; i++) {
        var tempRand = Math.ceil(Math.random() * 12);
        if ($.inArray(tempRand, crysVal) == -1) {
            crysVal.push(tempRand);
        }
    }
}

//new game funtion to get us reset back to the initial 
newGame = function() {
    generateTarget();
    generateCrysVal();
    score = 0;

}

turnsUp = function() {
    turns++;
    $turns.text(turns);
}

showRules = function() {
    if (rulesShown) {
        $rules.addClass("hide");
        $(".hideBtn").text("Show Rules");
        rulesShown = false;
    } else {
        $rules.removeClass("hide");
        $(".hideBtn").text("Hide Rules");
        rulesShown = true;
    }
}



$(document).ready(function() {
    generateTarget();
    generateCrysVal();
    console.log(crysVal);

    $currentScore.text(score);
    $wins.text(wins);
    $losses.text(loss);
    $turns.text(turns);



    $crystal.hover(function() {
        gemAnimate(this);
    }, function() {
        $(this).removeClass("hueRotate");
    });

    $crystal.on("click", function() {
        gemClick(this);
        turnsUp();

        if (score == target) {
            wins++;
            $wins.text(wins);

            newGame();
            rulesShown = false;
            showRules();
            $rules.html("<h3>You Win! I'm impressed by your mathmatical prowess. <br> Your next target is: </h3><h2> " + target + "</h2>");
            $currentScore.text(score);

            

        } else if (score > target) {
            loss++;
            $losses.text(loss);

            newGame();
            $currentScore.text(score);
            rulesShown = false;
            showRules();
            $rules.html("<h3>You went over the target. I recommend not doing that. <br> Your next target is: </h3><h2>" + target + "</h2>");

        };
    })

    $ruleBtn.on("click", function() {
        ruleClk++;
        if (ruleClk == 6) {
            ruleClk = 4;
            rulesShown = false;
            showRules();
        }
        if (ruleClk == 1) {
            $ruleBtn.text("Really?");
        } else if (ruleClk == 2) {
            $ruleBtn.text("Are you sure you need to hear this?");
        } else if (ruleClk == 3) {
            $ruleBtn.text("It's not that complicated of a game...");
        } else if (ruleClk == 4) {
            $ruleBtn.text("Fine.").delay(800);
            rulesShown = false;
            showRules();

            $rules.html("<h3>Click on the crystals to increase your score. Pay attention though. Each crystal increses you score by a different value and changes every round. Don't be discouraged if you can't complete this challenge. </h3> <h2>Math is hard.</h2>")
        } else if (ruleClk == 5) {
            $ruleBtn.text("Need to hear the rules again, huh?")
        }

    })

    $("#hideBtn").on("click", function() {
        showRules();
    })




});
