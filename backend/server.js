import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import messageRoutes from "./routes/message.routes.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app=express();

app.use(cors({
  origin:'*',
  credentials:true
}));

const PORT = process.env.PORT || 5000;



app.use(express.json());      // To parse the incoming requests with JSON payloads (from req.body) 
app.use(cookieParser());


app.use("/api/auth",authRoutes);    // middleware setup for authentication
app.use("/api/message",messageRoutes);    // middleware setup messaging
app.use("/api/users",userRoutes);    // middleware setup for users list



app.listen(5000,()=>{ 
  connectToMongoDB();                              // connecting to database when the server starts
  console.log(`server running on port ${PORT}`)
});
