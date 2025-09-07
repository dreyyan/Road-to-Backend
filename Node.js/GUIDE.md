# Node.js Cheatsheet & Tutorial

This document combines key Node.js concepts, commands, and examples into a single cheatsheet for quick reference and learning.

## Table of Contents
- [Check Node.js Version](#check-nodejs-version)
- [Node Module System](#node-module-system)
- [File System Operations](#file-system-operations)
- [Event Handling](#event-handling)
- [Global Objects](#global-objects)
- [Module Scope & Wrapper Function](#module-scope--wrapper-function)
- [Operating System Information](#operating-system-information)
- [Basic HTTP Server](#basic-http-server)
- [Custom Logger Module](#custom-logger-module)
- [Path Module](#path-module)

## Check Node.js Version
Verify the installed Node.js version.

```bash
node -v
```

## Node Module System
Node.js uses a module system to organize code. Modules are encapsulated, and variables/functions are private unless explicitly exported.

- **Key Concepts**:
  - Use `require()` to import modules.
  - Use `module.exports` to export functionality.
  - Each module runs in its own scope, preventing global namespace pollution.

## File System Operations
The `fs` module provides methods to interact with the file system.

```javascript
const fs = require('fs');

// Asynchronous directory reading
fs.readdir('./', (err, files) => {
    if (err) console.log("error", err);
    else console.log("result", files);
});

// Synchronous directory reading (uncomment to use)
// const filesSync = fs.readdirSync('./');
```

## Event Handling
The `events` module allows event-driven programming using the `EventEmitter` class.

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', (arg) => {
    console.log('Listener Called', arg);
});

// Raise an event
emitter.emit('messageLogged', { id: 1, url: 'http://' });
```

## Global Objects
Node.js provides global objects accessible without imports. Unlike browsers (`window`), Node.js uses `global`.

- **Common Global Objects**:
  - `console.log()`
  - `setTimeout()`
  - `clearTimeout()`
  - `setInterval()`
  - `clearInterval()`

- **Example**:
```javascript
// Variables are not attached to `global` unless explicitly defined
let message = "Hello World";
console.log(global.message); // undefined
console.log(module); // Displays module info
```

## Module Scope & Wrapper Function
Node.js wraps each module in a function to prevent variable leakage into the global scope.

- **Module Wrapper**:
```javascript
(function (exports, require, module, __filename, __dirname) {
    // Module code here
});
```

- **Example Usage**:
```javascript
const log = require('./logger');
// log.log('message'); // If exported as object
log('message'); // If exported as function
```

## Operating System Information
The `os` module provides system-related information.

```javascript
const os = require('os');

let totalMemory = os.totalmem();
let freeMemory = os.freemem();

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
```

## Basic HTTP Server
The `http` module enables creating web servers.

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello, Node.js backend!");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});
```

## Custom Logger Module
Create reusable modules to encapsulate functionality, such as logging.

```javascript
// logger.js
let url = 'http://myjslogger.io/log';

let log = (message) => {
    // Simulate sending an HTTP request
    console.log(message);
};

// Export as function
module.exports = log;

// Alternative: Export as object
// module.exports.log = log;
```

- **Using the Logger**:
```javascript
const log = require('./logger');
log('message'); // Logs: message
```

## Path Module
The `path` module handles file paths in a cross-platform way.

```javascript
const path = require('path');

let pathObj = path.parse(__filename);
console.log(pathObj);
```