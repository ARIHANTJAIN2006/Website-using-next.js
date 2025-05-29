import mongoose from 'mongoose'
export async function connect(){
    try{
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected',() => {
         console.log("Connected to MongoDb successfully")
        })

    }catch (error: unknown) {
  console.log("Something went wrong while connecting to MongoDB");

  if (error instanceof Error) {
    console.error("Error message:", error.message);
  } else {
    console.error("Unexpected error:", error);
  }
}
}