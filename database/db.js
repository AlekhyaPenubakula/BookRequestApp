const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/books.db', (err) => {
    if (err) {
        console.error('Error opening database: ' + err.message);
    } else {
        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS requests', (err) => {
                if (err) {
                    console.error("Failed to drop table: " + err.message);
                } else {
                    console.log("Table dropped.");
                    db.run(`CREATE TABLE requests(
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        year INTEGER NOT NULL,
                        semester INTEGER NOT NULL,
                        roll_no TEXT NOT NULL,
                        subject TEXT NOT NULL,
                        book_name TEXT NOT NULL,
                        description TEXT
                    )`, (err) => {
                        if (err) {
                            console.error("Failed to create table: " + err.message);
                        } else {
                            console.log("Table created successfully.");
                        }
                    });
                }
            });
        });
    }
});

// Function to insert a new request
const insertRequest = (name, year, semester, roll_no, subject, book_name, description) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO requests (name, year, semester, roll_no, subject, book_name, description) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.run(sql, [name, year, semester, roll_no, subject, book_name, description], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
};

// Function to update an existing request
const updateRequest = (id, name, year, semester, roll_no, subject, book_name, description) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE requests 
                     SET name = ?, year = ?, semester = ?, roll_no = ?, subject = ?, book_name = ?, description = ? 
                     WHERE id = ?`;
        db.run(sql, [name, year, semester, roll_no, subject, book_name, description, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
};

// Function to get all requests
const getAllRequests = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM requests`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Function to get a request by ID
const getRequestById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM requests WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Function to close the database connection
const closeDb = () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing the database connection: ' + err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
};

module.exports = {
    db,
    insertRequest,
    updateRequest,
    getAllRequests,
    getRequestById,
    closeDb
};
