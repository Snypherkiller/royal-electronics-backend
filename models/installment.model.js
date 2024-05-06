 
 import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InstallmentSchema = new Schema({

    name: {
        type :String,
        required:true
    },
    NIC : {
        type:String,
        required :true,
        
    },
    Tel : {
        type : Number,
        required : false
    },
    Address : {
        type : String,
        required: true
    },
    Payment : {
        type : Number,
        required: false
    },
    installment : {
        type : Number,
        required: false
    }
    
    
    
    
})

const installment = mongoose.model("installment",InstallmentSchema);
module.exports =InstallmentSchema;