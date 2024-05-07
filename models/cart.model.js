import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Cart = new Schema
({

    items : {
        type : String,
        required: true,
        
        
     },
     ProductID : {
        type : String,
        required: true
    },
    Quantity : {
        type : Number,
        required : false
    },
    Price : {
        type : String,
        required : true,
        enum: ['Electronics', 'Mobile', 'Outdoor']
    },
    totalPrice : {
    type : Number,
    required : true
    }
})

const Crat = mongoose.model("Cart",Cart);
module.exports = Cart;