const router = require ("express").Router();
let Payment = require("../models/payment.model");

router.route("/add").post((req,res)=>{
    const card_holder_Name = req.body.card_holder_Name;
    const number = req.body.number;
    const cvv = Number(req.body.cvv);
    const eDate = req.body.eDate;
    const price=Number(req.body.price);

    const newPayment = new Payment({
        card_holder_Name,
        number,
        cvv,
        eDate,
        price
    
    })

    newPayment.save().then(()=>{
        res.json("payment added")
    }).catch((err)=>{

        console.log(err);

    })
})




router.route("/").get((req,res)=>{

    Payment.find().then((Payments)=>{

    res.json(Payments)

    }).catch((err)=>{
        console.log(err)
    })


})

router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {  card_holder_Name , number, cvv, eDate, price,imageUrl } = req.body;

        const updatePayment = {
            card_holder_Name,
            number,
            cvv,
            eDate,
            price
        };

        const updatedPayment= await Payment.findOneAndUpdate({ _id: id }, updatedPayment, { new: true });

        if (!updatedPayment) {
            return res.status(404).json({ status: "Payment not found" });
        }
        
        res.status(200).json({ status: "Payment updated", Payment: updatedPayment });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
});

router.delete("/delete/:card_holder_Name", async (req, res) => {
    try {
        const card_holder_Name = req.params.card_holder_Name;

        await Payment.findOneAndDelete({ card_holder_Name: card_holder_Name });

        res.status(200).json({ status: "Payment deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with deleting Payment", error: err.message });
    }
});

router.get("/get/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const Payment = await Payment.findOne({ id: id });
        if (!Payment) {
            return res.status(404).json({ status: "Payment not found" });
        }
        res.status(200).json({ status: "Payment fetched", Payment: Payment });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with Payment", error: err.message });
    }
});


/*router.get("/get/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const Payment = await Payment.findById({ id: id });
        if (!Payment) {
            return res.status(404).json({ status: "Payment not found" });
        }
        res.status(200).json({ status: "Payment fetched", Payment: Payment });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with Payment", error: err.message });
    }
});*/



module.exports = router;