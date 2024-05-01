import mongoose from "mongoose";

const Schema =mongoose.Schema;

const furnitureSchema = new Schema({

    name :{
        type : String,
        required :true,
        unique :true
    },
    type :{
        type : String,
        required :true
    },
    pprice :{
        type : Number,
        required :true
    },
    status :{
        type : String,
        required :true
    },
    quantity :{
        type : Number,
        required :false
    },
    sprice :{
        type : Number,
        required :true
    },
    description :{
        type : String,
        required :true
    }
})

const furniture =mongoose.model("Furniture",furnitureSchema);
module.exports = furniture;