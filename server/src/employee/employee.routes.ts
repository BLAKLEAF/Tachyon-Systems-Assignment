import { Router } from "express";
import EmployeeController from "./employee.controller";

const router = Router();

let employee = new EmployeeController();

router.get("/", employee.getAllEmployees);

router.post("/", employee.createEmployee);

router.get("/:id", employee.getEmployee);

router.patch("/:id", employee.updateEmployee);

router.delete("/:id", employee.deleteEmployee);

// router.get("/name/:name", employee.getEmployeeByName);

export default router;
