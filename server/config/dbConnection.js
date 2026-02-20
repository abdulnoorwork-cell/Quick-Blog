import mongoose from 'mongoose'
import 'dotenv/config'

const MongoURI = process.env.MONGO_URI;

const dbConnection = async () => {
    await mongoose.connect(MongoURI, {
        timeoutMS: 50000,
        serverSelectionTimeoutMS: 50000,
        socketTimeoutMS: 45000
    }).then(()=>{
        console.log('Connected to MongoDB')
    }).catch((err)=>{
        console.log(`Error in mongoDB connnection ${err}`)
    })
}

export default dbConnection;