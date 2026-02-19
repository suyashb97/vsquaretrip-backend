// import connectDB from "../utils/connect.js";
// import Package from "../models/Package.js";

// export default async function handler(req, res) {
//   if (req.method !== "PUT") {
//     return res.status(405).json({
//       success: false,
//       message: "Method not allowed",
//     });
//   }

//   try {
//     await connectDB();

//     const { id } = req.query;

//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "Package ID is required",
//       });
//     }

//     const updatedPackage = await Package.findByIdAndUpdate(
//       id,
//       req.body,
//       { new: true } // return updated data
//     );

//     if (!updatedPackage) {
//       return res.status(404).json({
//         success: false,
//         message: "Package not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: updatedPackage,
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

// CORS wrapper
const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  return await fn(req, res);
};

const handler = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, message: "Package ID is required" });

    const updatedPackage = await Package.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPackage) return res.status(404).json({ success: false, message: "Package not found" });

    return res.status(200).json({ success: true, data: updatedPackage });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default allowCors(handler);
