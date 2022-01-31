import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "employee";

export class Employee {
  createEmployee = async (employee: object) => {
    let params = {
      TableName: TABLE_NAME,
      Item: employee,
    };
    return await dynamoClient.put(params).promise();
  };

  getAllEmployees = async () => {
    const params = {
      TableName: TABLE_NAME,
    };
    const employees = await dynamoClient.scan(params).promise();
    return employees;
  };

  async getEmployee(id: string) {
    let params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    };
    return await dynamoClient.get(params).promise();
  }

  async deleteEmployee(id: string) {
    let params = {
      TableName: TABLE_NAME,
      Key: {
        id: id,
      },
    };
    return await dynamoClient.delete(params).promise();
  }
}
