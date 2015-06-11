var cooperator = new CooperatorBot();
var defector = new DefectorBot();
var titfortat = new TitForTatBot();
var friendly1 = new VariableBot(0.7);
var friendly2 = new VariableBot(0.8);
var friendly3 = new VariableBot(0.9);
var friendly4 = new VariableBot(0.9);
var friendly5 = new VariableBot(0.9);
var friendly6 = new VariableBot(0.9);
var friendly7 = new VariableBot(0.9);
var random = new VariableBot(0.5);
var pavlov = new PavlovBot();
var greedy1 = new VariableBot(0.3);
var greedy2 = new VariableBot(0.1);
var greedy3 = new VariableBot(0.2);
var vindictive = new VindictiveBot();
var players = [
			   // titfortat, 
			   defector, 
			   cooperator
			   // vindictive,
			   // friendly1, friendly2, friendly3, 
			   // friendly4, friendly5, friendly6, friendly7, 
			   // random,
			   //friendly1,
			   // pavlov,
			   // greedy1, greedy2, greedy3,
			   //defector
			   ];
var records = {};
var num_rounds = 100;
$(document).ready(function () {
	for (var i = 0; i < players.length; i++) {
		for (var j = i + 1; j < players.length; j++) {

			console.log(players[i].name + " is battling " + players[j].name);
			Game(players[i], players[j], num_rounds);
			player_i_score = sum(players[i].scores);
			player_j_score = sum(players[j].scores);

			console.log(players[i].name + " scored " + player_i_score);
			console.log(players[j].name + " scored " + player_j_score);
			console.log("");

			if (i !== j) {
				if (players[i].name in records) 
					records[players[i].name] += player_i_score;
				else
					records[players[i].name] = player_i_score;
				
				if (players[j].name in records) 
					records[players[j].name] += player_j_score;
				else
					records[players[j].name] = player_j_score;
			}

			var chart = draw_chart(players[i], players[j], num_rounds);
			var legend = chart.generateLegend();
			$("#legend").append(legend);

			players[i].reset();
			players[j].reset();
		}
	}
	console.log("Sum of scores");
	for (record in records) {
		console.log(record + ": " + records[record]);
	}
	console.log(records);

});


