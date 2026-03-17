import { Router } from "express";
import {
  listServices,
  createService,
  updateService,
  deleteService,
  listCreators,
  createCreator,
  updateCreator,
  deleteCreator,
  listProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/contentController.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.get("/services", listServices);
router.post("/services", requireAuth, createService);
router.put("/services/:id", requireAuth, updateService);
router.delete("/services/:id", requireAuth, deleteService);

router.get("/creators", listCreators);
router.post("/creators", requireAuth, createCreator);
router.put("/creators/:id", requireAuth, updateCreator);
router.delete("/creators/:id", requireAuth, deleteCreator);

router.get("/projects", listProjects);
router.post("/projects", requireAuth, createProject);
router.put("/projects/:id", requireAuth, updateProject);
router.delete("/projects/:id", requireAuth, deleteProject);

export default router;
