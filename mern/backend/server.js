import express from "express";
import env from "dotenv";
import workoutRoutes from "./routes/workouts.js"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import cors from "cors";


const app = express()
const port = 3000;



env.config();


app.use(cors())



// middle ware  used to help in posting of json datax

app.use(express.json()); // Middleware to parse JSON requests

// body parsers middle ware 
app.use(bodyParser.urlencoded({ extended: true }));


// routes 
app.use("/api/workouts", workoutRoutes);

// connect to  db 
mongoose.connect(process.env.MONG_URI)

app.listen(port,(req,res)=>{
    console.log(`The server is running on the port ${port}`)
})