import express from "express"
import { getAllUsers, getCurrentUser } from "../controller/userController.js";
import isAuth from "../middleware/isAuth.js";


const userRouter = express.Router()

userRouter.get("/current",isAuth,getCurrentUser)
userRouter.get("/",getAllUsers)

export default userRouter;