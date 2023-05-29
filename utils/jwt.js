const jwt =require('jsonwebtoken')

const createJWT = ({ payload }) => {
    console.log(process.env.JWT_LIFETIME,"sdf")
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
  };
  


const isTokenValid=({token})=>jwt.verify(tokem,process.env.JWT_SECRET)

const attachCookiesToResponse=({res,user})=>{
  const token=createJWT({payload:user})


  const oneday=1000*60*60*24
  // js 1ms =1000sec
  console.log(user,"user")
  
  res.cookie('token',token,{
      httpOnly:true,
      expires:new Date(Date.now()+oneday),
      secure:process.env.NODE_ENV==='production',
      'signed':true,
  })
  res.status(201).json({user})
}



module.exports={
    createJWT,
    isTokenValid,
    attachCookiesToResponse
}