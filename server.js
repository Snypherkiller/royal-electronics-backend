import express from "express";
import cors from "cors";
import logger from "./utils/logger.js";
import "dotenv/config";

import { connect } from "./utils/database.connection.js";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE, PATCH",
    credentials: true,
  })
)

app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res, next) => {
  res.send("<h2> Electrical Shop ERP <h2>");
  next();
});


//Gayan
const employeeRouter = require("./routes/employees.route.js");

//Dunith
const itemsRouter = require("./routes/items.route");
const warrantyRouter = require("./routes/warranties.route");
const supplierRouter = require("./routes/suppliers.route");

//Chiranjaya
const furnitureRouter = require("./routes/furniture.route");
const transactionRouter = require("./routes/transaction.route");
const deliveryRouter = require("./routes/delivery.route");

//yatawara
const InstallmentRouter = require("./routes/installment.route.js");
const InstallmentDetails=require("./routes/installmentDetails.route.js")

//Heshani
const reviewRoutes=require("./routes/review.route.js");

//Sakindu
const PCustomerRouter = require("./routes/previledgeCustomers.route.js");


//chathuni
const customerRouter =require("./routes/customer.route.js")

//chathurika
const PaymentDetailsRouter=require("./routes/payment.route.js")

//anushka
const cartRouter=require("./routes/cart.route.js")






//Gayan
app.use("/employee", employeeRouter);

//Dunith
app.use("/items", itemsRouter);
app.use("/items/warranties", warrantyRouter);
app.use("/suppliers", supplierRouter);

//Chiranjaya
app.use("/furniture", furnitureRouter);
app.use("/transaction", transactionRouter);
app.use("/delivery", deliveryRouter);

//yatawara
app.use("/installment",InstallmentRouter);
app.use("/installmentDetails",InstallmentDetails);

//Heshani
app.use("/review",reviewRoutes);

//Sakindu
app.use("/PCustomer" , PCustomerRouter);

//Chathuni
app.use("/customer" , customerRouter)

//chathurika
app.use("/Payment" , PaymentDetailsRouter)

//anushka
app.use("Cart" , cartRouter)



app.listen(PORT, () => {
  logger.info(`Server is up and running on PORT ${PORT}`);
  connect();
});
