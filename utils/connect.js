// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected successfully!");
//   } catch (error) {
//     console.error("Server error:", error);
//     throw error;
//   }
// };

// export default connectDB;


// import mongoose from "mongoose";

// let isConnected = false;

// const connectDB = async () => {
//   if (isConnected) {
//     return;
//   }

//   try {
//     const db = await mongoose.connect(process.env.MONGO_URI);

//     isConnected = db.connections[0].readyState === 1;

//     console.log("MongoDB connected successfully!");
//   } catch (error) {
//     console.error("Server error:", error);
//     throw error;
//   }
// };

// export default connectDB;


async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === "GET") {

      if (req.query?.type === "count") {
        const total = await UsersContactList.countDocuments();
        return res.status(200).json({ total });
      }

      const list = await UsersContactList.find().sort({ createdAt: -1 });
      return res.status(200).json({ data: list });
    }

    if (req.method === "POST") {
      const contact = await UsersContactList.create(req.body);
      return res.status(201).json({ data: contact });
    }

    if (req.method === "PUT") {
      const { id, ...updateData } = req.body;

      const updated = await UsersContactList.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      return res.status(200).json({ data: updated });
    }

    if (req.method === "DELETE") {
      const { id } = req.body;

      await UsersContactList.findByIdAndDelete(id);

      return res.status(200).json({
        message: "User contact deleted successfully",
        id,
      });
    }

    return res.status(405).json({ message: "Method not allowed" });

  } catch (error) {
    console.error("USERS ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
}