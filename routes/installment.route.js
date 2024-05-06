const router = require ("express").Router();
let installment = require('../models/installment.model.js');



router.route("/add").post(async(req,res)=>{
    const {name,NIC,Tel,Address,Payment,installment}= req.body; 

    const newinstallment = new installment({
        name:name,
        NIC:NIC,
        Tel:Tel,
        Address:Address,
        Payment:Payment,
        installment:installment

    })



    newinstallment.save().then(()=>{
        res.json("Installment Added")
    }).catch((err)=>{
        console.log(err);
    })    

})




router.route("/").get((req, res) => {
    installment.find().then((installment) => {
        res.json(installment);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/update/:NameId").put(async (req, res) => {
    let NameId = req.params.NIC;

    const { name, NIC, Tel, Address, Payment, Instsllment } = req.body;

    const updateInstallment = {
        name,
        NIC,
        Tel,
        Address,
        Payment,
        Instsllment
    };

    const update = await installment.findOneAndUpdate(NameId, updateInstallment)
        .then(() => {
            res.status(200).send({ status: "installment updated" });
        }).catch(() => {
            console.log("Error");
            res.status(500).send({ status: "Error with updating data" });
        });
});

router.route("/delete/:NIC").delete(async (req, res) => {
    let NIC = req.params.NIC;

    await installment.findOneAndDelete({ NIC: NIC })
        .then(() => {
            res.status(200).json({ status: "INstallment deleted" });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with deleting Installment", error: err.message });
        });
});

router.route("/get/:id").get(async (req, res) => {
    try {
        const InstallmentId = req.params.id;
        const installmentId = await installment.findOne({ NIC: InstallmentId });
        if (!installment) {
            return res.status(404).send({ status: "Error", error: "Installment not found" });
        }
        res.status(200).send({ status: "Installment fetched", installment: installmentId });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error", error: err.message });
    }
});

module.exports = router;
