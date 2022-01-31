import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import employeeRouter from "./employee/employee.routes";
import createError from "http-errors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/employee", employeeRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  res.send({ error: "Route not Found" });
});

app.listen(4000);
