import express from "express"
import { assignUsersToTask, createTask, getMyTasks, getProjectTasks, updateTaskStatus } from "../controller/taskController.js"
import isAuth from "../middleware/isAuth.js"

const taskRouter = express.Router()

taskRouter.post("/task", createTask)

taskRouter.get("/task/mytasks",isAuth,getMyTasks)

taskRouter.get("/task/:projectId", getProjectTasks)

taskRouter.put("/task/status/:taskId", updateTaskStatus)

taskRouter.put("/task/assign/:taskId", assignUsersToTask)

export default taskRouter;