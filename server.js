const express = require('express');
const app = express();
const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting to the database: ', err);
    } else {
        console.log("Connected to database");
    }
})



// Question 1
app.get('/patients', (req, res) => {
    const query= 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving patients:', err);
            return res.status(500).json({error:'Database query failed'});
        };
        res.json(results);
    });
});




// Question 2
app.get('/providers', (req, res) => {
    const query= 'SELECT provider_id, first_name, last_name, provider_specialty FROM providers';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving patients:', err);
            return res.status(500).json({error:'Database query failed'});
        };
        res.json(results);
    });
});


// Question 3
app.get('/patients/:first_name', (req, res) => {
    const query= 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    const first_name = req.params.first_name;
    connection.query(query, [first_name], (err, results) => {
        if (err) {
            console.error('Error retrieving patients:', err);
            return res.status(500).json({error:'Database query failed'});
        };
        res.json(results);
    });
});

// Question 4
app.get('/providers/:provider_specialty', (req, res) => {
    const query= 'SELECT provider_id, first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    const provider_specialty = req.params.provider_specialty;
    connection.query(query, [provider_specialty], (err, results) => {
        if (err) {
            console.error('Error retrieving patients:', err);
            return res.status(500).json({error:'Database query failed'});
        };
        res.json(results);
    });
});







const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})


module.exports = connection;