import { useEffect, useState } from "react";
import { useFetch } from "./Hooks/useFetch";
import {
  HomePage,
  EmployeeInfoBox,
  Input,
  ButtonsSection,
  Button,
  SubmitButton,
  Gender,
  Footer,
  Header,
} from "./styles/styles";
import { BsGithub } from "react-icons/bs";
import Logo from "./Images/logo.svg";

function App() {
  const [color, setColor] = useState<number>();
  const [method, setMethod] = useState<string>("Create");
  const {
    handleSubmit,
    handleChange,
    getMethods,
    setEmployeeData,
    handleEmployeeID,
    setEmployeeID,
    employeeID,
    employeeObj,
    employeeData,
  } = useFetch();
  const CRUD: string[] = ["Create", "Read", "Update", "Delete"];
  let defaultMethod: string = "";
  method === "Create" ? (defaultMethod = "Create") : (defaultMethod = "");

  useEffect(() => {
    getMethods(method);
  }, [getMethods, method]);

  return (
    <HomePage>
      <Header>
        Employee Management Console
        {/* <img src={Logo} alt="" />
        <BsGithub size="30" /> */}
      </Header>
      <ButtonsSection>
        {CRUD.map((method, index) => (
          <Button
            key={index}
            style={
              index === color
                ? { backgroundColor: "#030201", color: "#fdf5f0" }
                : defaultMethod === method
                ? { backgroundColor: "#030201", color: "#fdf5f0" }
                : { backgroundColor: "transparent", color: "#030201" }
            }
            onClick={() => {
              setMethod(method);
              setColor(index);
              setEmployeeData(employeeObj);
              setEmployeeID("");
            }}
          >
            {method}
          </Button>
        ))}
      </ButtonsSection>
      <EmployeeInfoBox onSubmit={handleSubmit}>
        {method !== "Create" ? (
          <Input
            name="employeeID"
            value={employeeID}
            onChange={handleEmployeeID}
            fullWidth
            label="EmployeeID"
            size="medium"
            InputLabelProps={{
              shrink: true,
            }}
          />
        ) : null}
        <Input
          name="firstName"
          value={employeeData.firstName}
          onChange={handleChange}
          fullWidth
          label="First Name"
          size="medium"
        />
        <Input
          name="surName"
          value={employeeData.surName}
          onChange={handleChange}
          fullWidth
          label="Sur Name"
          size="medium"
        />
        <Input
          name="email"
          value={employeeData.email}
          onChange={handleChange}
          fullWidth
          label="Email"
          size="medium"
        />
        <Input
          name="dateOfBirth"
          value={employeeData.dateOfBirth}
          onChange={handleChange}
          fullWidth
          label="Date Of Birth"
          size="medium"
        />
        <Gender>
          <span>
            <input
              onChange={handleChange}
              value="Male"
              type="radio"
              name="gender"
              checked={employeeData.gender === "Male"}
            />
            <label>Male</label>
          </span>
          <span>
            <input
              onChange={handleChange}
              value="Female"
              type="radio"
              name="gender"
              checked={employeeData.gender === "Female"}
            />
            <label>Female</label>
          </span>
          <span>
            <input
              onChange={handleChange}
              value="Other"
              type="radio"
              name="gender"
              checked={employeeData.gender === "Other"}
            />
            <label>Other</label>
          </span>
        </Gender>
        <SubmitButton type="submit">
          {method === "Create"
            ? "Create"
            : method === "Read"
            ? "Read"
            : method === "Update"
            ? "Update"
            : "Delete"}
        </SubmitButton>
      </EmployeeInfoBox>
      <Footer>
        <a href="">
          <BsGithub size="30" />
        </a>
      </Footer>
    </HomePage>
  );
}

export default App;
