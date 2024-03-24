import express from 'express';
import userRouter from './routes/routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import {connectdb} from "./db/db.js"
import cookieparser from 'cookie-parser';
import dotenv from 'dotenv';


const app= express();
app.use(cookieparser());
dotenv.config();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',userRouter);
connectdb()
.then(()=>{
    console.log("database connected");
})
app.listen(8000,function () {
    console.log("server started at port 8000");
})