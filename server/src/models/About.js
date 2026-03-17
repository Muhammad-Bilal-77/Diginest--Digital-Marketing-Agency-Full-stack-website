import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    heroTitle: { type: String, default: "About Digi nest" },
    heroDescription: { type: String, default: "We are a team of creative professionals dedicated to transforming businesses through innovative digital solutions and strategic marketing excellence." },
    stats: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
    storyTitle: { type: String, default: "Our Story" },
    storyContent: [
      { type: String, default: "" },
    ],
    valuesTitle: { type: String, default: "Our Core Values" },
    values: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    teamTitle: { type: String, default: "Meet Our Team" },
    teamDescription: { type: String, default: "Our talented team consists of designers, developers, strategists, and creative minds who work together to bring ideas to life. Each member brings unique expertise and passion to every project." },
  },
  { timestamps: true }
);

export const About = mongoose.model("About", aboutSchema);
