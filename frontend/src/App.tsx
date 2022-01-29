import { useReducer } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage, Footer, Header } from "./styles/styles";
import { BsGithub } from "react-icons/bs";
import EmployeeForm from "./Components/EmployeeForm/EmployeeForm";
import { initialEmployeeState, reducerfunction } from "./Reducer/reducer";
import Buttons from "./Components/Buttons/Buttons";
import { EmployeeContext } from "./Context/context";

function App() {
  const [employeeState, dispatch] = useReducer(
    reducerfunction,
    initialEmployeeState
  );

  return (
    <BrowserRouter>
      <HomePage>
        <Header>Employee Management Console</Header>
        <EmployeeContext.Provider value={{ employeeState, dispatch }}>
          <Buttons />
          <Routes>
            <Route path="/" element={<Navigate to="create" />} />
            <Route path={`create`} element={<EmployeeForm />} />
            <Route path={`read`} element={<EmployeeForm />} />
            <Route path={`update`} element={<EmployeeForm />} />
            <Route path={`delete`} element={<EmployeeForm />} />
          </Routes>
        </EmployeeContext.Provider>
        <Footer>
          <a href="https://github.com/BLAKLEAF/Tachyon-Systems-Assignment">
            <BsGithub size="30" />
          </a>
        </Footer>
      </HomePage>
    </BrowserRouter>
  );
}

export default App;
