import User from "../model/user.js";
import bcrypt from "bcrypt"
import genToken from "../config/genToken.js";

export const signUp = async (req,res) => {
    const {name,email,password,role} = req.body;
    console.log(req.body);
    if(!name|| !email ||!password |!role) {
        return res.status(400).json({message: "All Fields are required"})
    }
    try {
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({message:"User already exist"})
        }

        if(password.length < 6) {
            return res.status(400).json({message: "password atleast must be 6 character"})
        }
        //  hashpassword
        let hashPassword = await bcrypt.hash(password,10)
        user = await User.create({
            name,
            email,
            password : hashPassword,
            role
        })
        // genrate jwt token genrate thorugh user id
        const token = await genToken(user._id)
        res.cookie("token",token,{
            secure : false,
            sameSite: "lax",
            maxAge : 7*24*60*60*1000,
            httpOnly : true
        })

        console.log(token)

        return res.status(201).json({message:"User created Sussucfully",user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "error in create user"})
    }
}

export const loginUser = async (req,res) => {
   try {
     const {email,password} = req.body
    if(!email || !password) {
        return res.status(400).json({message: "Email or Password Required"})
    }
    const user = await User.findOne({email})
    if(!user) {
        return res.status(400).json({message: "user does not found"})
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
        return res.status(400).json({message: "incorrect password"})
    } 
    const token = await genToken(user._id)
        res.cookie("token",token,{
            secure : false,
            sameSite: "lax",
            maxAge : 7*24*60*60*1000,
            httpOnly : true
        })

    return res.status(200).json({ message: "user Login succssesfully", user });
   } catch (error) {
      console.log(error)
      return res.status(500).json({message: "error Occuring in Login user"})
   }
}

export const logOut  = async (req,res) => {
    try {
      res.clearCookie("token")
      return res.status(200).json({message: "Log Out succussfully"})
    } catch (error) {
      return res.status(500).json({message: "error Occuring in Log Out"})
    }
}
