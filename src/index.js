const express = require('express');
const mongoose = require('mongoose');
const connect = require('./configs/db')

const userController = require('./controllers/users.controller');

const app = express();
app.use(express.json());

app.use('/users', userController);

app.listen(2222, async () => {
    await connect();
    console.log("listening to port 2222");
});