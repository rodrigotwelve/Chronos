// SQLite3 database connection and tasks table setup
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database file
const dbPath = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error('Could not connect to database', err);
	} else {
		console.log('Connected to SQLite database.');
		// Create the tasks table if it doesn't exist
		db.run(`
			CREATE TABLE IF NOT EXISTS tasks (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				title TEXT,
				completed INTEGER DEFAULT 0
			)
		`, (err) => {
			if (err) {
				console.error('Could not create tasks table', err);
			} else {
				console.log('Tasks table is ready.');
			}
		});
	}
});

module.exports = db;
