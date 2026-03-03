// import { corsMiddleware } from "./corsMiddlewaew.js";

// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) return reject(result);
//       return resolve(result);
//     });
//   });
// }

// export const withCors = (handler) => async (req, res) => {
//   await runMiddleware(req, res, corsMiddleware);

//   // OPTIONS request ko yahin handle kar do
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   return handler(req, res);
// };


import connectDB from "../utils/connect.js";
import UsersContactList from "../models/UsersContactList.js";
import { withCors } from "../utils/withCors.js";

async function handler(req, res) {
  await connectDB();

  // 🔹 GET – list OR count
  if (req.method === "GET") {

    // ✅ TOTAL USERS COUNT
    if (req.query?.type === "count") {
      const total = await UsersContactList.countDocuments();
      return res.status(200).json({ total });
    }

    // ✅ USERS LIST
    const list = await UsersContactList.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: list });
  }

  // 🔹 POST – create
  if (req.method === "POST") {
    const contact = await UsersContactList.create(req.body);
    return res.status(201).json({ data: contact });
  }

  // 🔹 PUT – update
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
