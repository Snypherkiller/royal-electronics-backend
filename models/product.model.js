const mongoose=require("mongoose");

const ProductSchema=new mongoose.Schema({
   
   productName:{
    type:String,
    required:true
   },
   discription:{
     type:String,
     required:true
   },
   image:{
    type:String,
    
   },
   addUser:{
    type:String,
    required:true
   }


});

const Products=mongoose.model("Producst",ProductSchema);

module.exports=Products;