var R = 3;
var T = 5;
var S = 0;
var P = 1;

var scores = {
	'CC' : [R, R],
	'CD' : [S, T],
	'DC' : [T, S],
	'DD' : [P, P]
}

var Game = function(bot1, bot2, num_rounds) {

	for (var i = 0; i < num_rounds; i++) {
		bot1.play(bot2);
		var bot1_move = bot1.history[i];
		var bot2_move = bot2.history[i];
		var bot_scores = scores[bot1_move + bot2_move];
		bot1.addScore(bot_scores[0]);
		bot2.addScore(bot_scores[1]);
	}
}


function create_array(N) {
	arr = Array(N);
	for (var i = 1; i <= 100; i++) {
		arr[i] = i;
	}
	return arr;
}