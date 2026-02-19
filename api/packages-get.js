import connectDB from "../utils/connect.js";
import Package from "../models/Package.js";

export default async function handler(req, res) {
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
}
