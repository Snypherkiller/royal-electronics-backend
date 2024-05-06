const router =require("express").Router();
const review = require("../models/review.model");
let Review=require("../models/review.model");

////// add review ................................../////
//Done//
router.route('/reviewAdd').post((req,res)=>{

    

    const{review,reviewCatagory,reviewUser,productID}=req.body;

    

    const productsRieview=new Review({
        review,
        reviewCatagory,
        reviewUser,
        productID
    })

    productsRieview.save().then(()=>{
        res.send("review added");
    }).catch((error)=>{
        console.log("Error review addded:",error)
    })

});


/////// get review.................................../////

router.route('/reviewGet').get((req,res)=>{
    Review.find().then((reviews)=>{
        res.json(reviews)
    }).catch((error)=>{
        console.log("review get error:",error);
    })
});

/// update review.....................///

router.put("/reviewUpdate/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {  review , reviewCatagory, reviewUser, productID } = req.body;

        const updateReview = {
            review,
            reviewCatagory,
            reviewUser,
            productID
        };

        const updatereview = await Review.findOneAndUpdate({ _id: id }, updateReview, { new: true });

        if (!updatereview) {
            return res.status(404).json({ status: "Review not found" });
        }
        
        res.status(200).json({ status: "Review updated", Review: updateReview });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with updating Review", error: err.message });
    }
});

///// delete review............////

router.route("/reviewDelete/:id").delete(async (req, res) => {
    let reviewId = req.params.id;
  
    await Review
      .findByIdAndDelete(reviewId)
      .then(() => {
        res.status(200).send({ status: "Review deleted" });
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "Error with delete Review", error: err.massage });
      });
  });



  //fetched user data

  router.get("/findR/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ status: "Review not found" });
        }
        res.status(200).json({ status: "Review fetched", review: review });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with review", error: err.message });
    }
});


module.exports=router;