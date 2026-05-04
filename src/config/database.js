import mongoose from "mongoose";

const connectDB = async () => {

    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI is not defined in environment variables')
        process.exit(1)
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log('Successfully connected to database.')
    } catch (error) {
        console.error(`Initial DB connection error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB