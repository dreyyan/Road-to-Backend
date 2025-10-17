/* IMPORTS */
// [IMPORT] dotenv for environment variables (.env)
require('dotenv').config();

// [IMPORT] Express.js
const express = require('express');
const app = express();

// [IMPORT] Prisma: ORM for PostgreSQL
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ===============================================================
/* SETUP */
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

    res.status(statusCode).json(errorMessage);
});

// ===============================================================
/* [ ROUTES / ENDPOINTS ] */
// [GET] Retrieve all users
app.get('/users', async (req, res) => {

});

// [GET] Retrieve a user
app.get('/users/:id', async (req, res) => {

});

// [POST] Add a user
app.post('/users', async (req, res) => {

});

// [PUT] Replace a user
app.put('/users/:id', async (req, res) => {

});

// [DELETE] Remove a user
app.delete('/users/:id', async (req, res) => {

});

app.listen(process.env.PORT);