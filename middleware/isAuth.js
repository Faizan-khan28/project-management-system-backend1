import jwt from "jsonwebtoken"

const isAuth = (req,res,next) => {
  try {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
      return res.status(401).json({message:"token not found"})
    }

    console.log("cookies:", req.cookies)
    console.log("token:", req.cookies.token)

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(!token){
      return res.status(401).json({message:"token not verify"})
    }

    console.log(decoded)

    req.userId = decoded.userId

    next()

  } catch (error) {
    return res.status(401).json({message:"invalid token"})
  }
}

export default isAuth 