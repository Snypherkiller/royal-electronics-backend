const mongoose=require("mongoose");

const Review=new mongoose.Schema({
 
    review:{
        type:String,
        //required:true
    },
    reviewCatagory:{
        type:String,
        //required:true
    },
    reviewUser:{
        type:String,
       // required:true
    },
    productID:{
        type:String,
       // required:true
    }
});


const review =mongoose.model("Review",Review);

module.exports=review;