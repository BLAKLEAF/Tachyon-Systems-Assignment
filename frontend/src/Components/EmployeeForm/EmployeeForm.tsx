import {
  EmployeeInfoBox,
  Input,
  SubmitButton,
  Gender,
  Button,
} from "../../styles/styles";
import { useFetch } from "../../Hooks/useFetch";
import { useMethods } from "../../Hooks/useMethods";
import React, { useContext, ChangeEvent } from "react";
import { EmployeeContext } from "../../Context/context";
import { ActionType, IEmployeeData } from "../../Reducer/reducer";

function EmployeeForm() {
  const { capitalizeFirstLetter } = useMethods();
  const { createEmployee, readEmployee, updateEmployee, deleteEmployee } =
    useFetch();
  let { employeeState, dispatch } = useContext(EmployeeContext);
  let { employeeData, method, employeeID } = employeeState;

  let GENDER = ["Male", "Female", "Other"];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (method === "create") {
      try {
        console.log(employeeData);
        let data = await createEmployee(employeeData as IEmployeeData);
        console.log(data);
        dispatch({ type: ActionType.CREATE });
      } catch (error) {
        alert(error);
      }
    } else if (method === "update" && employeeID) {
      let data = await updateEmployee(
        employeeData as IEmployeeData,
        employeeID
      );
      console.log(data);
    } else if (method === "delete" && employeeID) {
      let data = await deleteEmployee(employeeID);
      console.log(data);
      dispatch({ type: ActionType.DELETE });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.currentTarget;
    dispatch({
      type: ActionType.HANDLE_INPUT_CHANGE,
      key: name,
      value: value,
    });
  };

  return (
    <EmployeeInfoBox onSubmit={handleSubmit}>
      {"create" !== method ? (
        <div className="employeeID">
          <Input
            name="employeeID"
            value={employeeID}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: ActionType.HANDLE_EMPLOYEEID,
                payload: { employeeID: event.currentTarget.value },
              })
            }
            fullWidth
            label="EmployeeID"
            size="medium"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            className="read_button"
            onClick={async () => {
              let data = await readEmployee(employeeID as string);
              dispatch({
                type: ActionType.READ,
                payload: { employeeData: data },
              });
            }}
          >
            Read
          </Button>
          <hr />
        </div>
      ) : null}
      <Input
        name="firstName"
        value={employeeData?.firstName}
        onChange={handleChange}
        fullWidth
        label="First Name"
        size="medium"
      />
      <Input
        name="surName"
        value={employeeData?.surName}
        onChange={handleChange}
        fullWidth
        label="Sur Name"
        size="medium"
      />
      <Input
        name="email"
        value={employeeData?.email}
        onChange={handleChange}
        fullWidth
        type="email"
        label="Email"
        size="medium"
      />
      <Input
        name="dateOfBirth"
        value={employeeData?.dateOfBirth}
        onChange={handleChange}
        fullWidth
        // type="date"
        label="Date Of Birth"
        size="medium"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Gender>
        {GENDER.map((gender, index) => (
          <span key={index}>
            <input
              onChange={handleChange}
              value={gender}
              type="radio"
              name="gender"
              checked={employeeData?.gender === gender}
            />
            <label>{gender}</label>
          </span>
        ))}
      </Gender>
      {method !== "read" ? (
        <SubmitButton type="submit" read={method as string}>
          {capitalizeFirstLetter(method as string)}
        </SubmitButton>
      ) : null}
    </EmployeeInfoBox>
  );
}

export default EmployeeForm;
