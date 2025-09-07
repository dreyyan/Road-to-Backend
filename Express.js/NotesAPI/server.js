// SERVER SETUP
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Set view engine
app.set('view engine', 'ejs');

// Fake database
let notes = [
  { id: Date.now(), text: "Learn Node.js, Build an API" }
];


// ================================================================

// Website Endpoints
// [1] Main
app.get('/', (req, res) => {
    console.log(`navigated to 'home page' [${req.method}]`);
    res.render('index', { name: "Adrian", notes });
});

// [2] GET notes
app.get('/notes', (req, res) => {
    console.log(`navigated to 'notes' [${req.method}]`);
    res.json(notes);
});

// [3] POST notes
app.post('/notes', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    const newNote = { id: Date.now(), text };
    notes.push(newNote);
    res.status(201).json(newNote);
});

// [4] DELETE a note
app.delete('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== noteId);
  res.json({ message: "Note deleted" });
});

// Start server on port 3000
app.listen(PORT, () => {
    console.log(`Server started on: ${PORT}`);
});