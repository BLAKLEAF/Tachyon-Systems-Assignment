"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({ employeeData: Object });
exports.Employee = (0, mongoose_1.model)("Employee", schema);
run().catch((err) => console.log(err));
async function run() {
    await (0, mongoose_1.connect)("mongodb://localhost:27017/employee");
}
