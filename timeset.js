function TimeSet() {
	this.timers = {};
	this.results = [];
}

/* Start timer corresponding to name */
TimeSet.prototype.start = function(name) {
	let t = process.hrtime();
	let id = timer_id_for(name, "-start");

	if (this.timers[id] == undefined) {
		this.timers[id] = t;
	}
}

/* End timer corresponding to name */
TimeSet.prototype.end = function(name) {
	let start = timer_id_for(name, "-start");
	let end = process.hrtime(this.timers[start]);

	if (this.timers[start] != undefined) {
		let id = timer_id_for(name, "-end");
		this.timers[id] = end;
		let elapsedTime = this.elapsedTimeFor(name);
		let logName = name.charAt(0).toUpperCase() + name.slice(1) + ": ";
		this.results.push(String(logName + elapsedTime));
	}
}

/* Return string containing elapsed time for timer with 
 * name 'name', in order (seconds, milliseconds, nanoseconds)
 */
TimeSet.prototype.elapsedTimeFor = function(name) {
	let id = timer_id_for(name, "-end");
	let timer = this.timers[id];
	let ns = String(Number(timer[1]) + "ns");
	let ms = String(Number(timer[1] / 1000000).toFixed(3) + "ms");
	let sec = String(timer[0] + "s");
	let formatted = "(" + sec + ", " + ms + ", " + ns + ")";
	return formatted;
}

/* Return all timers and associated elapsed times */
TimeSet.prototype.log = function() {
	let result = "";

	for (let i=0; i<this.results.length; i++) {
		result += String(this.results[i] + "\n");
	}

	return result;
}

function timer_id_for(name, type) {
	return name.replace(/\s/g, '').toLowerCase().concat(type);
}

module.exports = TimeSet;





