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
    console.log(tokenUser,"tokenuser")
    // ย้ายไป
    // const token =jwt.sign(tokenUser,'jwtSecet',{expiresIn:'1d'})

    

}

const login =async(req,res)=>{
    res.send('login user')
}

const logout =async (req,res)=>{
    res.send('log out user')
}

module.exports={
    register,
    login,
    logout,
}


