/* IMPORTS */
// [IMPORT] Tools
require('dotenv').config();
const bcrypt = require('bcrypt');

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

// [HELPER] Hash password
const hashPassword = async (password) => {
    try {
        const hashed = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS) || 10);
        return hashed;
    } catch (err) {
        console.error("Error hashing password", err);
        throw err;
    }
}

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
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(successResponse("Users retrieved successfully", users));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to fetch users"));
    }
});

// [GET] Retrieve a user
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
        res.status(200).json(successResponse("User retrieved successfully", user));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to fetch user"));
    }
});

// [POST] Add a user
app.post('/users', async (req, res) => {
    const { name, username, password } = req.body;

    const hashedPassword = await hashPassword(password);

    try {
        const newUser = await prisma.user.create({
            data: { name, username, password: hashedPassword },
        })
        res.status(201).json(successResponse("User created successfully", newUser));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to create user"));
    }
});

// [PUT] Replace a user
app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const { name, username, password } = req.body;

    try {
        // Prepare updated data
        let updatedData = { name, username };
        if (password) {
            updatedData.password = await hashPassword(password); // only hash if password is provided
        }

        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, username, hashedPassword },
        })
        res.status(200).json(successResponse("User replaced successfully", user));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to replace user"));
    }
});

// [DELETE] Remove a user
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await prisma.user.delete({
            where: { id: parseInt(id) },
        })
        res.status(200).json(successResponse("User removed successfully", user));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to remove user"));
    }
});

app.listen(process.env.PORT);