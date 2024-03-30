// const express = require('express')
import express from 'express'; //Add "type":"module" in package.json file
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'; 

const app = express();
const port = 1005;
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://real-estate-frontend-eta.vercel.app/',
    credentials: true
}));

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
});

mongoose.connect(process.env.MONGO).then(() => console.log("Connection to mongodb successful"))
    .catch((error) => {
        console.log(error);
    })

app.get('/',(req,res)=>{
    res.send("Hello, Welcome Back");
})
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing',listingRouter);

//Middleware to handle error
app.use((error,req,res,next)=>{
    const statusCode = error.statusCode || 400;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
})
