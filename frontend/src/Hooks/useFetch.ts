import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

export interface IEmployee {
  firstName: string;
  surName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
}

export function useFetch() {
  let employeeObj = {
    firstName: "",
    surName: "",
    dateOfBirth: "",
    email: "",
    gender: "",
  };

  const [employeeID, setEmployeeID] = useState("");
  const [employeeData, setEmployeeData] = useState<IEmployee>(employeeObj);
  const [method, setMethod] = useState("Create");

  let { firstName, surName, email, dateOfBirth, gender } = employeeData;

  function getMethods(method: string) {
    setMethod(method);
  }

  async function createEmployee() {
    let response = await axios.post("http://localhost:4000/employee", {
      firstName,
      surName,
      email,
      dateOfBirth,
      gender,
    });
    console.log(response.data);
    setEmployeeData(employeeObj);
  }

  const readEmployee = useCallback(async () => {
    if (employeeID) {
      let response = await axios.get(
        `http://localhost:4000/employee/${employeeID}`
      );
      setEmployeeData(response.data);
      //       console.log("_id =" + employeeData._id);
      //       console.log(employeeID);
      //       console.log(response.data);
    }
  }, [employeeID]);

  useEffect(() => {
    readEmployee();
  }, [readEmployee]);

  async function updateEmployee() {
    try {
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
      console.log(response.data);
      setEmployeeData(employeeObj);
      setEmployeeID("");
    } catch (error) {
      console.log(error);
      console.log(firstName, surName, email, dateOfBirth, gender, employeeID);
    }
  }

  const deleteEmployee = async () => {
    try {
      let response = await axios.delete(
        `http://localhost:4000/employee/${employeeID}`
      );
      console.log(response.data);
      console.log(employeeID);
      setEmployeeData(employeeObj);
      setEmployeeID("");
    } catch (error) {
      console.log(error);
      console.log(firstName, employeeID);
    }
  };

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    method === "Create"
      ? createEmployee()
      : method === "Update"
      ? updateEmployee()
      : method === "Delete"
      ? deleteEmployee()
      : method === "Read"
      ? readEmployee()
      : setEmployeeData(employeeObj);
  }

  async function handleChange(event: React.ChangeEvent): Promise<void> {
    const { name, value } = event.target as HTMLInputElement;
    setEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      [name]: value,
    }));
  }

  const handleEmployeeID = (event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    setEmployeeID(value);
  };

  return {
    handleSubmit,
    handleChange,
    getMethods,
    setEmployeeData,
    handleEmployeeID,
    setEmployeeID,
    employeeID,
    employeeData,
    employeeObj,
  };
}
