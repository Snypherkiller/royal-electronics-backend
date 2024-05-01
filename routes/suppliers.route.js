const router = require ("express").Router();
let Supplier = require("../models/supplier.model");

router.route("/add").post((req,res)=>{
    const supplierName = req.body.supplierName;
    const supplierNIC = req.body.supplierNIC;
    const itemName = req.body.itemName;
    const itemQty = Number(req.body.itemQty);
    const itemPrice=Number(req.body.itemPrice);
    const itemCategory = req.body.itemCategory;
    const totalPrice=Number(req.body.totalPrice);

    const newSupplier = new Supplier({
        supplierName,
        supplierNIC,
        itemName,
        itemQty,
        itemPrice,
        itemCategory,
        totalPrice
    })

    newSupplier.save().then(()=>{
        res.json("Supplier added")
    }).catch((err)=>{

        console.log(err);

    })
})

router.route("/").get((req,res)=>{

    Supplier.find().then((supplier)=>{

    res.json(supplier)

    }).catch((err)=>{
        console.log(err)
    })


})

router.route("/update/:NameId").put(async (req,res)=>{

    let NameId = req.params.supplierNIC;

    
     const { supplierName,supplierNIC,itemName,itemQty,itemPrice,itemCategory,totalPrice }= req.body;

     const updateSupplier ={
        supplierName,
        supplierNIC,
        itemName,
        itemQty,
        itemPrice,
        itemCategory,
        totalPrice
     }

     const update =await Supplier.findOneAndUpdate(NameId,updateSupplier)
     .then(()=>{

        res.status(200).send({status:"Supplier updated",supplier: update})

     }).catch(()=>{
        console.log("Error");
        res.status(500).send({status:"Error with updating data"});
     })

})

router.route("/delete/:supplierNIC").delete(async(req,res)=>{

    let supplierNIC=req.params.supplierNIC;

    await Supplier.findOneAndDelete(supplierNIC).then(()=>{

        res.status(200).send({status:"Supplier deleted"});
    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status:"Error with delete Supplier",error:err.message});
    })

})

router.route("/get/:supplierNIC").get(async(req,res)=>{
    
    let SupplierId=req.params.supplierNIC;
    const supplier= await Supplier.findOne(SupplierId)
    .then(()=>{
        res.status(200).send({status :"Supplier fetched",item:item})

    }).catch(()=>{

        console.log(err.message);
        res.status(200).send({status:"Error with ",error:err.message});
    })


})

module.exports = router;


