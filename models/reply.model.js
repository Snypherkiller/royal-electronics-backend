const mongoose=require("mongoose");

const Reply=new mongoose.Schema({
    
    reply:{
        type:String,
        required:true
    },
    replyUser:{
        type:String,
        required:true
    },
    reviewID:{
        type:String,
        required:true
    },
    productsId:{
        type:String,
        required:true
    }
});

const reply =mongoose.model("Reply",Reply);

module.exports=reply;