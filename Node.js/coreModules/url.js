const { URL } = require('url');

const myURL = new URL('http://example.com/path?key=value');

// Access the query directly
console.log(myURL.search);                  // ?key=value

// Access query parameters
console.log(myURL.searchParams.get('key')); // value