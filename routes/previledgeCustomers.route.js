const router = require("express").Router();
let PCustomer = require("../models/privilegedCustomer.model");

router.route("/add").post((req,res) => {

    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = Number(req.body.phoneNumber);

    const NewPcustomer = new PCustomer({

        name,
        address,
        phoneNumber
    })

    NewPcustomer.save().then(() =>{

        res.json("Privileged customer Added")

    }).catch((err) =>{

        console.log(err);

    })

})

router.route("/").get((req,res) =>{

    PCustomer.find().then((Pcustomer) =>{

        res.json(Pcustomer)

    }).catch((err) =>{

        console.log(err)
        
    })
})

router.route("/update/:PCid").put(async(req,res) =>{

    let userId = req.params.PCid;
    const {name , address , phoneNumber} = req.body;

    const updatePcustomer = {

        name,
        address,
        phoneNumber
        
    }

    const update = await PCustomer.findByIdAndUpdate(userId, updatePcustomer)
    .then(() => {
        res.status(200).send({status: "User Updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })

})

router.route("/delete/:PCid").delete(async (req,res) => {
    
    let PCid = req.params.PCid;

    await PCustomer.findByIdAndDelete(PCid)
    .then(() => {
        res.status(200).send({status: "User deletes"});
    }).catch((err) => {
        console.log(err.message); 
        res.status(500).send({status: "Error with delete user", error: err.message})
    })
})
 
router.route("/get/:PCid").get(async(req,res) => {

    let userId = req.params.PCid;

    const user = await PCustomer.findById(userId)
    .then((PCustomer) =>{
        res.status(200).send({status: "User feched" , PCustomer})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user" , error: err.message});
    })
})

module.exports = router;
