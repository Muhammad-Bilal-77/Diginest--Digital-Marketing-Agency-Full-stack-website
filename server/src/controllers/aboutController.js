import { About } from "../models/About.js";

function sendError(res, error) {
  return res.status(500).json({ message: "Server error", detail: error?.message || "Unknown error" });
}

export async function getAbout(_req, res) {
  try {
    let about = await About.findOne();
    if (!about) {
      // Create default about if none exists
      about = await About.create({
        heroTitle: "About Digi nest",
        heroDescription: "We are a team of creative professionals dedicated to transforming businesses through innovative digital solutions and strategic marketing excellence.",
        stats: [
          { value: "500+", label: "Projects Delivered" },
          { value: "10+", label: "Years Experience" },
          { value: "200+", label: "Happy Clients" },
          { value: "50+", label: "Team Members" },
        ],
        storyTitle: "Our Story",
        storyContent: [
          "Founded in 2015, Digi nest started with a simple vision: to help businesses navigate the digital landscape and achieve their goals through innovative and strategic solutions.",
          "What began as a small team of passionate designers and marketers has grown into a full-service digital agency serving clients across industries and continents.",
          "Today, we continue to push boundaries, challenge conventions, and deliver exceptional results for businesses looking to make an impact in the digital world.",
        ],
        valuesTitle: "Our Core Values",
        values: [
          { title: "Excellence", description: "We deliver nothing but the best quality work" },
          { title: "Innovation", description: "Cutting-edge solutions for modern challenges" },
          { title: "Integrity", description: "Transparent, honest partnerships with clients" },
          { title: "Impact", description: "Measurable results that drive growth" },
        ],
        teamTitle: "Meet Our Team",
        teamDescription: "Our talented team consists of designers, developers, strategists, and creative minds who work together to bring ideas to life. Each member brings unique expertise and passion to every project.",
      });
    }
    return res.json(about);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function updateAbout(req, res) {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findByIdAndUpdate(about._id, req.body, { new: true, runValidators: true });
    }
    return res.json(about);
  } catch (error) {
    return sendError(res, error);
  }
}
