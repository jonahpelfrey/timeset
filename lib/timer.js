function Timer(name) {
	this._name = name;
}

Object.defineProperty(Timer.prototype, 'name', {
	enumerable: true,
	get() { return this._name }
});

Object.defineProperty(Timer.prototype, 'startTime', {
	enumerable: true,
	get() { return this._startTime }
});

Object.defineProperty(Timer.prototype, 'endTime', {
	enumerable: true,
	get() { return this._endTime }
})

Timer.prototype.start = function() {
	this._startTime = Number(process.hrtime.bigint());
}

Timer.prototype.end = function() {
	this._endTime = Number(process.hrtime.bigint());
}

Timer.prototype.elapsed = function() {
	if (this.startTime != undefined && this.endTime != undefined) {
		return this.endTime - this.startTime;
	} else {
		return 0;
	}
}

module.exports = Timer;