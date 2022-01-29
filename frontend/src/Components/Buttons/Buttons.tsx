import React, { useContext } from "react";
import { ButtonsSection, Button } from "../../styles/styles";
import { Link } from "react-router-dom";
import { useMethods } from "../../Hooks/useMethods";
import { EmployeeContext } from "../../Context/context";
import { ActionType } from "../../Reducer/reducer";

function Buttons() {
  const { capitalizeFirstLetter } = useMethods();
  let { employeeState, dispatch } = useContext(EmployeeContext);
  let { method, color } = employeeState;
  const CRUD: string[] = ["create", "read", "update", "delete"];
  let defaultMethod: string = "";
  method === "create" ? (defaultMethod = "create") : (defaultMethod = "");

  return (
    <ButtonsSection>
      {CRUD.map((method, index) => (
        <Link to={`${method}`} key={index}>
          <Button
            key={index}
            style={
              index === color
                ? { backgroundColor: "#030201", color: "#fdf5f0" }
                : defaultMethod === method
                ? { backgroundColor: "#030201", color: "#fdf5f0" }
                : { backgroundColor: "transparent", color: "#030201" }
            }
            onClick={() =>
              dispatch({
                type: ActionType.CHANGE_API_METHOD,
                payload: { method, color: index },
              })
            }
          >
            {capitalizeFirstLetter(method)}
          </Button>
        </Link>
      ))}
    </ButtonsSection>
  );
}

export default Buttons;
