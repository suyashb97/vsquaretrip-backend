import connectDB from "../utils/connect.js";
import UsersContactList from "../models/UsersContactList.js";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  await connectDB();

  // GET – list
  if (req.method === "GET") {
    const list = await UsersContactList.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: list });
  }

  // POST – create
  if (req.method === "POST") {
    const contact = await UsersContactList.create(req.body);
    return res.status(201).json({ data: contact });
  }

  // PUT – update
  if (req.method === "PUT") {
    const { id, ...updateData } = req.body;

    const updated = await UsersContactList.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return res.status(200).json({ data: updated });
  }

  // DELETE – delete
  if (req.method === "DELETE") {
    const { id } = req.body;

    await UsersContactList.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User contact deleted successfully",
      id,
    });
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default withCors(handler);
