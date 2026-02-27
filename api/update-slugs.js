import connectDB from "../utils/connect.js";
import Package from "../models/Package.js";

export default async function handler(req, res) {
  try {
    await connectDB();

    const packages = await Package.find();

    for (let pkg of packages) {
      if (!pkg.slug) {

        let baseSlug = pkg.name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");

        let slug = baseSlug;
        let count = 1;

        // check duplicate slug
        while (await Package.findOne({ slug })) {
          slug = `${baseSlug}-${count}`;
          count++;
        }

        pkg.slug = slug;
        await pkg.save();
      }
    }

    res.json({ message: "Slugs Updated Successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}