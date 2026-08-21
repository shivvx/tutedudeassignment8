import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    // Connect using connection string or fallback to local db
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todoapp')
    console.log('MongoDB connected: ' + conn.connection.host)
  } catch (error) {
    console.error('Database connection failed: ' + error.message)
    // Exit if database cannot connect
    process.exit(1)
  }
}

export default connectDB
