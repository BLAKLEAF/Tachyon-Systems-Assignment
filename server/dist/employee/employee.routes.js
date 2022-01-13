"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = __importDefault(require("./employee.controller"));
const router = (0, express_1.Router)();
let employee = new employee_controller_1.default();
router.get("/", employee.getAllEmployees);
router.post("/", employee.createEmployee);
router.get("/:id", employee.getEmployee);
router.patch("/:id", employee.updateEmployee);
router.delete("/:id", employee.deleteEmployee);
exports.default = router;
