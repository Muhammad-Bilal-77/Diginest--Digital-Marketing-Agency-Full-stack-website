import { Service } from "../models/Service.js";
import { Creator } from "../models/Creator.js";
import { Project } from "../models/Project.js";

function sendError(res, error) {
  if (error?.code === 11000) {
    return res.status(409).json({ message: "Duplicate unique field value" });
  }
  return res.status(500).json({ message: "Server error", detail: error?.message || "Unknown error" });
}

export async function listServices(_req, res) {
  try {
    const items = await Service.find().sort({ createdAt: -1 });
    return res.json(items);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function createService(req, res) {
  try {
    const item = await Service.create(req.body);
    return res.status(201).json(item);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function updateService(req, res) {
  try {
    const item = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.json(item);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function deleteService(req, res) {
  try {
    const item = await Service.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return sendError(res, error);
  }
}

export async function listCreators(_req, res) {
  try {
    const items = await Creator.find().sort({ createdAt: -1 });
    return res.json(items);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function createCreator(req, res) {
  try {
    const item = await Creator.create(req.body);
    return res.status(201).json(item);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function updateCreator(req, res) {
  try {
    const item = await Creator.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
      return res.status(404).json({ message: "Creator not found" });
    }
    return res.json(item);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function deleteCreator(req, res) {
  try {
    const item = await Creator.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Creator not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return sendError(res, error);
  }
}

export async function listProjects(_req, res) {
  try {
    const items = await Project.find().sort({ createdAt: -1 });
    return res.json(items);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function createProject(req, res) {
  try {
    const item = await Project.create(req.body);
    return res.status(201).json(item);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function updateProject(req, res) {
  try {
    const item = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.json(item);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function deleteProject(req, res) {
  try {
    const item = await Project.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return sendError(res, error);
  }
}
