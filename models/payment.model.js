const mongoose= require('mongoose')

const Schema = mongoose.Schema

const paymentDetails= new Schema({
    card_holder_Name:{
        type:String,
        required: true
    },

    number:{
        type:Number,
        required:true
    },

    cvv:{
        type:Number,
        required:true
    },

    eDate:{
        type:Date,
        required:true
    },

    price:{
        type: Number,
        required:true
    },

    /*slip:{
        type:String,
        required:true
    }*/

})

const payment=mongoose.model("payment",paymentDetails)
model.exports = payment;