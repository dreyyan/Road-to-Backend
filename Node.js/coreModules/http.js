const http = require('http');

// `.createServer()` => 
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
        data: 'Hello World!',
    }));
});

server.listen(1234);