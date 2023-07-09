const mongoose=require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        reqquired:[true,'Please provide product name'],
        maxLength:[100 ,'name can not more than 100 chareacters']
    }
    ,
    price:{
        type: Number,
        required : [ true,"Please provide product price"],default:0,
    },
    description:{
        type: String,
        required:[true ,'Please provide product price'],
        minLength:[100 , 'Description must be at least 100 characters long!'],

    },
    image:{
        type:String,
        default:'/uploads/example.jpeg',
    },
    category:{
        type:String,
        reqquired:[true, 'Please provide product category'],
        enum:['office','kitchen','bedroom'],
    }
    ,
    company:{
        type: String,
        reqquired:[true,'Please provide company'],
        enum:{
            values:['ikea','liddy','maros'],
            message:'{VALUE} is not supported',
        }
    },
    colors:{
        type:[String],
        default:['#222'],
        required:true,
    },
    featured:{
        type:Boolean,
        default:false,
    },
    freeShipping:{
        type: Boolean,
        default:false,
    },
    inventory:{
        type: Number,
        required: true,
        default:15,
    },
    averageRating:{
        type:Number,
        default:0,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,   
    },


    },
    {timestamps:true}

);

module.exports=mongoose.model('Product',ProductSchema)


