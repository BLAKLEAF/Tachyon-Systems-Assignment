"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
aws_sdk_1.default.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const dynamoClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
const TABLE_NAME = "employee";
class Employee {
    constructor() {
        this.createEmployee = async (employee) => {
            let params = {
                TableName: TABLE_NAME,
                Item: employee,
            };
            return await dynamoClient.put(params).promise();
        };
        this.getAllEmployees = async () => {
            const params = {
                TableName: TABLE_NAME,
            };
            const employees = await dynamoClient.scan(params).promise();
            return employees;
        };
    }
    async getEmployee(id) {
        let params = {
            TableName: TABLE_NAME,
            Key: {
                id,
            },
        };
        return await dynamoClient.get(params).promise();
    }
    async deleteEmployee(id) {
        let params = {
            TableName: TABLE_NAME,
            Key: {
                id: id,
            },
        };
        return await dynamoClient.delete(params).promise();
    }
}
exports.Employee = Employee;
