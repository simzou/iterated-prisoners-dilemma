var static_bots = {
	'cooperator': function() { return new CooperatorBot(); },
	'defector': function() { return new DefectorBot(); },
	'titfortat': function() { return new TitForTatBot(); },
	'pavlov': function() { return new PavlovBot(); },
	'random': function() { return new VariableBot(0.5); },
	'vindictive': function() { return new VindictiveBot(); },
	'friendly': function() { return new VariableBot(0.75); },
	'greedy': function() { return new VariableBot(0.25); }
}

function create_bots(players) {
	var bots = []
	id = 0;
	for (var i = 0; i < players.length; i++) {
		console.log(players[i]);
		if (players[i] in static_bots)
			bots.push(static_bots[players[i]]());
	}
	return bots;
}

function run_tourney(players, opponents, num_rounds) {
	var records = {};
	var log = "";
	for (var i = 0; i < players.length; i++) {
		for (var j = 0; j < opponents.length; j++) {



			//console.log(players[i].name + " is battling " + opponents[j].name);
			log += players[i].nameid + " is battling " + opponents[j].name + "<br />";
			Game(players[i], opponents[j], num_rounds);
			player_i_score = sum(players[i].scores);
			player_j_score = sum(opponents[j].scores);

			// console.log(players[i].name + " scored " + player_i_score);
			// console.log(opponents[j].name + " scored " + player_j_score);
			// console.log("");
			log += players[i].nameid + " scored " + player_i_score + "<br />";
			log += opponents[j].nameid + " scored " + player_j_score + "<br /><br />";

			if (players[i].nameid in records) 
				records[players[i].nameid] += player_i_score;
			else
				records[players[i].nameid] = player_i_score;
				
			players[i].reset();
			opponents[j].reset();
		}
	}
	console.log("Sum of scores");
	for (record in records) {
		console.log(record + ": " + records[record]);
	}
	console.log(records);
	$("#battle-log").hide();
	$("#battle-log").append(log);
	console.log(log);
	return records;

}

var bot_names = [
			   // 'cooperator', 
			   // 'titfortat', 
			   'defector',
			   'defector',
			   'defector',
			   'defector',
			   'defector',
			   'pavlov', 
			   'pavlov', 
			   'pavlov', 
			   'pavlov', 
			   'pavlov', 
			   'titfortat',
			   'titfortat',
			   // 'pavlov',
			   'random', 
			   // 'vindictive',
			   // 'friendly',
			   // 'greedy',
			   ]
var players = create_bots(bot_names);
var opponents = create_bots(bot_names);
var num_rounds = 200;

function draw_chart(records) {
	var labels = [];
	var average_scores = [];
	var entries = [];
	for (record in records) {
		var entry = {};
		entry['name'] = record;
		entry['avg'] = records[record] / players.length;
		entries.push(entry);
		//labels.push(record);
		//average_scores.push(records[record]/players.length);
	}

	entries = _.sortBy(entries, 'avg');
	entries.reverse();
	labels = _.map(entries, 'name');
	avgs = _.map(entries, 'avg');
	console.log(entries);
	console.log(labels);
	console.log(avgs);
	var data = {
	    labels: labels,
	    datasets: [
	        {
	            label: "Mean Scores simulation 1",
	            fillColor: "rgba(151,187,205,0.5)",
	            strokeColor: "rgba(151,187,205,0.8)",
	            highlightFill: "rgba(151,187,205,0.75)",
	            highlightStroke: "rgba(151,187,205,1)",
	            data: avgs
	        }
	    ]
	};

	var options = {
		responsive: true
	}


	var template = _.template($("#scores-list-template").html());
	var template_html = template({
		'entries': entries
	});
	$("#scores-list").html(template_html);

	var ctx = $("#barchart").get(0).getContext("2d");
	var chart = new Chart(ctx).Bar(data, options);
}
