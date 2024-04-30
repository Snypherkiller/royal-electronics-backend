const router = require ("express").Router();
let Warranty = require("../models/warranty.model");

router.route("/add").post((req,res)=>{
    const itemName = req.body.itemName;
    const customerName=req.body.customerName;
    const customerNIC=req.body.customerNIC;
    const warrantyPeriod=Number(req.body.warrantyPeriod);
    const ItemQty = Number(req.body.ItemQty);
    
   
    const newWarranty = new Warranty({
        itemName,
        customerName,
        customerNIC,
        warrantyPeriod,
        ItemQty
    })

    newWarranty.save().then(()=>{
        res.json("Warranty saved ")
    }).catch((err)=>{

        console.log(err);

    })
})

router.route("/").get((req,res)=>{

    Warranty.find().then((warranty)=>{

    res.json(warranty)

    }).catch((err)=>{
        console.log(err)
    })


})

router.route("/update/:NameId").put(async (req,res)=>{

    let NameId = req.params.customerNIC;

    
     const { itemName,customerName,customerNIC,warrantyPeriod,ItemQty }= req.body;

     const updateWarranty ={
        itemName,
        customerName,
        customerNIC,
        warrantyPeriod,
        ItemQty

     }

     const update =await Warranty.findOneAndUpdate(NameId,updateWarranty)
     .then(()=>{

        res.status(200).send({status:"Warranty updated",warranty: update})

     }).catch(()=>{
        console.log("Error");
        res.status(500).send({status:"Error with updating data"});
     })

})

router.route("/delete/:id").delete(async(req,res)=>{

    let WarrantyId=req.params.id;

    await Warranty.findByIdAndDelete(WarrantyId).then(()=>{

        res.status(200).send({status:"Warranty deleted"});
    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status:"Error with delete warranty",error:err.message});
    })

})

router.route("/get/:id").get(async(req,res)=>{
    
    let warrantyId=req.params.id;
    const warranty= await Warranty.findOne(ItemName)
    .then(()=>{
        res.status(200).send({status :"Warranty fetched",warranty:warranty})

    }).catch(()=>{

        console.log(err.message);
        res.status(200).send({status:"Error with warranty",error:err.message});
    })


})

module.exports = router;
