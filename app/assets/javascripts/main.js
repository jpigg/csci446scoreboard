var guessesLeft = 10;
var highScores = [];
//var setNum = 50;
var setNum = Math.floor(Math.random()*100) + 1;

$(function() {
  updateScore(guessesLeft);
  populateHighScores();
});

function populateHighScores() {
	$.get('/scores', function(scores) {
		$('#highScores').empty();
		for (var i = 0; i < scores.length; i++) {
			$('#highScores').append("<p>" + scores[i].name + " " + scores[i].score + "</p>");
		}
	}
	);
}

function updateGuesses()
{
	//document.getElementById("guessesLeft").innerHTML = guessesLeft;
	guessesLeft = guessesLeft -1;
	$("#guessesLeft").html(guessesLeft);
	if(guessesLeft < 1)
	{
		lose();
	}
}

function tooHigh(guess)
{
	//alert("too high");
	$("#message").html(guess + " was too high!");
}

function tooLow(guess)
{
	$("#message").html(guess + " was too low!");
}

function lose()
{
	again("You Lost!");
}

function again(preMessage)
{
	$("#message").html(preMessage + " <a href=\"javascript:location.reload(true)\">Play again?</a>");
//	$("$btnguess").disable();
}

function win()
{
	var name=prompt("Congrats! What's your name?", "Yong Bakos");
	//highScores = new Array([34, "yourmom"], [9, "HarryJamesPotter"], [3, "ZedCthulhu"], [2, "NearlyDied"]);
	//var newScore = new Array([guessesLeft, name]);
	//populateHighScores(newScore);
	if(name.length > 0)
	{
		$.post('/scores', {score: {name: name, score: guessesLeft}})
	}
	populateHighScores();
	
	again("Congrats! You won!");
}

function checkGuess()
{
	var guess = $('#guess').val();
	if(guess < setNum)
	{
		tooLow(guess);
		updateGuesses();
	}
	else if(guess > setNum)
	{
		tooHigh(guess);
		updateGuesses();
	}
	else
	{
		win();
	}

//	alert("test");
}

function updateScore(score) {
  $('h2#score span#guessesLeft').append(score);
}