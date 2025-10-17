const express = require('express');
const app = express();
const PORT = 3000;

// [DATABASE] Connection to MongoDB
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

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
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();

        res.json(successResponse("Users retrieved successfully", users));
    } catch (err) {
        console.error(err.stack);
        res.json(errorResponse("Failed to fetch users"));
    }
});

// [GET] Retrieve a user from the list
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(req.params.id);

        // ERROR: User not found
        if (!user) return res.status(404).json(errorResponse("User not found"));

        res.json(successResponse("User fetched successfully", user));
    } catch (err) {
        res.status(500).json(errorResponse("Failed to fetch user"));
    }
});

// [POST] Add a user
app.post('/users', async (req, res) => {
    const { name, email, age } = req.body;

    try {
        const newUser = await User.create({ name, email, age });

        res.status(201).json(successResponse("User created successfully", newUser));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to create user"));
    }
});

// [PUT] Replace user
app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email, age } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedUser) return res.status(404).json(errorResponse('User not found'));

        res.status(200).json(successResponse("User updated successfully", updatedUser));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to update user"));
    }
});

// [DELETE] Remove user
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) return res.status(404).json(errorResponse('User not found'));

        res.status(200).json(successResponse("User deleted successfully", deletedUser));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to delete user"));
    }
});

app.listen(PORT);