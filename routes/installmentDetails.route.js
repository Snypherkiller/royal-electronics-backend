const router = require ("express").Router();
let installmentDetails = require('../models/installmentDetails.model.js');



router.route("/add").post(async (req, res) => {
    const { NIC, amount } = req.body;
    const currentDate = new Date(); // Get current date
    const currentTime = currentDate.toLocaleTimeString(); // Get current time

    try {
        // Calculate total amount paid
        const installments = await InstallDetails.find({ NIC });
        let totalAmountPaid = 0;
        installments.forEach(installment => {
            totalAmountPaid += installment.amount;
        });

        const newInstallment = new InstallDetails({
            NIC,
            amount,
            date: currentDate,
            time: currentTime,
            totalamountpaid: Number(totalAmountPaid  +  amount), // Add current amount to total amount paid
            amountToBePaid: 0 // Assuming this should be calculated elsewhere in your application


            
        });

        await newInstallment.save();
        res.json("Amount added");
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error adding amount" });
    }
});


router.route("/").get((req,res)=>{
    installmentDetails.find()
        .then((installments)=>{
            res.json(installments);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({ error: "Error fetching amount" });
        });
});
/*
InstallmentDIRouter.route("/update/:NIC").put(async (req,res)=>{
    const NIC = req.params.NIC;
    const { amount } = req.body;
    const currentDate = new Date(); // Get current date
    const currentTime = currentDate.toLocaleTimeString(); // Get current time

    try {
        const updateInstallment = await InstallDetails.findOneAndUpdate({ NIC }, { amount, date: currentDate, time: currentTime });
        res.status(200).json({ status: "Installment updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error updating installment" });
    }
});

InstallmentDIRouter.route("/delete/:NIC").delete(async(req,res)=>{
    const NIC = req.params.NIC;

    try {
        await InstallDetails.findOneAndDelete({ NIC });
        res.status(200).json({ status: "Installment deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Error deleting installment" });
    }
});

InstallmentDIRouter.route("/get/:NIC").get(async (req, res) => {
    const NIC = req.params.NIC;

    try {
        const installment = await InstallDetails.findOne({ NIC });
        if (!installment) {
            return res.status(404).json({ status: "Error", error: "Installment not found" });
        }
        res.status(200).json({ status: "Installment fetched", installment });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error", error: err.message });
    }
});
*/
module.exports = router;
