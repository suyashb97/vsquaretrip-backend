import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteFromCloudinary = async (public_id) => {
  if (!public_id) {
    console.log("No public_id provided");
    return;
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    console.log("Cloudinary delete result:", result);
  } catch (error) {
    console.log("Cloudinary delete failed:", error.message);
  }
};