import mongoose from "mongoose";

const featureSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    desc: { type: String, default: "" },
  },
  { _id: false }
);

const processSchema = new mongoose.Schema(
  {
    step: { type: String, default: "" },
    desc: { type: String, default: "" },
  },
  { _id: false }
);

const statSchema = new mongoose.Schema(
  {
    value: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { _id: false }
);

const faqSchema = new mongoose.Schema(
  {
    q: { type: String, default: "" },
    a: { type: String, default: "" },
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    desc: { type: String, default: "" },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    icon: { type: String, default: "Palette" },
    features: { type: [featureSchema], default: [] },
    process: { type: [processSchema], default: [] },
    stats: { type: [statSchema], default: [] },
    testimonial: {
      quote: { type: String, default: "" },
      name: { type: String, default: "" },
      role: { type: String, default: "" },
      rating: { type: Number, default: 5 },
    },
    faqs: { type: [faqSchema], default: [] },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
