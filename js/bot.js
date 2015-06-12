var sum = function(arr) {
	var total = 0;
	for (var i = 0; i < arr.length; i++) {
		total += arr[i];
	}
	return total;
};

// functions taken from: http://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/
function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);
 
  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}
 
function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);
 
  var avg = sum / data.length;
  return avg;
}


id = 00;

var Bot = function () {
	this.scores = [];
	this.history = [];
	this.moves = 0;
	id++;
};

Bot.prototype.addScore = function (score) {
	this.scores.push(score);
};

Bot.prototype.printScore = function () {
	console.log(this.scores);
};

Bot.prototype.play = function(opponent) {
	self_move = this.strategy(opponent);
	opp_move = opponent.strategy(this);
	this.history.push(self_move);
	opponent.history.push(opp_move);
	this.moves += 1;
	opponent.moves += 1;
};

Bot.prototype.reset = function () {
	this.scores = [];
	this.history = [];
	this.moves = 0;
};

Bot.prototype.accumulate = function () {
	this.cumulative = this.scores;
	for (var i = 1; i < this.cumulative.length; i++) {
		this.cumulative[i] += this.cumulative[i-1];
	}
}
// DefectorBot always defects
function DefectorBot() {
	Bot.call(this);
	this.strategy = function(opponent) { return 'D'; }
	this.nameid = "DefectorBot" + " (id #" + id + ")";
	this.name = "DefectorBot";
};

DefectorBot.prototype = Object.create(Bot.prototype);
DefectorBot.prototype.constructor = DefectorBot;

// CooperatorBot always cooperates
function CooperatorBot() {
	Bot.call(this);
	this.strategy = function(opponent) { return 'C'; }
	this.nameid = "CooperatorBot" + " (id #" + id + ")";
	this.name = "CooperatorBot";
};

CooperatorBot.prototype = Object.create(Bot.prototype);
CooperatorBot.prototype.constructor = CooperatorBot;

// TitForTatBot cooperates at first and then imitates opponent
function TitForTatBot() {
	Bot.call(this);
	this.strategy = function(opponent) { 
		var moves = opponent.history.length;
		if (moves === 0)
			return 'C'; 
		else 
			return opponent.history[moves-1];
	}
	this.nameid = "TitForTatBot" + " (id #" + id + ")";
	this.name = "TitForTatBot";
};

TitForTatBot.prototype = Object.create(Bot.prototype);
TitForTatBot.prototype.constructor = TitForTatBot;

// VariableBot cooperates a % of the time based on parameter
function VariableBot(coop_percentage) {
	Bot.call(this);
	this.strategy = function(opponent) { 
		var num = Math.random();
		if (num < coop_percentage)
			return 'C'; 
		else 
			return 'D';
	};
	if (coop_percentage < 0.5) {
		this.nameid = "GreedyBot (" + coop_percentage + ")" + " (id #" + id + ")";
		//this.name = "GreedyBot (" + coop_percentage + ")";
		this.name = "GreedyBot";
	}
	else if (coop_percentage === 0.5) {
		this.nameid = "RandomBot" + " (id #" + id + ")";
		this.name = "RandomBot";
	}
	else {
		this.nameid = "FriendlyBot(" + coop_percentage + ")" + " (id #" + id + ")";
		//this.name = "FriendlyBot(" + coop_percentage + ")";
		this.name = "FriendlyBot";
	}
};

VariableBot.prototype = Object.create(Bot.prototype);
VariableBot.prototype.constructor = VariableBot;

// VindictiveBot cooperates until the opponent defects then defects always
function VindictiveBot() {
	Bot.call(this);
	this.slighted = false;
	this.strategy = function(opponent) { 
		var moves = opponent.history.length;
		if (moves === 0) return 'C';
		if (!this.slighted) {
			if (opponent.history[moves-1] === 'D')
				this.slighted = true;
		}
		if (this.slighted)
			return 'D';
		else
			return 'C';
	}
	this.nameid = "VindictiveBot" + " (id #" + id + ")";
	this.name = "VindictiveBot";
	this.reset = function () {
		this.history = [];
		this.scores = [];
		this.slighted = false;
		this.moves = 0;
	}
};

VindictiveBot.prototype = Object.create(Bot.prototype);
VindictiveBot.prototype.constructor = VindictiveBot;

// PavlovBot repeats move if previous outcome was positive else random
function PavlovBot() {
	Bot.call(this);
	this.slighted = false;
	this.strategy = function(opponent) { 
		if (this.moves === 0) 
			return 'C';
			// return Math.random() > 0.5 ? 'C' : 'D';
		else {
			if (this.scores[this.moves-1] === R || this.scores[this.moves-1] === T) {
				return this.history[this.moves-1];
			}
			else 
				return this.history[this.moves-1] === 'C' ? 'D' : 'C';
		}
	}
	this.nameid = "PavlovBot" + " (id #" + id + ")";
	this.name = "PavlovBot";
};

PavlovBot.prototype = Object.create(Bot.prototype);
PavlovBot.prototype.constructor = PavlovBot;