# Demonstrating the Vulnerability

A function was created in the backend to log in the user in an unsafe way that was vulnerable to SQL injection.  This was the following function:
```
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
```
This function did not use prepared statements so it is vulnerable to SQL injection.

## Example

To log in without knowing any user's username, we simply need to run the following query in either the username or password field:

```
' or 1=1;#
```

Screenshot:
![Unsafe Login](/img/Screen%20Shot%202021-12-09%20at%202.34.08%20PM.png)

This logs us in as the first user the query gets back.

Screenshot:
![SQL Injection User Page](/img/Screen%20Shot%202021-12-09%20at%202.34.15%20PM.png)

# Demonstrating the Fix

To fix the SQL injection vulnerability, we need to use prepared statements.  The syntax for prepared statements depends on the language and library used.  For the [node mysql package](https://www.npmjs.com/package/mysql) used, the code looks like the following:

```
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
```

Instead of inputting the query directly, we replace what we would like to use prepared statements on with '?' and then pass in the data in order in an array.

## Example

This makes the route unable to be affected by SQL injection as both parameters are prepared prior to query.  Notice in the screenshot the same query that worked on the vulnerable login now does not work and an error displays in the console.

Screenshot:
![Failed SQL Injection](/img/Screen%20Shot%202021-12-09%20at%202.34.41%20PM.png)