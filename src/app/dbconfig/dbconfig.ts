import mongoose from 'mongoose'
export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected',() => {
         console.log("Connected to MongoDb successfully")
        })

    }catch(error){
        console.log("Something went wrong while cxonnecting")
        console.log(error)
    }
}