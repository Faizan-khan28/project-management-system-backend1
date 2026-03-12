import express from "express"
import { signUp,loginUser,logOut } from "../controller/AuthController.js"


const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",loginUser)
authRouter.get("/logout",logOut)

export default authRouter;