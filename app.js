const express=require('express')

const app =express()
const port =process.env.port||3000
const start =(port)=>{
    try{
        app.listen(port)
    }
    catch(e){
        console.log(e)
    }
}

start()

