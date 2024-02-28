import express from 'express';
import router from './routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import {connectdb} from "./db/db.js"


const app= express();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',router);
connectdb()
.then(()=>{
    console.log("database connected");
})
app.listen(8000,function () {
    console.log("server started at port 8000");
})