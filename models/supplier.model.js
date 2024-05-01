import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SupplierSchema = new Schema({

    supplierName: {
        type :String,
        required:true
    },
    supplierNIC : {
        type:String,
        required :true,
        unique:true
        
    },
    itemName : {
        type : String,
        required: true
    },
    itemQty : {
        type : Number,
        required : false
    },
    itemPrice : {
        type : Number,
        required : true
    },
    itemCategory : {
        type : String,
        required : true
    },

    totalPrice : {
    type : Number,
    required : true
    }
    
})

const Supplier = mongoose.model("Supplier",SupplierSchema);
module.exports = Supplier;