import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({

    itemName : {
        type : String,
        required: true,
        
        
        
    },
    itemDescription : {
        type : String,
        required: true
    },
    itemQty : {
        type : Number,
        required : false
    },
    itemCategory : {
        type : String,
        required : true,
        enum: ['Electronics', 'Mobile', 'Outdoor']
    },
   ItemPrice : {
    type : Number,
    required : true
    },
    imageUrl: {
        type: String,
        required: true 
    }

    
})

const Item = mongoose.model("Item",ItemSchema);
module.exports = Item;