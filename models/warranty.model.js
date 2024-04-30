import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WarrantySchema = new Schema({

    itemName : {
        type : String,
        required: true,
        unique:true
    },

    customerName : {

        type : String,
        required:true
    },
    customerNIC : {
        type :String,
        required :true
    },
    
    warrantyPeriod : {
        type : Number,
        required : false
    },
    
   ItemQty : {
    type : Number,
    required : true
    }
    
})

const Warranty = mongoose.model("Warranty",WarrantySchema);
module.exports = Warranty;
