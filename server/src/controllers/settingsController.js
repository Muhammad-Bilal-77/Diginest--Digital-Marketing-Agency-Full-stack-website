import { Settings } from "../models/Settings.js";

function sendError(res, error) {
  return res.status(500).json({ message: "Server error", detail: error?.message || "Unknown error" });
}

export async function getSettings(_req, res) {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // Create default settings if none exist
      settings = await Settings.create({
        email: "hello@dinest.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        socials: [
          { name: "Twitter", url: "#", icon: "twitter" },
          { name: "LinkedIn", url: "#", icon: "linkedin" },
          { name: "Instagram", url: "#", icon: "instagram" },
          { name: "Dribbble", url: "#", icon: "dribbble" },
        ],
      });
    }
    return res.json(settings);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function updateSettings(req, res) {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    }
    return res.json(settings);
  } catch (error) {
    return sendError(res, error);
  }
}
