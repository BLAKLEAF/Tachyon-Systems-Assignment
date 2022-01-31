import { createContext, Dispatch } from "react";
import {
  IAction,
  IEmployeeState,
  initialEmployeeState,
} from "../Reducer/reducer";

export interface IContext {
  employeeState: IEmployeeState;
  dispatch: Dispatch<IAction<IEmployeeState>>;
}

export let EmployeeContext = createContext<IContext>({
  employeeState: initialEmployeeState,
  dispatch: () => null,
});
