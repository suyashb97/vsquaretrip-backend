import mongoose from "mongoose";

const usersContactListSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    travelDate: { type: Date, required: true },
    travellers: { type: String, required: true },
    destination: { type: String, required: true },
    additional: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.UsersContactList ||
  mongoose.model("UsersContactList", usersContactListSchema);
