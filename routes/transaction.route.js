const router  =require("express").Router();
let transaction = require("../models/transaction.model");


//Create transaction record
//http:localhost:8090/transaction/add
router.route("/add").post(async(req,res)=>{
    const {name,pprice,sprice,quantity,date}= req.body; 

    const newtransaction = new transaction({
        name: name,
        pprice: pprice,
        sprice: sprice,
        quantity: quantity,
        date :date

    })



    newtransaction.save().then(()=>{
        res.json("transaction Added")
    }).catch((err)=>{
        console.log(err);
    })    

})
   
//end Create record
    //starting get process for transaction

    //http:localhost:8090/transaction/
    router.route("/").get(async(req,res)=>{
        transaction.find().then((transaction)=>{
            res.json(transaction)
        }).catch((err)=>{
            console.log(err)

        })
    })

    //get the names field only  of transactions
    router.route("/:name").get(async(req,res)=>{
        transaction.find({},{name:1,_id:0}).
        then((transaction)=>{
            res.json(transaction)
        }).catch((err)=>{
            console.log(err)

        })
    })



    //http:localhost:8090/transaction/update/:name

    router.route("/update/:name").put(async(req,res)=>{
       let nameid=req.params.name;
       const {name,pprice,sprice,quantity}= req.body; 

    
    const updatetransaction = {
        name: name,
        pprice: pprice,
        sprice: sprice,
        quantity: quantity
    }

   

    await transaction.findOneAndUpdate({name:nameid},updatetransaction).then(()=>{
        res.status(200).send(({status :"User updated ",transaction:"updated"}))
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data ",err: err.message})
    
    }) 
    

    })

      //http:localhost:8090/transaction/delete/:name

    router.route("/delete/:name").delete(async(req,res)=>{
        let nameid=req.params.name;

        await transaction.findOneAndDelete({name:nameid})
        .then(()=>{res.status(200).send({status:"transaction deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete name",error: err.message})
    })
    })


module.exports =router;


