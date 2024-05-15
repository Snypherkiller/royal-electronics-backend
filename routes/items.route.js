const router = require ("express").Router();
let Item = require("../models/item.model");

router.route("/add").post((req,res)=>{
    const itemName = req.body.itemName;
    const itemDescription = req.body.itemDescription;
    const itemQty = Number(req.body.itemQty);
    const itemCategory = req.body.itemCategory;
    const ItemPrice=Number(req.body.ItemPrice);
    const imageUrl = req.body.imageUrl;

    const newItem = new Item({
        itemName,
        itemDescription,
        itemQty,
        itemCategory,
        ItemPrice,
        imageUrl
    })

    newItem.save().then(()=>{
        res.json("Item added")
    }).catch((err)=>{

        console.log(err);

    })
})




router.route("/").get((req,res)=>{

    Item.find().then((items)=>{

    res.json(items)

    }).catch((err)=>{
        console.log(err)
    })


})

router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {  itemName , itemDescription, itemQty, itemCategory, ItemPrice,imageUrl } = req.body;

        const updateItem = {
            itemName,
            itemDescription,
            itemQty,
            itemCategory,
            ItemPrice,
            imageUrl
        };

        const updatedItem = await Item.findOneAndUpdate({ _id: id }, updateItem, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ status: "Item not found" });
        }
        
        res.status(200).json({ status: "Item updated", item: updatedItem });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await Item.findByIdAndDelete(id);

        res.status(200).json({ status: "Item deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with deleting item", error: err.message });
    }
});

router.route("get/:id").get(async (req, res) => {
    let itemId = req.params.id;
    console.log(itemId);
    const item = await employee.findById(itemId)
      .then((Item) => {
        res.status(200).send({ status: "user fetched", item : Item });
      })
      .catch((err) => {
        console.log(err.massage);
        res
          .status(500)
          .send({ status: "Error with get user", error: err.massage });
      });
  });


/*router.get("/get/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Item.findById({ id: id });
        if (!item) {
            return res.status(404).json({ status: "Item not found" });
        }
        res.status(200).json({ status: "Item fetched", item: item });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with item", error: err.message });
    }
});*/



module.exports = router;