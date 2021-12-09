const mysql = require('mysql');
const uuidv4 = require('uuid').v4;

class Database {
    static connection;
    
    /**
     * Creates the SQL connection
     */
    static createConnection() {
        // Create connection
        Database.connection = mysql.createConnection({
            host: process.env.HOST ? process.env.HOST : 'localhost',
            user: 'root',
            password: 'password',
        });
        Database.connection.connect();

        // Populate dummy values
        this.createDummyDatabase();
    }

    /**
     * Populates the database with dummy values
     */
    static createDummyDatabase() {
        // Create initial database and table
        Database.connection.query(`CREATE DATABASE IF NOT EXISTS mydb`, (error, results, fields) => {
            if (error) throw error;
        });
        Database.connection.query(`USE mydb`, (error, results, fields) => {
            if (error) throw error;
        });
        Database.connection.query(
            `CREATE TABLE IF NOT EXISTS messages(id VARCHAR(36) NOT NULL, message VARCHAR(300) NOT NULL)`,
            (error, results, fields) => {
                if (error) throw error;
            }
        );
    }

    /**
     * Creates a new message to the message board
     * 
     * @param {*} message the new message to create
     */
    createMessage(message) {
        return new Promise((resolve, reject) => {
            Database.connection.query(
                `INSERT INTO messages (id, message) VALUES (?, ?)`, [uuidv4(), message],
                (error, results) => {
                    if (error) reject(error);
                    resolve();
                }
            )
        });
    }

    /**
     * Gets all the messages in the db
     * 
     * @returns a list of messages
     */
    getMessages() {
        return new Promise((resolve, reject) => {
            Database.connection.query(
                `SELECT * FROM messages`,
                (error, results) => {
                    if (error) reject(error);
                    resolve(results);
                }
            )
        });
    }
}

module.exports = { Database };