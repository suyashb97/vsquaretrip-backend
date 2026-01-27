import connectDB from "../utils/connect.js";
import UsersContactList from "../models/UsersContactList.js";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await connectDB();

    const {
      name,
      email,
      mobile,
      travelDate,
      travellers,
      destination,
      additional,
    } = req.body;

    if (
      !name ||
      !email ||
      !mobile ||
      !travelDate ||
      !travellers ||
      !destination
    ) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const contact = await UsersContactList.create({
      name,
      email,
      mobile,
      travelDate,
      travellers,
      destination,
      additional,
    });

    res.status(201).json({
      message: "Contact submitted successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export default withCors(handler);
