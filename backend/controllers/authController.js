const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const registerUser=async(req,res)=>{
    try{
    const{name,email,password}=req.body;
    if(!name||!email||!password)
    {
        return res.status(400).json({message:"Please fill all fields"});
    }
    const existingUser=await User.findOne({email});
    if(existingUser)
    {
        return res.status(400).json({message:"User already exists"});
    }
    const hashedpassword=await bcrypt.hash(password,10);
    const user=await User.create({
        name,
        email,
        password:hashedpassword
    })
    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    }
);}
catch(err)
{
    res.status(500).json({message:err.message});
}
        }

        const loginUser=async(req,res)=>{
            try{
            const{email,password}=req.body;
            if(!email||!password)
            {
                return res.status(400).json({message:"Please fill all fields"});
            }
            const user=await User.findOne({email});
            if(!user)
            {
                return res.status(400).json({message:"Invalid email or password"});
            }
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch)
            {
                return res.status(400).json({message:"Invalid email or password"});
            }
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
            res.status(200).json({
                message:"User logged in successfully",
                token,
                 user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
            });}
            catch(err)
            {
                res.status(500).json({message:err.message});
            }
        }
        

module.exports={registerUser,loginUser};