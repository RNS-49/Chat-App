import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req,res)=>{
   try {
    const {fullName,username,password,confirmPassword,gender} = req.body;      // assining values of req object to variables

    if(password !== confirmPassword){                                            // checking password
      return res.status(400).json({error:"Password's does'nt match!"})
    }

    const user = await User.findOne({username});                                // checking whether the username unique or not

    if(user){
      return res.status(400).json({error:"Username already exists"})
    }

    //using bcrypt to hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`          // using api to get user profile avatars
    const GirlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({          // assigning user informations
      fullName,
      username,
      password:hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : GirlProfilePic
    });
    
    if(newUser){

      // Generating Jsw token

      generateTokenAndSetCookie(newUser._id,res);    // generating token and cookie right after user signup

    await newUser.save();     // saving user informations to the database

    res.status(201).json({
      _id:newUser._id,
      fullname:newUser.fullName,
      username:newUser.username,
      password:newUser.password,
      profilePic:newUser.profilePic
    });
  }else{
    res.status(400).json({error:"invalid user data"});
  }
   } catch (error) {
    console.log("Error in signup controller",error.message);
    res.status(500).json({error:"internal server error"});
   }
}

export const login = async (req,res)=>{
  try {
    const {username,password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if(!user || !isPasswordCorrect){
      return res.status(400).json({error: "Invalid username or password"});
    }

    generateTokenAndSetCookie(user._id,res);

    res.status(201).json({
      _id:user._id,
      fullname:user.fullName,
      username:user.username,
      profilePic:user.profilePic
    });
   
  } catch (error) {
    console.log("Error in login controller",error.message);
    res.status(500).json({error:"internal server error"});
  }
  
}

export const logout = (req,res)=>{
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({ message:"Logged out successfully "});
  } catch (error) {
    console.log("Error in logout controller",error.message);
    res.status(500).json({error:"internal server error"});
  }
}