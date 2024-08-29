const express = require('express');
const {connect} = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;
const mongoURL = 'mongodb+srv://avradeepray:3jrO6Orr7myTYeyC@cluster0.2kepzk0.mongodb.net/?retryWrites=true&w=majority/library';

connect(mongoURL).then( ()=>
    console.log("seccesfully connected to mongodb")
).then(app.listen(port,()=>
    console.log('connest to port 3000')
))
.catch((err)=>{
    console.error('Error connecting to MongoDB:', err);  
})


app.post('/register', async (req, res) => {
    const { name, email, password, rollNumber, dateOfBirth } = req.body;

    try {
        // Perform user registration
        await usersCollection.insertOne({
            name,
            email,
            password, 
            rollNumber,
            dateOfBirth,
            books: []
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await usersCollection.findOne({ email });

        if (!user || user.password !== password) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        // Successful login
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});