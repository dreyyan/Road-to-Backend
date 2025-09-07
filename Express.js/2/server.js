const express = require('express')
const app = express()
const PORT = 3000

// URL => http://localhost:{PORT}/
// IP  => 127.0.0.1:{PORT}

let data = ['Adrian, James'];

// Middleware
app.use(express.json())

// res.sendStatus(200); // Return status code
// res.send("This is the dashboard."); // Return string
// res.send("<h1>My Website</h1>"); // Return string

// [1] Website Endpoints (for sending back HTML)
app.get('/', (req, res) => {
    // console.log(`I hit  an endpoint. [${req.method}]`);
    res.send(`
        <body>
            <h1>DATA</h1>
            <p>
                ${JSON.stringify(data)}
            </p>
            <a href='/dashboard'>Dashboard</a>
        </body>    
    `)
});

app.get('/dashboard', (req, res) => {
    // console.log(`I hit the dashboard endpoint. [${req.method}]`)
    res.send(`
        <body>
            <h1>Dashboard</h1>
            <a href='/'>Home</a>
        </body>
        
        `)
        
});

// [2] API Endpoints
app.get('/api/data', (req, res) => {
    // console.log(`This one was for data. [${req.method}]`)
    res.status(599).send(data);
});

app.post('/api/data', (req, res) => {
    // Someone wants to create a user
    const newEntry = req.body
    data.push(newEntry.name)
    res.sendStatus(201);
});


app.delete('/api/data', (req, res) => {
    data.pop();
    console.log("Deleted user.");
    res.sendStatus(203);
})

// Start server on port 3000
app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}`);
});

// CRUD:
// 1. Create - POST
// 2. Read   - GET
// 3. Update - PUT
// 4. Delete - DELETE