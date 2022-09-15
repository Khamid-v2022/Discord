import mongoose from "mongoose";

async function connectDB(url) {
   try {
      await mongoose.connect(url, { useNewUrlParser: true });
      console.log("Connected DB!");
   } catch (error) {
      console.log(error)
   }
}

export default connectDB;