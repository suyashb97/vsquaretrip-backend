import connectDB from "../utils/connect.js";
import Package from "../models/Package.js";

const handler = async (req, res) => {
  await connectDB();

  const packages = await Package.find();

  for (let pkg of packages) {
    if (!pkg.slug) {
      pkg.slug = pkg.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

      await pkg.save();
    }
  }

  res.json({ message: "Slugs Updated" });
};

export default handler;