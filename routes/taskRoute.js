import express from "express"
import { assignUsersToTask, createTask, getProjectTasks, updateTaskStatus } from "../controller/taskController.js"

const taskRouter = express.Router()

taskRouter.post("/createtask",createTask);

taskRouter.get("/project-tasks/:projectId",getProjectTasks)

taskRouter.put("/update-status/:taskId",updateTaskStatus)

taskRouter.put("/assign-users/:taskId",assignUsersToTask)

export default taskRouter;