'use-strict'

const database = require('better-sqlite3')

const db = new database('log.db')

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' and name='mentalTracker';`
    );

    let row = stmt.get();

    if (row === undefined) {

        console.log('Your database appears to be empty. I will initialize it now.');

        const sqlInit = `
        CREATE TABLE mentalTracker ( 
            id INTEGER PRIMARY KEY, 
            username TEXT,
            password VARCHAR,
            record VARCHAR,
            previousRecord INTEGER);
    `;

    db.exec(sqlInit);

    console.log('Your database has been initialized with a new table.');
} else {

    console.log('Daily log database already exists.')
}

module.exports = db