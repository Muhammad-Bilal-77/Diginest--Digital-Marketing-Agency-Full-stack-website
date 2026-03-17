import mongoose from "mongoose";

const creatorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, default: "", trim: true },
    followers: { type: String, default: "", trim: true },
    price: { type: String, default: "", trim: true },
    color: { type: String, default: "from-blue-500 to-cyan-400" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Creator = mongoose.model("Creator", creatorSchema);
