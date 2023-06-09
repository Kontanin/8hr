const CustomError =require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;
    console.log("test_ayther")
    if (!token) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
  
    try {
      const { name, userId, role } = isTokenValid({ token });
      req.user = { name, userId, role };
      next();
    } catch (error) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
  };

const authorizePermissions=(...roles)=>{
    // if(req.user.role!=='admin'){
    //     throw new CustomError.UnauthorizedError('uthentication Invalid only admin')
    
    console.log(roles,"kkk")

    // }
    // next()
    return(req,res,next)=>{
        console.log(req.user.role,"kkk2")
        if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError('Unauthorized to access this route')

        }
        next()
    }
}

module.exports= {
      authenticateUser,authorizePermissions
};

