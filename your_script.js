const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const net = require('net');

const app = express();
const db = new sqlite3.Database('database.db');
const PORT2 = 3001;  // Port for the second server

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database Setup
db.run(`CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    year TEXT,
    semester TEXT,
    roll_no TEXT,
    subject TEXT,
    book_name TEXT,
    description TEXT
)`);

// View Engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit-form', (req, res) => {
    const { name, year, semester, roll_no, subject, book_name, description } = req.body;
    const sql = `INSERT INTO requests (name, year, semester, roll_no, subject, book_name, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [name, year, semester, roll_no, subject, book_name, description], (err) => {
        if (err) {
            console.error('Error executing SQL: ' + err.message);
            res.status(500).send('Failed to insert data into database.');
        } else {
            res.send('Thank you for your request. We will check on it and notify you.');
        }
    });
});

// Start the server
app.listen(PORT2, () => {
    console.log(`Book request server is running on port ${PORT2}`);
});
