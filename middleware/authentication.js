const CustomError =require('../errors')
const {isTokenValid} = require('../utils')

const authenticationUser =async(req,res,next) => {
    const token= req.signedCookies.token;
    if(!token) {
        console.log('error , no token present');
    }
    console.log('tok')
    next();
}

module.exports={authenticationUser}