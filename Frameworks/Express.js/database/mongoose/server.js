const express = require('express');
const app = express();
const PORT = 3000;

// (1)[MIDDLEWARE] Parse incoming JSON request bodies
app.use(express.json());

// [MESSAGE] Return success message
const successResponse = (message, data=null) => ({
    success: true,
    message: `[SUCCESS] ${message}`,
    data
});

// [MESSAGE] Return error message
const errorResponse = (message, data=null) => ({
    success: false,
    message: `[ERROR] ${message}`,
    data
});

// (2)[MIDDLEWARE] Custom error handling
app.use((err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    res.status(statusCode).json(errorResponse(errorMessage));
});

// [ROUTES/ENDPOINTS]
// [GET] Retrieve list of users
app.get('/', (req, res) => {

});

// [GET] Retrieve a user from the list
app.get('/', (req, res) => {

});

// [POST] Add a user
app.post('/', (req, res) => {

});

// [PUT] Replace user
app.put('/', (req, res) => {

});

// [DELETE] Remove user
app.delete('/', (req, res) => {

});

app.listen(PORT);