const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({

    name:{
        type : String,
        requird : true
    },
    address:{
        type : String,
        requird : true
    },
    nic:{
        type : String,
        requird : true
    },
    phone:{
        type : String,
        requird : true
    },
    email:{
        type : String,
        requird : true
    },
    birthday:{
        type : Date,
        requird : true
    },
    gender:{
        type : String,
        requird : true
    },
    position:{
        type : String,
        requird : true
    },
    salary:{
        type : Number,
        requird : true
    },
    othours:{
        type : Number,
        requird : true
    },
    attendance:{
        type : Number,
        requird : true
    },
    password:{
        type : String,
        requird : true
    }
});

const employee = mongoose.model("employee",employeeSchema);

module.exports = employee;