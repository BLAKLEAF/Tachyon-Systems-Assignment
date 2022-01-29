import { RequestHandler, Request } from "express";
import { IEmployee, EmployeeModel } from "./employee.model";

export default class EmployeeController {
  getAllEmployees: RequestHandler = async (req, res) => {
    try {
      let employees = await EmployeeModel.find();
      res.status(200).send(employees);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  createEmployee: RequestHandler = async (req, res) => {
    try {
      const { firstName, surName, email, dateOfBirth, gender }: IEmployee =
        req.body;
      let employee = await EmployeeModel.create<IEmployee>({
        firstName,
        surName,
        email,
        dateOfBirth,
        gender,
      });
      res.status(201).send(employee);
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  };
  getEmployee: RequestHandler = async (req, res) => {
    try {
      const employee = await EmployeeModel.findById(req.params.id);
      res.status(201).send(employee);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  updateEmployee: RequestHandler = async (req, res) => {
    try {
      const { firstName, surName, email, dateOfBirth, gender }: IEmployee =
        req.body;
      let employee = await EmployeeModel.findByIdAndUpdate(req.params.id, {
        firstName,
        surName,
        email,
        dateOfBirth,
        gender,
      });
      res.status(201).send(employee);
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  };
  deleteEmployee: RequestHandler = async (req, res) => {
    try {
      const deletedEmployee = await EmployeeModel.findByIdAndDelete(
        req.params.id
      );
      res.status(200).send(deletedEmployee);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  getEmployeeByName: RequestHandler = async (req, res) => {
    try {
      const employee = await EmployeeModel.find({
        firstName: { $regex: req.params.name, $options: "i" },
      });
      res.status(200).send(employee);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}
