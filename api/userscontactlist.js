import connectDB from "../utils/connect.js";
import UsersContactList from "../models/UsersContactList.js";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await connectDB();

    const userscontactlist = await UsersContactList.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Users contact list fetched successfully",
      data: userscontactlist,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export default withCors(handler);
