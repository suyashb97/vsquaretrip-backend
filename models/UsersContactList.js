import mongoose from "mongoose";

const usersContactListSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    travelDate: { type: Date },
    travellers: { type: String },
    destination: { type: String },
    additional: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.UsersContactList ||
  mongoose.model("UsersContactList", usersContactListSchema);
