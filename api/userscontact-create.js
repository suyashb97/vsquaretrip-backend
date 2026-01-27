import connectDB from "../utils/connect.js";
import UsersContactList from "../models/UsersContactList.js";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { name, email, mobile, travelDate, travellers, destination, additional } = req.body;

    // Required fields check
    if (!name || !email || !mobile) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    // Update existing user if mobile exists, otherwise create new
    const contact = await UsersContactList.findOneAndUpdate(
      { mobile }, // Find by mobile
      {
        $set: {
          name,
          email,
          travelDate: travelDate ? new Date(travelDate) : null,
          travellers: travellers || null,
          destination: destination || null,
          additional: additional || null,
        },
      },
      { new: true, upsert: true } // upsert: create if not exist
    );

    res.status(201).json({
      message: "Contact submitted successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Server error:", error);

    // Handle duplicate mobile error (MongoDB unique index)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    res.status(500).json({ message: "Server error" });
  }
}

export default withCors(handler);
