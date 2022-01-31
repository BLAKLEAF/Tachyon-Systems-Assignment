export interface IEmployeeData {
  firstName: string;
  surName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
}

interface IError {
  isError?: boolean;
  errorMessage?: any;
}
export interface IEmployeeState {
  employeeData?: IEmployeeData;
  employeeID?: string;
  method?: string;
  color?: number;
  error?: IError;
}

export let employeeInfo: IEmployeeData = {
  firstName: "",
  surName: "",
  dateOfBirth: "",
  email: "",
  gender: "",
};

export const initialEmployeeState: IEmployeeState = {
  employeeData: employeeInfo,
  employeeID: "",
  method: "create",
  color: 0,
  error: {
    isError: false,
  },
};

export enum ActionType {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  CLEAN_UP = "CLEAN_UP",
  CHANGE_API_METHOD = "CHANGE_METHOD",
  HANDLE_INPUT_CHANGE = "HANDLE_INPUT_CHANGE",
  HANDLE_EMPLOYEEID = "HANDLE_EMPLOYEEID",
  SHOW_ERROR = "SHOW_ERROR",
}

export interface IAction<T> {
  type: ActionType;
  payload?: T;
  key?: string;
  value?: string;
}

export function reducerfunction(
  state: IEmployeeState,
  action: IAction<IEmployeeState>
) {
  let { type, payload, key, value } = action;

  switch (type) {
    case ActionType.READ:
      return {
        ...state,
        employeeData: payload?.employeeData,
      };
    case ActionType.CLEAN_UP:
      return {
        ...state,
        employeeID: "",
        employeeData: employeeInfo,
      };
    case ActionType.CHANGE_API_METHOD:
      return {
        ...state,
        method: payload?.method,
        color: payload?.color,
        employeeData: employeeInfo,
        employeeID: "",
      };
    case ActionType.HANDLE_INPUT_CHANGE:
      return {
        ...state,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        employeeData: <any>{
          ...state.employeeData,
          [key as any]: value,
        },
      };
    case ActionType.HANDLE_EMPLOYEEID:
      return {
        ...state,
        employeeID: payload?.employeeID,
      };
    case ActionType.SHOW_ERROR:
      return {
        ...state,
        error: payload?.error,
      };
    default:
      return { ...state };
  }
}
