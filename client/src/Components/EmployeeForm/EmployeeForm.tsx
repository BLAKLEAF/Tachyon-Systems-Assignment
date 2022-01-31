import {
  EmployeeInfoBox,
  Input,
  SubmitButton,
  Gender,
  Button,
  EmployeeFormFields,
  Modal_Box_Style,
} from "../../styles/styles";
import { useFetch } from "../../Hooks/useFetch";
import { useMethods } from "../../Hooks/useMethods";
import React, { useContext, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { EmployeeContext } from "../../Context/context";
import { ActionType, IEmployeeData } from "../../Reducer/reducer";

function EmployeeForm() {
  const { capitalizeFirstLetter } = useMethods();
  const { createEmployee, readEmployee, updateEmployee, deleteEmployee } =
    useFetch();
  let { employeeState, dispatch } = useContext(EmployeeContext);
  let { employeeData, method, employeeID, error } = employeeState;

  let GENDER = ["Male", "Female", "Other"];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (method === "create") {
      try {
        if (employeeData?.firstName) {
          await createEmployee(employeeData as IEmployeeData);
          dispatch({ type: ActionType.CLEAN_UP });
        } else {
          throw new Error("Please fill some Data.");
        }
      } catch (error) {
        dispatch({
          type: ActionType.SHOW_ERROR,
          payload: {
            error: {
              isError: true,
              errorMessage: `OOPS : ${error}`,
            },
          },
        });
      }
    } else if (method === "update" && employeeID) {
      try {
        await updateEmployee(employeeData as IEmployeeData, employeeID);
        dispatch({ type: ActionType.CLEAN_UP });
      } catch (error) {
        dispatch({
          type: ActionType.SHOW_ERROR,
          payload: {
            error: {
              isError: true,
              errorMessage: `OOPS : ${error}`,
            },
          },
        });
      }
    } else if (method === "delete" && employeeID) {
      try {
        await deleteEmployee(employeeID);
        dispatch({ type: ActionType.CLEAN_UP });
      } catch (error) {
        dispatch({
          type: ActionType.SHOW_ERROR,
          payload: {
            error: {
              isError: true,
              errorMessage: `OOPS : ${error}`,
            },
          },
        });
      }
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
    <>
      <EmployeeInfoBox>
        {method !== "create" ? (
          <div className="employeeID">
            <Input
              name="employeeID"
              value={employeeID as string}
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
                try {
                  let data = await readEmployee(employeeID as string);
                  dispatch({
                    type: ActionType.READ,
                    payload: { employeeData: data.employeeData },
                  });
                } catch (error) {
                  dispatch({
                    type: ActionType.SHOW_ERROR,
                    payload: {
                      error: {
                        isError: true,
                        errorMessage: `OOPS : ${error}`,
                      },
                    },
                  });
                }
              }}
            >
              Read
            </Button>
            <hr />
          </div>
        ) : null}
        <EmployeeFormFields onSubmit={handleSubmit}>
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
            required
          />
          <Input
            name="email"
            value={employeeData?.email}
            onChange={handleChange}
            fullWidth
            type="email"
            label="Email"
            size="medium"
            required
          />
          <Input
            name="dateOfBirth"
            value={employeeData?.dateOfBirth}
            onChange={handleChange}
            fullWidth
            type="date"
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
        </EmployeeFormFields>
      </EmployeeInfoBox>
      <Modal
        open={error?.isError as boolean}
        onClose={() =>
          dispatch({
            type: ActionType.SHOW_ERROR,
            payload: {
              error: {
                isError: false,
              },
            },
          })
        }
      >
        <Box sx={Modal_Box_Style}>
          <Typography variant="h6" component="h2">
            Error Says 😔
          </Typography>
          <Typography sx={{ mt: 2 }}>{error?.errorMessage}</Typography>
        </Box>
      </Modal>
    </>
  );
}

export default EmployeeForm;
