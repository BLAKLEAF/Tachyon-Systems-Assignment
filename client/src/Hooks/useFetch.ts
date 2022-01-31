import axios from "axios";
import { IEmployeeData } from "../Reducer/reducer";

export function useFetch() {
  async function createEmployee({
    firstName,
    surName,
    email,
    dateOfBirth,
    gender,
  }: IEmployeeData) {
    let response = await axios.post("http://localhost:4000/employee", {
      firstName,
      surName,
      email,
      dateOfBirth,
      gender,
    });

    return response.data;
  }

  async function readEmployee(employeeID: string) {
    let response = await axios.get(
      `http://localhost:4000/employee/${employeeID}`
    );
    // return response.data; // For MongoDB
    return response.data.Item; // For DynamoDB
  }

  async function updateEmployee(
    { firstName, surName, email, dateOfBirth, gender }: IEmployeeData,
    employeeID: string
  ) {
    let response = await axios.patch(
      `http://localhost:4000/employee/${employeeID}`,
      {
        firstName,
        surName,
        email,
        dateOfBirth,
        gender,
      }
    );
    return response.data;
  }

  const deleteEmployee = async (employeeID: string) => {
    let response = await axios.delete(
      `http://localhost:4000/employee/${employeeID}`
    );
    return response.data;
  };

  return {
    createEmployee,
    readEmployee,
    updateEmployee,
    deleteEmployee,
  };
}
