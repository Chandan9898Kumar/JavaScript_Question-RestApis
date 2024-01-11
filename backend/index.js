const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json())
const data = require('./products.json')
app.use(cors());

// REST API to get all products details at once
// With this api the frontend will only get the data
// The frontend cannot modify or update the data 
// Because we are only using the GET method here.

app.get("/api/products", (req, res) => {
    res.json(data)
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});






//   1. npm init -y

// 2. npm i express nodemon

// npm install express cors --save  