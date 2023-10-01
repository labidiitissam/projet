import mongoose from "mongoose"
import { DB } from "../baseUrl.js"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB)
       
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB;