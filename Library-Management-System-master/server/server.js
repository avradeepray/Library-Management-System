//add_book
//const express = require('express');
//const mongodb = require('mongodb');
//const app = express();
//const port = 3000;
const express = require('express');
const {connect} = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;
const mongoURL = 'mongodb+srv://avradeepray:3jrO6Orr7myTYeyC@cluster0.2kepzk0.mongodb.net/?retryWrites=true&w=majority/library'; // Replace with your MongoDB connection string
//const dbName = 'library'; // Replace with your database name
//const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true});
connect(mongoURL).then( ()=>
    console.log("seccesfully connected to mongodb")
).catch((err)=>{
    console.error('Error connecting to MongoDB:', err);  
})
app.use(express.static('server/public'));
app.use('/js', express.static(path.join(__dirname, 'public', 'js'), { type: 'application/javascript'}));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/*client.connect().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});*/

connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;i
    }
    console.log('Connected to MongoDB successfully');
    
    const db = client.db(dbName);
    const collection = db.collection('books');

    // Express middleware to parse JSON data
    app.use(json());

    app.post('/addBook', (req, res) => {
        const { bookcode, bookname, author1, author2, subject, tags } = req.body;

        collection.insertOne({
            bookcode,
            bookname,
            author1,
            author2,
            subject,
            tags
        }, (err, result) => {
            if (err) {
                console.error('Error writing document:', err);
                res.status(500).send('Error writing document');
                return;
            }
            console.log('Document successfully written!');
            res.status(200).send('Successfully Book Added');
        });
    });

    // Other routes and logic here

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}); 
//-----------------------admin_login
//import express, { json } from 'express';
//import { MongoClient } from 'mongodb';
//import { compare } from 'bcrypt';

//const app = express();
//const port = 3000;

// Connect to MongoDB
//const mongoURL = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
//const dbName = 'library'; // Replace with your database name
//const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB successfully');
    
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    app.use(json());

    // User login endpoint
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        
        const user = await usersCollection.findOne({ email });
        
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        res.status(200).json({ message: 'Login successful' });
    });

   

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}); 




//--admin_portal

//const express = require('express');
//const { MongoClient } = require('mongodb');
//const app = express();
//const port = 3000;
//const mongoURL = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
//const dbName = 'your_database'; // Replace with your database name
//const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB successfully');
    
    const db = client.db(dbName);
    const booksCollection = db.collection('books');
    const usersCollection = db.collection('users');

    // Endpoint to get books data
    app.get('/books', async (req, res) => {
        try {
            const books = await booksCollection.find({}).toArray();
            res.status(200).json(books);
        } catch (err) {
            console.error('Error fetching books:', err);
            res.status(500).send('Error fetching books');
        }
    });
    // Endpoint to get users data
    app.get('/users', async (req, res) => {
        try {
            const users = await usersCollection.find({}).toArray();
            res.status(200).json(users);
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

//user_login
// Assuming you've set up MongoDB connection and collection
// Endpoint for user registration
app.post('/register', async (req, res) => {
    const { name, email, password, rollNumber, dateOfBirth } = req.body;

    try {
        // Perform user registration
        await usersCollection.insertOne({
            name,
            email,
            password, // Note: Password should be encrypted/hashed
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

// Endpoint for user login
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
//--user_main
// Import necessary modules and initialize Express app
//import express from 'express';
//const app = express();
//import { MongoClient } from 'mongodb';
//import { json } from 'body-parser';
//import cors from 'cors';
//const mongoURL = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
//const dbName = 'library'; // Replace with your database name



connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB successfully');

    const db = client.db(dbName);
    const booksCollection = db.collection('books');
    const usersCollection = db.collection('users');

    // Endpoint to fetch books
    app.get('/books', (req, res) => {
        booksCollection.find({}).toArray((err, books) => {
            if (err) {
                console.error('Error fetching books:', err);
                res.status(500).send('Error fetching books');
                return;
            }
            res.status(200).json(books);
        });
    });

    // Endpoint to fetch user data by email
    app.get('/user/:email', (req, res) => {
        const email = req.params.email;
        usersCollection.findOne({ Email: email }, (err, user) => {
            if (err) {
                console.error('Error fetching user data:', err);
                res.status(500).send('Error fetching user data');
                return;
            }
            res.status(200).json(user);
        });
    });

    // Endpoint to handle logout
    app.get('/logout', (req, res) => {
        // Perform logout actions as needed
        // Example: Destroy session, clear cookies, etc.
        res.status(200).send('Logout successful');
    });

    const port = 3000; // Replace with your desired port
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});


