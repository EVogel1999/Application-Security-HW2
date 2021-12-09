const { Database } = require('./database/database');

Database.createConnection();

new Database().unsafeLogin('mock2', `' or username='mock2';#`).then(result => console.log(result));
new Database().safeLogin('mock2', `password2`).then(result => console.log(result));