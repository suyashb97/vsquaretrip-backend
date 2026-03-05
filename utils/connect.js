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


import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    isConnected = db.connections[0].readyState === 1;

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Server error:", error);
    throw error;
  }
};

export default connectDB;
