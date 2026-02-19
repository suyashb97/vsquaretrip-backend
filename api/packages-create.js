import connectDB from "../utils/connect.js";
import Package from "../models/Package.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const newPackage = await Package.create(req.body);

    return res.status(201).json({
      success: true,
      data: newPackage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
