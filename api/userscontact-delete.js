import connectDB from "../utils/connect.js";
import UsersContactList from "../models/UsersContactList.js";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const deleted = await UsersContactList.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({
      message: "User contact deleted successfully",
      id,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
