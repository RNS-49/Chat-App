import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    }

    // Look up the user by ID from the decoded token
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;




/* import jwt from  'jsonwebtoken'
import User from '../models/user.model.js';


const protectRoute =async(req,res,next)=>{
  try {
      const token = req.cookies.jwt;

      if(!token){
        return res.status(401).json({error:"unauthorized-no token provided"});
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if(!decoded){
        return res.status(401).json({error:"unauthorized-invalid token"});
      }

      const user = await User.findById(decoded.userId).select("-password");    // we've passed user id from database collection to "userId" when we set token in auth.controller.js
    
      if(!user){
        return res.status(404).json({error:"user not found"});
      }

      req.user = user;
      next();

    } catch (error) {
    console.log("error in protectToute middleware:",error.message);
    res.status(500).json({error:"internal server error"});
  }
}



export default protectRoute;  */