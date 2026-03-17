import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    email: { type: String, default: "hello@dinest.com" },
    phone: { type: String, default: "+1 (555) 123-4567" },
    location: { type: String, default: "New York, NY" },
    whatsappNumber: { type: String, default: "+923104833310" },
    socials: [
      {
        name: { type: String, required: true },
        url: { type: String, default: "" },
        icon: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

export const Settings = mongoose.model("Settings", settingsSchema);
