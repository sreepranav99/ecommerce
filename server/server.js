

import path from 'path'
import { fileURLToPath } from 'url'
import express from'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import mongoose from "mongoose";
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors'
//configure env
dotenv.config()


//databaseconfig
mongoose.set('strictQuery', false);
connectDB();


//rest object
const app=express();

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename) //here is important thing - no static directory, because all static :)


//routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)
app.use(express.static(path.join(__dirname,'../client/build')))
app.use("*",(request,response)=>{
  response.sendFile(path.join(__dirname,'../client/build/index.html'))
})


//PORT
const PORT=process.env.PORT;


app.listen(PORT,()=>{
  console.log(`Server Running on ${PORT}`)
})
