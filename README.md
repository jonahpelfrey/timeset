# TimeSet
Useful wrapper around the NodeJS process.hrtime.bigint() function. TimeSet allows you to easily mark points in your code to capture execution times, and view them later in second, millisecond, and nanosecond representations.

# Installation
**npm install timeset --save**

# Usage
```node
const TimeSet = require('timeset');

var timeset = new TimeSet();
timeset.add("file-timer");
```
```node
timeset.start("file-timer");

timeset.mark("file-timer", "compression");
compressFile();

timeset.mark("file-timer", "upload");
uploadFile();

timeset.end("file-timer");
```
```node
let results = timeset.log("file-timer");
console.log(results);

/* 
  ---------------
  File-Timer:
  
  compression: (0.001s, 1.398ms, 1398457ns)
  upload: (0.001s, 0.652ms, 651894ns)

  Elapsed: (0.002s, 2.102ms, 2101682ns)
  ---------------
 */
````
