const Timer = require('./lib/timer.js');

function TimeSet() {
	this.timers = {};
}

TimeSet.prototype.add = function(name) {
	let id = timer_id_for(name);

	if (this.timers[id] == undefined) {
		let timer = new Timer(name);
		this.timers[id] = { 
			name: name,
			timer: timer,
			marks: [] 
		}
	}
}

TimeSet.prototype.start = function(name) {
	let id = timer_id_for(name);

	if (this.timers[id] != undefined) {
		this.timers[id].timer.start();
	}
}

TimeSet.prototype.mark = function(name, mark) {
	
	let markTimer = new Timer(mark);
	markTimer.start();
	
	let id = timer_id_for(name);

	if (this.timers[id] != undefined) {

		if (this.timers[id].marks.length > 0) {
			let index = this.timers[id].marks.length;
			this.timers[id].marks[index-1].end();
		}

		this.timers[id].marks.push(markTimer);
	}
}

TimeSet.prototype.end = function(name) {
	let id = timer_id_for(name);

	if (this.timers[id] != undefined) {

		if (this.timers[id].marks.length) {
			let index = this.timers[id].marks.length;
			this.timers[id].marks[index-1].end();
		}

		this.timers[id].timer.end();
	}
}

TimeSet.prototype.log = function(name) {
	let id = timer_id_for(name);

	if (this.timers[id] != undefined) {
		let logString = "";

		let start = this.timers[id].timer.startTime;
		let end = this.timers[id].timer.endTime;
		let elapsed = end - start;
		
		logString += "---------------\n"
		logString += name.charAt(0).toUpperCase() + name.slice(1) + ":\n\n"

		let marks = this.timers[id].marks;
		for (let i=0; i<marks.length; i++) {
			let start = marks[i].startTime;
			let end = marks[i].endTime;
			let elapsed = end - start;
			
			logString += String(marks[i].name + ": " + format_time(elapsed) + "\n");
		}
		logString += "\n"
		logString += String("Elapsed: " + format_time(elapsed) + "\n");
		logString += "---------------\n"
		console.log(logString);
	}
}

function format_time(time) {
	let ns = String(time + "ns");
	let ms = String(Number(time / 1000000).toFixed(3) + "ms");
	let s = String(Number(time / 1000000000).toFixed(3) + "s");
	let formattedString = "(" + s + ", " + ms + ", " + ns + ")";
	return formattedString;
}

function timer_id_for(name) {
	return name.replace(/\s/g, '').toLowerCase();
}






























