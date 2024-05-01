const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrivilegedCustomerSchema = new Schema({

    name : {
        type : String,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    phoneNumber : {
        type : Number,
        required: true
    },
})

const PCustomer = mongoose.model("PCustomer" , PrivilegedCustomerSchema);

module.exports = PCustomer;