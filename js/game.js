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

var sum = function(arr) {
	var total = 0;
	for (var i = 0; i < arr.length; i++) {
		total += arr[i];
	}
	return total;
};

function create_array(N) {
	arr = Array(N);
	for (var i = 1; i <= 100; i++) {
		arr[i] = i;
	}
	return arr;
}

function draw_chart(bot1, bot2, N){
	bot1.accumulate();
	bot2.accumulate();
	var data = {
    labels: create_array(N),
    datasets: [
        {
            label: bot1.name,
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: bot1.cumulative
        },
        {
            label: bot2.name,
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: bot2.cumulative
        }
    ]
	};

	var ctx = document.getElementById("myChart").getContext("2d");
	var options = {
		responsive: false
	};
	var myNewChart = new Chart(ctx).Line(data, options);
	return myNewChart;
}
