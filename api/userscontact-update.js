import connectDB from "../utils/connect.js";
import UsersContactList from "../models/UsersContactList.js";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { id, ...updateData } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const updated = await UsersContactList.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({
      message: "User contact updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
