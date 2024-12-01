import User from "../models/user.model.js";

export const getUserForSidebar = async (req,res)=>{
  try {
    const {loggedInUserId} = req.user._id;
    const allUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");   // it gets all user from the databese and excludes the current logged user(You).
     
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("error in getUserForSidebar controller:",error.message);
    res.status(500).json({error:"internal server error"});
  }
}