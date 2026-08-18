import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the MONGODB_URI environment variable.
 * Exits the process on failure so the failure is loud and immediate
 * instead of the API silently serving 500s for every request.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      '\n[MongoDB] MONGODB_URI is not set.\n' +
      'Copy server/.env.example to server/.env and paste in your MongoDB Atlas connection string.\n'
    );
    process.exit(1);
  }

  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(uri);
    console.log(`[MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error('[MongoDB] Connection failed:', err.message);
    process.exit(1);
  }
}

export default connectDB;
