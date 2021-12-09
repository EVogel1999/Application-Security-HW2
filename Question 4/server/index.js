const express = require('express');
const cors = require('cors');
const { Database } = require('./database/database');

// Connect to DB
Database.createConnection();

// Setup HTTP server
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// Messages routes
app.post('/messages', async (req, res) => {
    try {
        await new Database().createMessage(req.body.message);
        res.sendStatus(201);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});
app.get('/messages', async (req, res) => {
    try {
        const result = await new Database().getMessages();
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