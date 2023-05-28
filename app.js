require("dotenv").config()
require('express-async-errors')

// express
const express=require('express')
const app =express()

// rest of the pack
const morgan=require('morgan')
const cookieParser=require('cookie-parser')
// database
const connectDB=require('./db/connect')

// router
const authRouter= require('./routes/authRoutes')

// middleware
const notFoundMid=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')


app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser());
app.get('/',(req,res)=>{
    console.log(req.cookies)
    res.send('e-commerce api')
})
app.get('/api/v1',(req,res)=>{
    console.log(req.cookies)
    res.send('e-commerce api')
})

app.use('/api/v1/auth',authRouter)

// use middle ware
app.use(notFoundMid)
app.use(errorHandlerMiddleware)





const port =process.env.PORT
const start =async()=>{
    try{

        await connectDB(process.env.MONGO_URL)
        app.listen(port,console.log(`sever on port ${port}..`))
    }
    catch(e){
        console.log(e)
    }
}

start()

