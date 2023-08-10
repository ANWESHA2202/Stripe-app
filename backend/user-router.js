const express = require('express');

const { signup, login, payment } = require('./user-controller');


const userRouter = express.Router();


userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/payment', payment)


module.exports = userRouter;