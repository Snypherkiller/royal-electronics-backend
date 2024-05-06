const router = require("express").Router();
let Customer = require("../models/customer.model");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const telephoneNo = Number(req.body.telephoneNo);
  const email = req.body.email;
  const idNumber = req.body.idNumber;
  const gender = req.body.gender;
  const password = req.body.password;

  const newCustomer = new Customer({
    name,
    telephoneNo,
    email,
    idNumber,
    gender,
    password,
  });
  newCustomer
    .save()
    .then(() => {
      res.json("Customer Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/login").post((req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body);
  Customer.findOne({ email: email })
    .then((customer) => {
      if (customer) {
        if (customer.password == password)
          res.status(200).send({ status: "success", id: customer._id });
        else res.status(401).send({ status: "request failed" });
      } else {
        console.log("No Customer")
        res.json({ status: "error", message: "Email does not exist" });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { name, telephoneNo, email, idNumber, gender, password } = req.body;

  console.log(req.body);

  const updateCustomer = {
    name,
    telephoneNo,
    email,
    idNumber,
    gender,
    password,
  };

  const update = await Customer.findByIdAndUpdate(userId, updateCustomer)
    .then(() => {
      res.status(200).send({ status: "User updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let password = req.body.password;
  console.log(req.body);
  let id = req.params.id;

  try {
    let customer = await Customer.findById(id);
    if (customer.password == password) {
      await Customer.findByIdAndDelete(id)
        .then(() => {
          res.status(200).send({ status: "User deleted" });
        })
        .catch((err) => {
          console.log(err.message);
          res
            .status(500)
            .send({ status: "Error with delete user", error: err.message });
        });
    } else {
      res.status(401).send({ status: "Error", message: "Wrong Password" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.route("/:id").get(async (req, res) => {
  let userId = req.params.id;
  const user = await Customer.findById(userId)
    .then((customer) => {
      res.status(200).send({ status: "User fetched", customer });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

module.exports = router;
