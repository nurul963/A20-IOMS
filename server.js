import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
dotenv.config();
const app=express();
app.use(express.json());
app.use("/api/users",userRoute);
const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log('server is running on port ',port);
})