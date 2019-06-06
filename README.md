# TimeSet
Useful wrapper around the NodeJS process.hrtime() function. TimeSet allows you to easily mark points in your code to capture execution times, and view them later in second, millisecond, and nanosecond representations.

# Installation
**npm install timeset --save**

# Usage
```node
const TimeSet = require('timeset');
var timers = new TimeSet();
```
```node
timers.start("foo_time");
foo();
timers.end("foo_time");
```
```node
console.log(timers.log());
/* Foo_time: (0s, 1.05ms, 1050000ns) */
````
