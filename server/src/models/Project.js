import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    value: { type: String, default: "" },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    cat: { type: String, required: true, trim: true },
    img: { type: String, default: "" },
    desc: { type: String, default: "" },
    client: { type: String, default: "" },
    duration: { type: String, default: "" },
    year: { type: String, default: "" },
    challenge: { type: String, default: "" },
    solution: { type: String, default: "" },
    results: { type: [resultSchema], default: [] },
    deliverables: { type: [String], default: [] },
    testimonial: {
      text: { type: String, default: "" },
      author: { type: String, default: "" },
      role: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
