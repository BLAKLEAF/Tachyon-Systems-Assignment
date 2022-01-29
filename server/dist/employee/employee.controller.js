"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employee_model_1 = require("./employee.model");
class EmployeeController {
    constructor() {
        this.getAllEmployees = async (req, res) => {
            try {
                let employees = await employee_model_1.EmployeeModel.find();
                res.status(200).send(employees);
            }
            catch (error) {
                res.status(500).send(error);
            }
        };
        this.createEmployee = async (req, res) => {
            try {
                const { firstName, surName, email, dateOfBirth, gender } = req.body;
                let employee = await employee_model_1.EmployeeModel.create({
                    firstName,
                    surName,
                    email,
                    dateOfBirth,
                    gender,
                });
                res.status(201).send(employee);
            }
            catch (error) {
                res.status(500).send(error);
                console.log(error);
            }
        };
        this.getEmployee = async (req, res) => {
            try {
                const employee = await employee_model_1.EmployeeModel.findById(req.params.id);
                res.status(201).send(employee);
            }
            catch (error) {
                res.status(500).send(error);
            }
        };
        this.updateEmployee = async (req, res) => {
            try {
                const { firstName, surName, email, dateOfBirth, gender } = req.body;
                let employee = await employee_model_1.EmployeeModel.findByIdAndUpdate(req.params.id, {
                    firstName,
                    surName,
                    email,
                    dateOfBirth,
                    gender,
                });
                res.status(201).send(employee);
            }
            catch (error) {
                res.status(500).send(error);
                console.log(error);
            }
        };
        this.deleteEmployee = async (req, res) => {
            try {
                const deletedEmployee = await employee_model_1.EmployeeModel.findByIdAndDelete(req.params.id);
                res.status(200).send(deletedEmployee);
            }
            catch (error) {
                res.status(500).send(error);
            }
        };
        this.getEmployeeByName = async (req, res) => {
            try {
                const employee = await employee_model_1.EmployeeModel.find({
                    firstName: { $regex: req.params.name, $options: "i" },
                });
                res.status(200).send(employee);
            }
            catch (error) {
                res.status(500).send(error);
            }
        };
    }
}
exports.default = EmployeeController;
