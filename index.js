import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import projectRouter from "./routes/projectRoute.js";
import taskRouter from "./routes/taskRoute.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
   origin : "http://localhost:5173",
   credentials : true,
   methods : "GET,POST,PUT,DELETE",
}))

const PORT = process.env.PORT || 5003;

app.get("/",(req,res)=> {
    return res.status(200).send('hello world')
})

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api",projectRouter)
app.use("/api",taskRouter)
 

app.listen(PORT,()=> {
    connectDb()
    console.log(`server started at port ${PORT}`)
}) 