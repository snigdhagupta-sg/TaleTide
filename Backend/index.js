require('dotenv').config();
const ConnectMongo = require('./config/db.js');
const express = require('express');
const app = express();
ConnectMongo();
app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on port ${process.env.PORT}`)
})