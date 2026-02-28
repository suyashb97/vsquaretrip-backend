// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected successfully!");
//   } catch (error) {
//     console.error("Server error:", error);
//     throw error;
//   }
// };

// export default connectDB;


// import mongoose from "mongoose";

// let isConnected = false;

// const connectDB = async () => {
//   if (isConnected) {
//     return;
//   }

//   try {
//     const db = await mongoose.connect(process.env.MONGO_URI);

//     isConnected = db.connections[0].readyState === 1;

//     console.log("MongoDB connected successfully!");
//   } catch (error) {
//     console.error("Server error:", error);
//     throw error;
//   }
// };

// export default connectDB;



import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

/*
  Global cache to prevent multiple connections in serverless
*/
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully");
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }

  return cached.conn;
};

export default connectDB;