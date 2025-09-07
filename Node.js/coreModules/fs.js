const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname , '..', 'book.txt');

// `.writeFile()` => write to a file
fs.writeFile(filePath, 'Hello, Node.js!', (err) => {
    if (err) console.log("ERROR: " + err);
    else {
        console.log("File written successfully.");

        // `.readFile()` => read a file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) console.log("ERROR: " + err);
            else console.log("File Content: " + data);
        });
    }

});
