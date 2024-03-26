const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const winston = require('winston');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mysql = require('mysql2');
let router = require('express').Router();

const adminRoutes = require('./Routes/Admin/RouteAdmin.js');


app.use(bodyParser.json());
app.use(cors());

app.use('/admin', adminRoutes);

//fonction qui se connecte a la db
function connectDB() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'tkt'
    });
    return connection;
}

module.exports = connectDB;


app.listen(3000, () => {
    console.log('Server started on port 3000');
});
  
