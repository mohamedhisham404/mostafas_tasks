import jwt from 'jsonwebtoken';
import User from "../models/user.js"

const protectRoute = async (req, res, next) =>{
    const authHead = req.cookies.token;
    
    if(!authHead){
        return res.status(401).json({ message: 'Access Denied' }); 
    }

    try {
        const decoded = jwt.verify(authHead, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId, { attributes: { exclude: ["password"] } });

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({  data: "Invalid token" });
    }
};

export default protectRoute;