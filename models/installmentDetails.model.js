import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InstallDetailsSchema = new Schema({
    NIC: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    totalamountpaid: {
        type: String,
        required: true
    },
    amountToBePaid: {
        type: String,
        required: true
    }

});

const InstallDetails = mongoose.model("InstallmentDetails", InstallDetailsSchema);
module.exports =InstallDetailsSchema;