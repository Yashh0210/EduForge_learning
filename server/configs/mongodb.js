import mongoose from "mongoose";

// Connect to the MongoDB database
const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log('Database Connected'))

  // Expect a full MongoDB connection string in MONGODB_URI.
  // Example (no quotes):
  // MONGODB_URI=mongodb+srv://user:password@cluster0.zv9qfvw.mongodb.net/lms
  await mongoose.connect(process.env.MONGODB_URI)
}

export default connectDB