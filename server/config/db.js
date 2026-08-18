import mongoose from 'mongoose';

let isConnected = false;

/**
 * Connects to MongoDB using the MONGODB_URI environment variable.
 * Reuses active connection across serverless invocations.
 */
export async function connectDB() {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('\n[MongoDB] MONGODB_URI is not set in Environment Variables.\n');
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw new Error('MONGODB_URI is missing in Vercel environment variables.');
  }

  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(uri, {
      bufferCommands: false
    });
    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error('[MongoDB] Connection failed:', err.message);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw err;
  }
}

export default connectDB;
