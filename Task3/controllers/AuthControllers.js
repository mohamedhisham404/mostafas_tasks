import User from "../models/user.js";
import bcrypt from "bcrypt";
import generateJWTsetCookie from '../utils/generatreJWTsetCookie.js';

const Login = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({where:{username}});

    if(!user){
        return res.status(400).json({message:"Invalid username or password"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid username or password"});
    }

    const token = await generateJWTsetCookie(user.id, res);
    return res.json({message:"Logged in successfully", token});
};

const Register = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({where:{username}});

    if(user){
        return res.status(400).json({message:"User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({username, password:hashedPassword});

    return res.json({message:"User registered successfully"});
};

export { Login, Register };