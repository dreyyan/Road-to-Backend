const express = require('express');
const app = express();
const PORT = 3000;

users = []; // Fake database

const usersRouter = require('./routes/users')(users);
app.use(express.json()); // Parse incoming JSON request bodies

// Middleware: Logs all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} || [${req.method}] ${req.url}`);
    next();
});

// Middleware: Reject requests /w missing x-api-key
app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
    console.error("[ERROR] Missing x-api-key header");
    return res.status(403).json({
        success: false,
        message: "[ERROR] Missing x-api-key header"
    });
    }

    next();
});

// Example route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "Access granted! You passed the header check"
  });
});

app.use('/users', usersRouter);
app.listen(PORT);