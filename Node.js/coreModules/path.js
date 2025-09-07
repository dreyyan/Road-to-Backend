const path = require('path');

// `.join()` => join strings
console.log(path.join(__dirname, 'files', 'data.json'));

// `.extname()` => returns the file's extension name
console.log(path.extname('GUIDE.md'));