const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Fake database
let users = [];
let products = [];
// 1. Simple User List
// Suggestions - Return consistent JSON structure, use helper function
// ==========================================
// [GET] Return all users
app.get('/users', (req, res) => {
    res.json(users);
});

// [GET] Return a single user
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    // ERROR: Non-existing user
    if (!user) {
        console.error("[ERROR]: User not found");
        return res.status(404).json({
            "message": `User with ID: ${id} not found`
        });
    }
    console.info(`[SUCCESS] Retrieved info from user`);
    res.json(user);
});

// [POST] Add a user
app.post('/users', (req, res) => {
    const { name } = req.body;

    // ERROR: Missing 'name' in body
    if (!name) {
        console.error("[ERROR]: Missing 'name' in body");
        res.status(400).json({
            "message": "Missing 'name' in body"
        }); return;
    }

    const newUser = { id: nextId++, name };
    users.push(newUser); // Add user to the fake database
    console.log(`[SUCCESS] User '${name}' added`); 
    res.status(201).json({
        "name": name
    });
})

// [PUT] Update user's name
app.put(['/users', '/users/:id'], (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    // ERROR: Non-existing user
    if (users[id] === undefined) {
        console.error("[ERROR]: User not found");
        res.status(404).json({
            "message": `User with ID: ${id} not found`
        }); return;
    }

    // If user exists, update its 'name' field
    users[id] = { "name": name };
    console.info(`[SUCCESS] User with ID: ${id} updated`);
    res.json(users[id]);
});

// [DELETE] Remove a user
app.delete(['/users', '/users/:id'], (req, res) => {
    const id = req.params.id;

    // If no ID provided, delete all users
    if (!id) {
        users = [];
        console.info(`[SUCCESS] All users removed`)
        res.json(users); // Return updated list of users
        return;
    }

    // ERROR: Non-existing user
    if (users[id] === undefined) {
        console.error("[ERROR]: User not found");
        res.status(404).json({
            "message": `User with ID: ${id} not found`
        }); return;
    }

    // If user exists, delete the user from the list
    users.splice(id, 1); // Remove specified user
    console.info(`[SUCCESS] User with ID: ${id} removed`)
    res.json(users); // Return updated list of users
});
// ==========================================

// 2. Products API
// ==========================================
// [MESSAGE] Return success message
const successResponse = (message, data=null) => ({
    success: true,
    message: `[SUCCESS] ${message}.`,
    data
});

// [MESSAGE] Return error message
const errorResponse = (message, data=null) => ({
    success: false,
    message: `[ERROR] ${message}.`,
    data
});

// [ERROR HANDLER] Global middleware for catching and formatting all server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    res.status(statusCode).json(errorResponse(errorMessage));
});

// [GET] Return list of products
app.get('/products', (req, res) => {
    // ERROR: Empty products list
    if (products.length === 0) return res.status(404).json(errorResponse("There are no products on the list", products));
    res.status(200).json(successResponse("Retrieved products successfully", products));
});

// [GET] Return a specific product
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Check if product exists /w given ID
    const product = products.find(p => p.id === id);

    // ERROR: Non-existing product /w given ID
    if (!product) return res.status(404).json(errorResponse("Product does not exist", product));
    res.status(200).json(successResponse("Retrieved product successfully", product));
});

// [POST] Add a product
app.post('/products', (req, res) => {
    const { name, price } = req.body;

     // Check if product exists in the products list
    const productExists = products.find(p => p.name === name);

    // ERROR: Already existing product
    if (productExists) {
        return res.status(400).json(errorResponse("Product already exists", productExists));
    }

    // Automatically generate a new ID
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 0;

    // Add product to the products list
    const product = { id, name, price };
    products.push(product);

    res.status(201).json(successResponse("Product successfully added", product));
});

// [PUT] Update product details
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;

    // Check if product exists in the products list
    const productIndex = products.findIndex(p => p.id === id);

    // ERROR: Non-existing product
    if (productIndex === -1) {
        res.json(errorResponse("Product does not exist"));
    }

    // Update product's details
    products[productIndex] = { "id": id, "name": name, "price": price };

    res.status(200).json(successResponse("Product details updated successfully", products[productIndex]));
});

// [DELETE] Remove all products or a specific product from the list
app.delete(['/products', '/products/:id'], (req, res) => {
    const id = parseInt(req.params.id);

    // If no ID, remove all products
    if (!id && id !== 0) {
        products = [];
        res.status(200).json(successResponse("Removed all products successfully", products));
    }

    // Check if product exists in the products list
    const productIndex = products.findIndex(p => p.id === id);

      if (productIndex === -1)
        return res.status(404).json(errorResponse("Product not found"));

    const removed = products.splice(productIndex, 1); // Remove specified product
    res.status(200).json(successResponse("Removed product successfully", removed[0]));
});
// ==========================================

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});