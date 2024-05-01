const router  =require("express").Router();
let furniture = require("../models/furniture.model");
let jsonnames;

//Create furniture record
//http:localhost:8090/furniture/add
router.route("/add").post(async(req,res)=>{
    const {name,type,pprice,status,quantity,sprice,description}= req.body; 

    const newfurniture = new furniture({
        name: name,
        type: type,
        pprice: pprice,
        status: status,
        quantity: quantity,
        sprice: sprice,
        description:description

    })



    newfurniture.save().then(()=>{
        res.json("Furniture Added")
    }).catch((err)=>{
        console.log(err);
    })    

})
   
//end Create record
    //starting get process

    //http:localhost:8090/furniture/
    router.route("/").get(async(req,res)=>{
        furniture.find().then((furniture)=>{
            res.json(furniture)
        }).catch((err)=>{
            console.log(err)

        })
    })

    //code to get equipment by category 
    router.route("/get/:type").get(async(req,res)=>{
        let Type=req.params.type;

        furniture.find({type:Type},{}).then((furniture)=>{
            res.json(furniture)
        }).catch((err)=>{
            console.log(err)

        })
    })





    //get the names field only
    router.route("/:name").get(async(req,res)=>{
        let Name=req.params.name;

        furniture.find({name:Name},{}).
        then((furniture)=>{
            jsonnames=furniture;
            res.json(furniture)
        }).catch((err)=>{
            console.log(err)

        })
    })

    router.route("/names").get(async(req,res)=>{
        furniture.find({},{name:1,_id:0}).
        then((furniture)=>{
            jsonnames=furniture;
            res.json(furniture)
        }).catch((err)=>{
            console.log(err)

        })
    })



    //http:localhost:8090/furniture/update/:name

    router.route("/update/:name").put(async(req,res)=>{
       let nameid=req.params.name;
       const {name,type,pprice,status,quantity,sprice,description}= req.body;

    
    const updatefurniture = {
        name:name,
        type:type,
        pprice:pprice,
        status:status,
        quantity:quantity,
        sprice:sprice,
        description:description
    }

   

    await furniture.findOneAndUpdate({name:nameid},updatefurniture).then(()=>{
        res.status(200).send(({status :"User updated ",furniture:"updated"}))
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data ",err: err.message})
    
    }) 
    

    })

      //http:localhost:8090/furniture/delete/:name

    router.route("/delete/:name").delete(async(req,res)=>{
        let nameid=req.params.name;

        await furniture.findOneAndDelete({name:nameid})
        .then(()=>{res.status(200).send({status:"furniture deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete name",error: err.message})
    })
    })


module.exports =router;
export default jsonnames;

