function display_players(players) {
	$("#players").html(players.join(', '));
}
$(document).ready(function () {
	var players_names = [];
	$(".success").click(function(){
		players_names.push(this.id);
		display_players(players_names);
	})
	$("#remove-button").click(function(){
		players_names.pop();
		display_players(players_names);
	})
	$("#run-button").click(function() {
		clear_divs();
		$("#chart-div").append('<h3 id="chart-title">Average Scores per Bot</h3>');
		$("#chart-div").append('<canvas id="barchart"></canvas>');
		players = create_bots(players_names);
		opponents = create_bots(players_names);
		var records = run_tourney(players, opponents, 200);
		draw_chart(records);

	})
	$("#battle-log-button").click(function() {
		$("#battle-log").toggle();
	});
	$("#clear-button").click(function(){
		players_names = [];
		display_players(players_names);
		id = 0;
		clear_divs();
	});

});

function clear_divs() {
	$("#battle-log").empty();
	$("#scores-list").empty();
	$("#chart-div").empty();

}