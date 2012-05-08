var guessesLeft = 10;
var highScores = [];
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
	guessesLeft = guessesLeft -1;
	$("#guessesLeft").html(guessesLeft);
	if(guessesLeft < 1)
	{
		lose();
	}
}

function tooHigh(guess)
{

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

}

function win()
{
	var name=prompt("Congrats! What's your name?", "Yong Bakos");

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

}

function updateScore(score) {
  $('h2#score span#guessesLeft').append(score);
}