const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type : String,
        required : false
    },
    telephoneNo : {
        type : Number,
        required : false
    },
    email : {
        type : String,
        required : true
    },
    idNumber : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : false
    },
    password : {
        type : String,
        required : true
    }

})

const Customer = mongoose.model("Customer",customerSchema);

module.exports = Customer;