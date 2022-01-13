"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    surName: { type: String, required: true },
    email: { type: String, lowercase: true },
    dateOfBirth: { type: String },
    gender: { type: String, required: true },
});
exports.EmployeeModel = (0, mongoose_1.model)("Employee", schema);
run().catch((err) => console.log(err));
async function run() {
    await (0, mongoose_1.connect)("mongodb://localhost:27017/employee");
}
