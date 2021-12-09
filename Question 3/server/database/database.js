const mysql = require('mysql');

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
            `CREATE TABLE IF NOT EXISTS users(username VARCHAR(20) NOT NULL, password VARCHAR(20) NOT NULL)`,
            (error, results, fields) => {
                if (error) throw error;

                // Populate dummy data
                Database.connection.query(
                    `INSERT INTO users (username, password) VALUES ('mock1', 'password1')`,
                    (error, results, fields) => {
                        if (error) throw error;
                    }
                );
                Database.connection.query(
                    `INSERT INTO users (username, password) VALUES ('mock2', 'password2')`,
                    (error, results, fields) => {
                        if (error) throw error;
                    }
                );
            }
        );
    }

    /**
     * Performs an unsafe login, vulnerable to SQL injection
     * 
     * @param {*} username user's username
     * @param {*} password user's password
     * @returns Promise of user
     */
    unsafeLogin(username, password) {
        return new Promise((resolve, reject) => {
            Database.connection.query(
                `SELECT * FROM users WHERE username='${username}' AND password='${password}'`,
                (error, results, fields) => {
                    if (error) reject(error);
                    resolve(results[0]);
                }
            );
        });
    }

    /**
     * Performs an safe login, not vulnerable to SQL injection
     * 
     * @param {*} username user's username
     * @param {*} password user's password
     * @returns Promise of user
     */
    safeLogin(username, password) {
        return new Promise((resolve, reject) => {
            Database.connection.query(
                `SELECT * FROM users WHERE username=? AND password=?`, [username, password],
                (error, results) => {
                    if (error) reject(error);
                    resolve(results[0]);
                }
            )
        });
    }
}

module.exports = { Database };