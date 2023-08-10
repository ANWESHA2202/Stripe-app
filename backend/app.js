const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const cors = require('cors');
const userRouter = require('./user-router')


const app = express();
app.use(express.json());
app.use(cors());
app.use('/users', userRouter);



mongoose.connect(`mongodb+srv://anweshasanyal22:${process.env.MONGODB_PASSWORD}@cluster0.n3djicf.mongodb.net/${process.env.MONGODB_PROJECTNAME}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    }).then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log(err, 'error');
    });