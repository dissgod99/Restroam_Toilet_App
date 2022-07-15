//require('dotenv').config();

const express = require("express");
const CORS = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./api/api');

const app = new express();
app.use(CORS());
app.set('view engine', 'ejs');

const port = 3000;

const clusterUsername = 'groupJ';
const clusterPassword = 'SbPotmFKy5V8tyBF';
const databaseName = 'myFirstDatabase';

mongoose.connect(
    `mongodb+srv://${clusterUsername}:${clusterPassword}@cluster0.2l3zw.mongodb.net/${databaseName}?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on('error', () => {console.log('Connection error')});
db.once("open", function () {
    console.log("Connected successfully");
});

app.use('/api', apiRoutes);

app.get('/', async (req, res) => {
    res.status(200).send('Hello World');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});