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
import axios from "axios";

function EmployeeForm() {
  const { capitalizeFirstLetter } = useMethods();
  const { createEmployee, readEmployee, updateEmployee, deleteEmployee } =
    useFetch();
  let { employeeState, dispatch } = useContext(EmployeeContext);
  let { employeeData, method, employeeID, error: modalContent } = employeeState;

  let GENDER = ["Male", "Female", "Other"];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (method === "create") {
      try {
        if (employeeData?.firstName) {
          let data = await createEmployee(employeeData as IEmployeeData);
          dispatch({
            type: ActionType.SHOW_ERROR,
            payload: {
              error: {
                openModal: true,
                messageTitle: "Hurrey, New Employee 🤗",
                message: data,
              },
            },
          });
          dispatch({ type: ActionType.CLEAN_UP });
        } else {
          throw new Error("Please fill some Data.");
        }
      } catch (error) {
        dispatch({
          type: ActionType.SHOW_ERROR,
          payload: {
            error: {
              openModal: true,
              message: `OOPS : ${error}`,
            },
          },
        });
      }
    } else if (method === "update") {
      try {
        if (!employeeID) {
          throw Error("Please provide EmployeeID.");
        }
        let response = await updateEmployee(
          employeeData as IEmployeeData,
          employeeID
        );
        dispatch({ type: ActionType.CLEAN_UP });
        dispatch({
          type: ActionType.SHOW_ERROR,
          payload: {
            error: {
              openModal: true,
              messageTitle: "Success👌",
              message: response,
            },
          },
        });
      } catch (error) {
        dispatch({
          type: ActionType.SHOW_ERROR,
          payload: {
            error: {
              openModal: true,
              message: `OOPS : ${error}`,
            },
          },
        });
      }
    } else if (method === "delete") {
      try {
        if (!employeeID) {
          throw new Error("Please provide EmployeeID.");
        } else {
          let response = await deleteEmployee(employeeID);
          dispatch({
            type: ActionType.SHOW_ERROR,
            payload: {
              error: {
                openModal: true,
                messageTitle: "Employee Deleted 🤗",
                message: response,
              },
            },
          });
          dispatch({ type: ActionType.CLEAN_UP });
        }
      } catch (error) {
        dispatch({
          type: ActionType.SHOW_ERROR,
          payload: {
            error: {
              openModal: true,
              message: `OOPS : ${error}`,
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
                  if (axios.isAxiosError(error)) {
                    dispatch({
                      type: ActionType.SHOW_ERROR,
                      payload: {
                        error: {
                          openModal: true,
                          message: `OOPS : ${error.response?.data.message}`,
                        },
                      },
                    });
                  } else {
                    dispatch({
                      type: ActionType.SHOW_ERROR,
                      payload: {
                        error: {
                          openModal: true,
                          message: `OOPS : ${error}`,
                        },
                      },
                    });
                  }
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
            required={
              method === "create"
                ? true
                : method === "update" && employeeID
                ? true
                : false
            }
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
            required={
              method === "create"
                ? true
                : method === "update" && employeeID
                ? true
                : false
            }
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
        open={modalContent?.openModal as boolean}
        onClose={() =>
          dispatch({
            type: ActionType.SHOW_ERROR,
            payload: {
              error: {
                openModal: false,
              },
            },
          })
        }
      >
        <Box sx={Modal_Box_Style}>
          <Typography variant="h6" component="h2">
            {modalContent?.messageTitle || "Error Says 😔"}
          </Typography>
          <Typography sx={{ mt: 2 }}>{modalContent?.message}</Typography>
        </Box>
      </Modal>
    </>
  );
}

export default EmployeeForm;
