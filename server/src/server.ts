import express from "express";
import cors from "cors";
import employeeRouter from "./employee/employee.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/employee", employeeRouter);

app.listen(4000);
