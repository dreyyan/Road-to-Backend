const express = require('express');
const app = express(); // Create express app
const PORT = 3000;

app.use(express.json()) // Middleware

// 1. Hello World
// ==========================================
// app.get('/', (req, res) => {
//     res.send("Hello World!");
// });

// app.get('/about', (req, res) => {
//     res.send("About page");
// });

// ==========================================

// 2. Query Parameters
// ==========================================
// app.get(['/greet', '/greet/:name'], (req, res) => {
//     const name = req.params.name || "Guest";

//     res.json({
//         "message": `Hello, ${name}!`
//     });
// });
// ==========================================

// 3. Route Parameters
// ==========================================
// app.get(['/user', '/user/:id'], (req, res) => {
//     const id = req.params.id || "guest";

//     res.json({
//         "message": `User ID: ${id}`
//     });
// });
// ==========================================

// 4. POST Request Body
// ==========================================
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     res.send(`Welcome, ${username}`);
// });
// ==========================================

// 5. Custom Middleware
// ==========================================

// ==========================================

// 6. Error Handling
// ==========================================

// ==========================================

app.listen(PORT, () => {
    console.log("Listening on Port 3000");
});