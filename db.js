import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

// const uri = process.env.MONGODB_URL
// const client = new MongoClient(uri, { useNewUrlParser: true });

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser:true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`)

    // const testSchema = new mongoose.Schema({name: String})
    // const testDB = mongoose.model('test', testSchema)
    // const data = await testDB.find()
    // console.log(data)
}

export default connectDB;