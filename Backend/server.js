import express from "express";
import mongoose from "mongoose";
import { routes } from "./Routes/routes.js";
import cors from "cors";

const app = new express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017");

const db= mongoose.connection;

db.on("open",()=>{
    console.log("database is connected")
})
db.on("error",()=>{
    console.log("database not connected")
})

app.listen(5000,()=>{
    console.log("server is runnig on port 5000")
});


routes(app);