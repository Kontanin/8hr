const User =require('../models/User')
const {StatusCodes}=require('http-status-codes')
const CustomAPIError=require('../errors')
const jwt=require('jsonwebtoken')
const {attachCookiesToResponse}=require('../utils');


const register =async(req,res)=>{
    console.log(req.body)
    const {email,name,password}=req.body
    const emailAlreadyExists=await User.findOne({email})
    if (emailAlreadyExists){
        throw new CustomAPIError.BadRequestError('Email already exists')
        
    }
    const isFirstAccount=(await User.countDocuments({}))===0;
    // if that frist account for database it will be admin
    console.log(isFirstAccount,"test")
    const role=isFirstAccount?'admin':'user';
    const user =await User.create({email,name,password,role});
    const tokenUser ={name:user.name,userId:user._id,role:user.role}
    attachCookiesToResponse({res,user:tokenUser})
    // ย้ายไป
    // const token =jwt.sign(tokenUser,'jwtSecet',{expiresIn:'1d'})
    
    

}

const login =async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        throw new CustomAPIError.BadRequestError('Please provide email and password')
    }
    const user =await User.findOne({email})
    if(!user){
        throw new CustomAPIError.UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.completePassword(password);
    if(!isPasswordCorrect){
        throw new CustomAPIError.UnauthenticatedError('Invalid Credentials');
    }
    const tokenUser ={name:user.name,userId:user._id,role:user.role}
    attachCookiesToResponse({res,user:tokenUser})
    res.status(StatusCodes.CREATED).json({user:tokenUser})
}

const logout =async (req,res)=>{
    res.send('log out user')
}

module.exports={
    register,
    login,
    logout,
}


