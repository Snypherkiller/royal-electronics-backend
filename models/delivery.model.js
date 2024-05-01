import mongoose from "mongoose";

const Dschema = mongoose.Schema;

const Delivery =new Dschema({

    //6 columns

    deliveryid:{
        type: String,
        required:true,
        unique : true
    },
    customername:{
        type:String,
        required: true
    },
    items:{
        type: String,
        required:true
    },
    transactionid:{
        type : String,
        required : true,

    },
    address:{
        type: String,
        required : true
    },
    status:{
        type:String,
        required:true,
        default: "Initiated"
    }

    
    

})

const delivery = mongoose.model("Delivery",Delivery);
module.exports =delivery;