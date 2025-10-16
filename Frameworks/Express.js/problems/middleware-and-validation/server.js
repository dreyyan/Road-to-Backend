const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Parse incoming JSON request bodies

users = []; // Fake database

// [HELPER] Check if user exists in the database
const userExists = (name) => {
    return users.find(u => u.name === name);
};

// [MESSAGE] Return success message
const successResponse = (message, data=null) => ({
    success: true,
    message: `[SUCCESS] ${message}.`,
    data
});

// [MESSAGE] Return success message
const errorResponse = (message, data=null) => ({
    success: false,
    message: `[ERROR] ${message}.`,
    data
});

// [ERROR HANDLING]: Custom Global Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500;
    const errorMessage = err.message || "Something went wrong";    

    res.status(statusCode).json(errorResponse(errorMessage));
});

// [POST] Add user to list
app.post('/users', (req, res) => {
    const { name } = req.body;  

    // Check if name exists
    if (!userExists(name)) {
        res.status(400).json(errorResponse("Bad Request"))
    }
});

app.post
app.listen(PORT);