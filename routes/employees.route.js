const router = require("express").Router();
let employee = require("../models/employee.model");



//read data

router.route("/").get((req, res) => {
    employee
      .find()
      .then((employees) => {
        res.json(employees);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //Login 

  router.route("/login").post((req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body);
    employee.findOne({ email: email })
      .then((employee) => {
        if (employee) {
          if (employee.password == password)
            res.status(200).send({ status: "success", id: employee._id });
          else res.status(401).send({ status: "request failed" });
        } else {
          console.log("No employee")
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

//fetched user data

router.route("/:id").get(async (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  const user = await employee.findById(userId)
    .then((employee) => {
      res.status(200).send({ status: "user fetched", user: employee });
    })
    .catch((err) => {
      console.log(err.massage);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.massage });
    });
});


  //insert data
  
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const nic = req.body.nic;
  const phone = req.body.phone;
  const email = req.body.email;
  const birthday = req.body.birthday;
  const gender = req.body.gender;
  const position = req.body.position;
  const salary = parseFloat(req.body.salary);
  const othours = parseFloat(req.body.othours);
  const attendance = Number(req.body.attendance);
  const password = req.body.password;

  const newemployee = new employee({
    name,
    address,
    nic,
    phone,
    email,
    birthday,
    gender,
    position,
    salary,
    othours,
    attendance,
    password,
  });



  newemployee
    .save()
    .then(() => {
      res.json("employee Added");
    })
    .catch((err) => {
      console.log(err);
    });
});


//update data

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const {
    name,
    address,
    nic,
    phone,
    email,
    birthday,
    gender,
    position,
    salary,
    othours,
    attendance,
    password,
  } = req.body;

  const updateemployee = {
    name,
    address,
    nic,
    phone,
    email,
    birthday,
    gender,
    position,
    salary,
    othours,
    attendance,
    password,
  };

  const update = await employee
    .findByIdAndUpdate(userId, updateemployee)
    .then(() => {
      res.status(200).send({ status: "user updated", user: update });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.massage });
    });
});

//delete data

router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await employee
    .findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "user deleted" });
    })
    .catch((err) => {
      console.log(err.massage);
      res
        .status(500)
        .send({ status: "Error with delete user", error: err.massage });
    });
});

module.exports = router;
