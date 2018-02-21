
$("#timer").hide();
$("#newGame").hide();
$("#gameOver").hide();
$(".hideThis").hide();

$(document).ready(function() {
    
var time = 16;
var answers = [];
var rightAnswer;
var wrongAnswer;
var wins = 0;
var losses = 0;
var timeOut = 0;
var counter = 0;
var questUrl = "https://opentdb.com/api.php?amount=11&category=27";
var questGen;
var x = 0;
var display ="";
var holdArray = [];
var checkAns;



$("#start").on('click', function() {
	getQuestions();
	$("#gameStart").hide();
	$("#timer").show();
	$(".hideThis").show();
	setTime();
})

function setTime() {
    var counter = setInterval(function() { 
	time--;
	console.log(time);
	$("#timer").text("Time Remaining: " + time + " Seconds Left");
	if (time === 0) {
		stopTime();
		reset();
		timeOut++;
		getQuestions();
	}
 }, 1000);
}

function stopTime() {
	clearInterval(counter);
	time = 16;
}

function getQuestions() {
	$.ajax({
		url: questUrl,
		method: "GET",
	}).then(function(response){
		console.log(response);
		questGen = response.results;
			var quest = questGen[x].question;
			$("#question").html(quest).text();
			rightAnswer = questGen[x].correct_answer;
			wrongAnswer = questGen[x].incorrect_answers;
			wrongAnswer.push(rightAnswer);
			randomize();
			x++;
			endGame();

	})
}

function randomize() {
	    holdArray = wrongAnswer.sort(() => Math.random() - 0.5);
	    console.log(holdArray);
	for (var i = 0; i < holdArray.length; i++) {
		display = "<div>" + holdArray[i] + "</div><br>";
		$("#answer").append(display);
		$("#answer").children().addClass("btn btn-info mt-1 mb-3 text-center");
		
	}	
}

function reset() {
	$('#answer').empty();
	$("#question").empty();
	answers = [];

}

function checkWin() {
	$("#answer").on('click', function(event) {
		checkAns = event.target.innerHTML;
		if(checkAns.length >= 100) {return "";}
		if(checkAns === rightAnswer) {
			reset();
			wins++;
			$("#wins").html("Wins:" + wins);
			stopTime();
			getQuestions();
		}

		else {
			reveal();
			reset();
			losses++;
			$("#losses").html("Losses:" + losses);
			stopTime();
			getQuestions();
		}
	})
}

checkWin();

function reveal() {
		alert("Wrong, the correct answer was " + rightAnswer + ".");

}

function endGame() {
	if (x === 11) {
		console.log("game-over");
		$("#timeOuts").html("Time-outs:" + timeOut);
		$("#timer").hide();
		$(".hideThis").hide();
		$("#gameOver").show();
		$("#timeOuts").html("Time-outs:" + timeOut);
	}
}
});
