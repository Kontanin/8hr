const User =require('../models/User');
const {statusCodes, StatusCodes}=require('http-status-codes');
const CustomError= require('../errors');


const getAllUsers=async (req,res)=>{
    console.log(req.user,"user")
    const users=await User.find({role:'user'}).select('-password')

    res.status(StatusCodes.OK).json({users});
}
const getSingleUser=async (req,res)=>{

    const users=await User.findOne({_id:req.params.id}).select('-password')
    if(!user){
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`)
    }
}
const showCurrentUser =async (req,res)=>{

    res.status(StatusCodes.OK).json({user:req.user});
}
const updateUser =async (req,res)=>{

    res.send(req.body)
}
const updateUserPassword =async (req,res)=>{
    const{oldPassword, newPassword} =req.body
    console.log(req.body,newPassword,oldPassword,newPassword)
    if(!oldPassword||!newPassword){
        throw new CustomError.BadRequestError('Please provide both values')

    }
    console.log(req.user.userId,"req.user.userId")
    const user =await User.findOne({_id:req.user.userId})
    console.log(user)
    const isPasswordCorrect =await user.comparePassword(oldPassword);

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