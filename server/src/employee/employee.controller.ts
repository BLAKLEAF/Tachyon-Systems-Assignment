import { RequestHandler, Request } from "express";
// import { Employee } from "./Database/employee.mongo";
import { Employee } from "./Database/employee.dynamo";
import uniqid from "uniqid";

// export default class EmployeeController {
//   getAllEmployees: RequestHandler = async (req, res) => {
//     try {
//       let employees = await Employee.find();
//       res.status(200).send(employees);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   };
//   createEmployee: RequestHandler = async (req, res) => {
//     try {
//       let employee = await Employee.create({
//         employeeData: req.body,
//       });
//       res.status(201).send(employee);
//     } catch (error) {
//       res.status(500).send(error);
//       console.log(error);
//     }
//   };
//   getEmployee: RequestHandler = async (req, res) => {
//     try {
//       const employee = await Employee.findById(req.params.id);
//       res.status(200).send(employee);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   };
//   updateEmployee: RequestHandler = async (req, res) => {
//     try {
//       let employee = await Employee.findByIdAndUpdate(req.params.id, {
//         employeeData: req.body,
//       });
//       res.status(201).send(employee);
//     } catch (error) {
//       res.status(500).send(error);
//       console.log(error);
//     }
//   };
//   deleteEmployee: RequestHandler = async (req, res) => {
//     try {
//       const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
//       res.status(200).send(deletedEmployee);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   };

//   getEmployeeByName: RequestHandler = async (req, res) => {
//     try {
//       const employee = await Employee.find({
//         firstName: req.params.name,
//       });
//       res.status(200).send(employee);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   };
// }

let employee = new Employee();
export default class EmployeeController {
  getAllEmployees: RequestHandler = async (req, res) => {
    try {
      let employees = await employee.getAllEmployees();
      res.status(200).send(employees);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  createEmployee: RequestHandler = async (req, res) => {
    try {
      let newEmployee = await employee.createEmployee({
        id: uniqid(),
        employeeData: req.body,
      });
      res.status(201).send(newEmployee);
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  };
  getEmployee: RequestHandler = async (req, res) => {
    try {
      const data = await employee.getEmployee(req.params.id);
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send("OOPs");
    }
  };
  updateEmployee: RequestHandler = async (req, res) => {
    try {
      let data = await employee.createEmployee({
        id: req.params.id,
        employeeData: req.body,
      });
      res.status(201).send(data);
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  };
  deleteEmployee: RequestHandler = async (req, res) => {
    try {
      const deletedEmployee = await employee.deleteEmployee(req.params.id);
      res.status(204).send(deletedEmployee);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}
