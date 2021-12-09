const express = require('express');
const cors = require('cors');
const { Database } = require('./database/database');

// Connect to DB
Database.createConnection();

// Setup HTTP server
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// Login route
app.post('/login', async (req, res) => {
    try {
        const safe = req.query.safe;

        let result;
        if (safe === 'true') {
            result = await new Database().safeLogin(req.body.username, req.body.password);
        } else {
            result = await new Database().unsafeLogin(req.body.username, req.body.password);
        }
        res.status(200).send(result);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

// Listen on localhost 3000
app.listen(3000, () => {
    console.log(`API is listening on port 3000`);
});