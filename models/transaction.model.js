import mongoose from "mongoose";

const Tschema = mongoose.Schema;

const Transactions =new Tschema({

    name:{
        type: String,
        required:true,
    },
    pprice:{
        type : Number,
        required : true
    },
    sprice:{
        type : Number,
        required : true
    },
    quantity:{
        type:Number,
        required:true
    },
    date: {
        type : Date,
         default: Date.now 

    }
    

})

const transactions = mongoose.model("Transaction",Transactions);
module.exports =transactions; 