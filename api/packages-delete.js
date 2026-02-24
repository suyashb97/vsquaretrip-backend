// import connectDB from "../utils/connect.js";
// import Package from "../models/Package.js";

// export default async function handler(req, res) {
//   if (req.method !== "DELETE") {
//     return res.status(405).json({ message: "Method not allowed" });
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

//     const deletedPackage = await Package.findByIdAndDelete(id);

//     if (!deletedPackage) {
//       return res.status(404).json({
//         success: false,
//         message: "Package not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Package deleted successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }


// import connectDB from "../utils/connect.js";
// import Package from "../models/Package.js";

// // CORS wrapper
// const allowCors = (fn) => async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   if (req.method === "OPTIONS") return res.status(200).end();

//   return await fn(req, res);
// };

// const handler = async (req, res) => {
//   if (req.method !== "DELETE") {
//     return res.status(405).json({ success: false, message: "Method not allowed" });
//   }

//   try {
//     await connectDB();

//     const { id } = req.query;
//     if (!id) return res.status(400).json({ success: false, message: "Package ID is required" });

//     const deletedPackage = await Package.findByIdAndDelete(id);
//     if (!deletedPackage) return res.status(404).json({ success: false, message: "Package not found" });

//     return res.status(200).json({ success: true, message: "Package deleted successfully" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// export default allowCors(handler);


import connectDB from "../utils/connect.js";
import Package from "../models/Package.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";

const allowCors = (fn) => async (req, res) => {

  // ✅ CORS headers (always set first)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ✅ Handle preflight properly
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return await fn(req, res);
};

const handler = async (req, res) => {

  // 🔥 EXTRA SAFETY (important for Vercel)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method !== "DELETE") {
    return res.status(405).json({ success: false });
  }

  try {
    await connectDB();

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: "ID required" });
    }

    const pkg = await Package.findById(id);

    if (!pkg) {
      return res.status(404).json({ success: false });
    }

    // 🔥 Delete main image (safe)
    try {
      await deleteFromCloudinary(pkg.image?.public_id);
    } catch (err) {
      console.log("Main image delete error:", err.message);
    }

    // 🔥 Delete gallery (safe delete)
    for (const img of pkg.ItenaryDetailsImages || []) {
      try {
        await deleteFromCloudinary(img.public_id);
      } catch (err) {
        console.log("Gallery delete error:", err.message);
      }
    }

    // 🔥 Delete itinerary images (safe)
    for (const day of pkg.itinerary || []) {
      try {
        await deleteFromCloudinary(day.image?.public_id);
      } catch (err) {
        console.log("Itinerary delete error:", err.message);
      }
    }

    await Package.findByIdAndDelete(id);

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default allowCors(handler);