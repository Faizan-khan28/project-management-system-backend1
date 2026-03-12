import express from "express"
import { assignUsers, createProject, getProjectById, getProjects, updateProject,  } from "../controller/projectController.js"
import isAuth from "../middleware/isAuth.js";

const projectRouter = express.Router()

projectRouter.post("/project",isAuth,createProject);
projectRouter.get("/Project",isAuth,getProjects);
projectRouter.get("/Project/:id",isAuth,getProjectById);
projectRouter.put("/project/:id/assign", isAuth, assignUsers)
projectRouter.put("/project/:id", isAuth, updateProject)

export default projectRouter;

