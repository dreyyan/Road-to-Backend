const express = require('express');

const app = express();

app.set('view engine', 'ejs');

// 
app.get('/', (req, res) => {
    console.log('Here');
    // res.sendStatus(500);
    // res.send('Hi');
    // res.status(500).send("ERROR: Internal Server");
    // res.status(500).json({ message: "Error" })
    // res.download('server.js');
    res.render("index", { text: "World" });
});
app.post
app.put
app.delete
app.listen(3000);