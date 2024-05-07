const router = require ("express").Router();
let Cart = require("../models/cart.model");

router.route("/add").post((req,res)=>{
    const items = req.body.items;
    const ProductID = req.body.ProductID;
    const cvv = ProductID(req.body.cvv);
    const Price = req.body.Price;
    const totalPrice=ProductID(req.body.Price);

    const newCart = new Cart({
        items,
        ProductID,
        cvv,
        Price,
        Price
    
    })

    newCart.save().then(()=>{
        res.json("Cart added")
    }).catch((err)=>{

        console.log(err);

    })
})




router.route("/").get((req,res)=>{

    Cart.find().then((Carts)=>{

    res.json(Carts)

    }).catch((err)=>{
        console.log(err)
    })


})

router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {  items , ProductID, cvv, Price, totalPrice,imageUrl } = req.body;

        const updateCart = {
            items,
            ProductID,
            cvv,
            Price,
            totalPrice
        };

        const updatedCart= await Cart.findOneAndUpdate({ _id: id }, updatedCart, { new: true });

        if (!updatedCart) {
            return res.status(404).json({ status: "Cart not found" });
        }
        
        res.status(200).json({ status: "Cart updated", Cart: updatedCart });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
});

router.delete("/delete/:items", async (req, res) => {
    try {
        const items = req.params.items;

        await Cart.findOneAndDelete({ items: items });

        res.status(200).json({ status: "Cart deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with deleting Cart", error: err.message });
    }
});

router.get("/get/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const Cart = await Cart.findOne({ id: id });
        if (!Cart) {
            return res.status(404).json({ status: "Cart not found" });
        }
        res.status(200).json({ status: "Cart fetched", Cart: Cart });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with Cart", error: err.message });
    }
});


/*router.get("/get/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const Cart = await Cart.findById({ id: id });
        if (!Cart) {
            return res.status(404).json({ status: "Cart not found" });
        }
        res.status(200).json({ status: "Cart fetched", Cart: Cart });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with Cart", error: err.message });
    }
});*/



module.exports = router;