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

  //insert data

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
