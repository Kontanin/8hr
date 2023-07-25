const mongoose =require('mongoose');
const ReviewSchema =mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,'Please provide raing']
    },
    title:{
        type:String,
        trim:true,
        min:1,
        max:5,
        required:[true,'Please provide review title'],
        maxlength:100,
    },
    comment:{
        type: String,
        trim:true,
        required:[true,'Please provide comment'],
        
    },numOfReviews:{
        type: Number,
        default:0,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true,
    }
},{
    timestamps:true
});
ReviewSchema.index({product:1,user:1},{unique: true})



ReviewSchema.statics.calculateAverageRating = async function (productId) {
    const result = await this.aggregate([
      { $match: { product: productId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          numOfReviews: { $sum: 1 },
        },
      },
    ]);
  
    
    try {
      await this.model('Product').findOneAndUpdate(
        { _id: productId },
        {
          averageRating: Math.ceil(result[0]?.averageRating || 0),
          numOfReviews: result[0]?.numOfReviews || 0,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  
ReviewSchema.post('remove', async function () {
    console.log("dsa")
    await this.constructor.calculateAverageRating(this.product);
  });


  ReviewSchema.post('save', async function () {
    console.log("dsa")
    await this.constructor.calculateAverageRating(this.product);
  });
module.exports=mongoose.model('Review',ReviewSchema)