import mongoose from "mongoose";


const connectToMongoDB = async()=>{                             // function to connect to mongodb database
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("connected to mongodb");
  } catch (error) {
    console.log("Error connecting to mongodb",error.message);
  }
}

export default connectToMongoDB;