const mongoose=require("mongoose");

const PuchersProducts=new mongoose.Schema({
    
    puchersUser:{
        type:String,
        required:true
    },
    productPuchersId:{
        type:String,
        required:true
    }
});

const Puchers=mongoose.model("myPuchers",PuchersProducts);

module.exports=Puchers;