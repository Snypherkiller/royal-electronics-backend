const router =require("express").Router();
let delivery =require("../models/delivery.model");

//create delivery record 
//http:localhost:8090/delivery/add

router.route("/add").post(async(req,res)=>{
    const {deliveryid,customername,items,transactionid,address,status}=req.body;

    const newdelivery = new delivery({

        deliveryid:deliveryid,
        customername:customername,
        items:items,
        transactionid:transactionid,
        address:address,
        status:status
    })

    newdelivery.save().then(()=>{
        res.json("Delivery created")
    }).catch((err)=>{
        console.log(err);

    })

})//end creation of delivery

//starting get all deliveries
//http:localhost:8090/delivery/
router.route("/").get(async(res,req)=>{
    delivery.find().then((delivery)=>{
        res.json(delivery)
    }).catch((err)=>{
        console.log(err);
    })

    //http:localhost:8090/transaction/update/:name
    router.route("/update/:deliveryid").put(async(res,req)=>{
        let deliverynum=req.params.deliveryid
        const {deliveryid,customername,items,transactionid,address,status}=req.body

        


    })


})

module.exports=router;