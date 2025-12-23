import mongoose from 'mongoose';

const connect  = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB connected");
    }
    catch(err){
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
}

export default connectDB;