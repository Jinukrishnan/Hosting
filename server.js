import express from "express";
import env from 'dotenv'
import connection from "./back-end/connecton.js";
import cors from 'cors'
import router from "./back-end/router.js";
import path from 'path';
env.config()
const app=express();
app.use(express.static('./dist'))
app.use(cors());
app.use(express.json());
app.use('/api',router);
app.use("*",(req,res)=>{res.sendFile(path.resolve('./dist/index.html'))})
connection()
.then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log(`server started at http://localhost:${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(error);
})
