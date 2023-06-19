const CustomError =require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser =async(req,res,next) => {
    const token= req.signedCookies.token;
    if(!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
    try{
        const {name,userId,role} =isTokenValid({});
        req.user= {name: user.name , userId:user._id , role:user.role};
        next();
    }
    catch(error){
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
    next();
}

const authorizePermissions=(req,res,next)=>{
    if(req.user.role!=='admin'){
        throw new CustomError.UnauthorizedError('uthentication Invalid only admin')
    next();

}}

module.exports= {
      authenticateUser,authorizePermissions
};

