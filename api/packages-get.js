// import connectDB from "../utils/connect.js";
// import Package from "../models/Package.js";

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     await connectDB();

//     const packages = await Package.find().sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       data: packages,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }

import connectDB from "../utils/connect.js";
import Package from "../models/Package.js";

// CORS wrapper for serverless
const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // handle preflight
  }

  return await fn(req, res);
};

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const packages = await Package.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: packages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default allowCors(handler);
