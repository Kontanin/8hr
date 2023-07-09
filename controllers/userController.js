const User =require('../models/User');
const {statusCodes, StatusCodes}=require('http-status-codes');
const CustomError= require('../errors');
const {  createTokenUser,attachCookiesToResponse ,checkPermissions} = require('../utils');

const getAllUsers=async (req,res)=>{
    console.log(req.user,"user")
    const users=await User.find({role:'user'}).select('-password')

    res.status(StatusCodes.OK).json({users});
}
const getSingleUser=async (req,res)=>{

    const user=await User.findOne({_id:req.params.id}).select('-password')
    console.log(user,"user")
    if(!user){
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`)
    }
    checkPermissions(req.user,user._id )
    return res.status(StatusCodes.OK).json({user})
}
const showCurrentUser =async (req,res)=>{

    res.status(StatusCodes.OK).json({user:req.user});
}
// uodate user with findOneAndUpdate
const updateUser =async (req,res)=>{
    const {email,name}=req.body;
    console.log("here")
    if(!email||!name){
        throw new CustomError.BadRequestError(`Please provide all value`)

    }

    const user =await User.findOne({_id:req.user.userId})
    user.emai=email;
    user.name=name;
    await user.save();
    console.log(user)
    const tokenUser=createTokenUser(user)
    console.log("here")
    attachCookiesToResponse({res,user:tokenUser})
    res.status(StatusCodes.OK).json({user:tokenUser})
}
const updateUserPassword =async (req,res)=>{
    const{oldPassword, newPassword} =req.body
    console.log(req.body,newPassword,oldPassword,newPassword)
    if(!oldPassword||!newPassword){
        throw new CustomError.BadRequestError('Please provide both values')

    }
    console.log(req.user.userId,"req.user.userId")
    const user =await User.findOne({_id:req.user.userId})
    
    const isPasswordCorrect =await user.comparePassword(oldPassword);
    console.log(isPasswordCorrect)
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError
    }
    user.password=newPassword
    await user.save();

    res.status(statusCodes.oK).json({msg:'Success! password Updated'})
}

module.exports={
    getAllUsers,getSingleUser,showCurrentUser,updateUserPassword,updateUser
}




// const updateUser =async (req,res)=>{
    //     const {email,name}=req.body;
    //     console.log("here")
    //     if(!email||!name){
    //         throw new CustomError.BadRequestError(`Please provide all value`)
    
    //     }
    //     const user =await User.findOneAndUpdate(
    //         {_id:req.user.userId},
    //         {email,name},
    //         {new:true,runValidators:true})
    //     console.log(user)
    //     const tokenUser=createTokenUser(user)
    //     console.log("here")
    //     attachCookiesToResponse({res,user:tokenUser})
    //     res.status(StatusCodes.OK).json({user:tokenUser})
    // }