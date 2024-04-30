import express from "express";
import cors from "cors";  
import logger from "./utils/logger.js";
import 'dotenv/config';

import {connect} from "./utils/database.connection.js";


const app = express();
const PORT = process.env.PORT || "8090";

app.use(
    cors()
);

app.use(express.json({ limit : "20mb"}));

app.get("/",(req,res,next) =>{
    res.send("<h2> Electrical Shop ERP <h2>");
    next();
});

const employeeRouter = require("./routes/employees.route.js");

const itemsRouter = require("./routes/items.route");
const warrantyRouter=require("./routes/warranties.route");
const supplierRouter=require ("./routes/suppliers.route");


app.use("/employee",employeeRouter);

app.use("/items",itemsRouter);
app.use("/items/warranties",warrantyRouter);
app.use("/suppliers",supplierRouter);





app.listen(PORT, () => {
    logger.info(`Server is up and running on PORT ${PORT}`);
    connect();
});


