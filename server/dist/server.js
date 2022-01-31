"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const employee_routes_1 = __importDefault(require("./employee/employee.routes"));
const http_errors_1 = __importDefault(require("http-errors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/employee", employee_routes_1.default);
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, "Requested data not found"));
});
const handleErrors = (error, req, res, next) => {
    res.status(error.status || 500).send({
        status: error.status || 500,
        message: error.message,
    });
};
app.use(handleErrors);
app.listen(4000);
