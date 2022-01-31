import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { symlink } from "fs";

export const HomePage = styled.main`
  background: linear-gradient(
    125.22deg,
    #fdf5f0 -3.4%,
    rgba(248, 221, 202, 0.989482) 56.09%,
    rgba(246, 188, 158, 0.98) 111.89%
  );
  width: 100vw;
  height: 100vh;
`;

export const EmployeeInfoBox = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -70%);
  width: 20vw;
  height: 60vh;
  border: 3px solid #030201;
  border-radius: 50px;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: 900px) {
    padding: 40px;
    width: 40vw;
  }

  .employeeID {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .read_button {
    margin-top: 5px;
  }
  hr {
    margin-top: 5px;
    width: 100%;
    border: 1px solid #030201;
  }
`;

export const EmployeeFormFields = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around !important;
  width: 100%;
  height: 100%;
`;

export const Input = styled(TextField)({
  root: { margin: "5px" },
  "& label": {
    fontFamily: "Trebuchet MS",
    fontWeight: "bold",
    color: "#030201",
  },
  "& label.Mui-focused": {
    fontFamily: "Trebuchet MS",
    fontWeight: "bold",
    color: "#030201",
  },
  "& .MuiInput-underline:after": {
    fontFamily: "Trebuchet MS",
    fontWeight: "bold",
    borderBottomColor: "#030201",
  },
  "& .MuiInputBase-root": {
    fontFamily: "Trebuchet MS",
    fontWeight: "bold",
    color: "#030201",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "3px solid",
      borderRadius: "10px",
      borderColor: "#030201",
    },
    "&:hover fieldset": {
      border: "3px solid",
      borderColor: "#030201",
    },
    "&.Mui-focused fieldset": {
      border: "3px solid",
      borderColor: "#030201",
    },
  },
});

export const ButtonsSection = styled.section`
  display: flex;
  /* flex-direction: row; */
  justify-content: space-around !important;
  align-items: center !important;
  width: 40vw;
  height: 25vh;
  margin: auto;
`;
export const Button = styled.button`
  border: 3px solid #030201;
  padding: 6px;
  background: transparent;
  color: #030201;
  font-weight: bolder;
  font-family: "Trebuchet MS";
  border-radius: 20px;
  width: 90px;

  &:hover {
    background-color: #030201 !important;
    color: #fdf5f0 !important;
    cursor: pointer;
  }
`;

export const SubmitButton = styled.button.attrs(
  (props: { read: string }) => props
)`
  border: 3px solid #030201;
  background: ${(props) =>
    props.read === "Read"
      ? `linear-gradient(
      125.22deg,
      #fdf5f0 -3.4%,
      rgba(248, 221, 202, 0.989482) 56.09%,
      rgba(246, 188, 158, 0.98) 111.89%
    )`
      : "#030201"};
  color: ${(props) => (props.read === "Read" ? "#030201" : "#fdf5f0")};
  font-weight: bolder;
  font-family: "Trebuchet MS";
  width: 100%;
  font-size: large;
  padding: 13px;
  border-radius: 10px;

  &:hover {
    background: linear-gradient(
      125.22deg,
      #fdf5f0 -3.4%,
      rgba(248, 221, 202, 0.989482) 56.09%,
      rgba(246, 188, 158, 0.98) 111.89%
    );
    color: #030201;
    cursor: pointer;
  }
`;

export const Gender = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Footer = styled.footer`
  text-align: center;
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translate(-50%, -2%);
  color: black !important;
`;

export const Header = styled.header`
  position: absolute;
  top: 2%;
  left: 50%;
  transform: translate(-50%, -2%);
  text-align: center;
  font-size: larger;
  text-decoration: underline;
  font-weight: bolder;
`;

export const Modal_Box_Style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "#ffc3a0",
  bgcolor: "#404040",
  border: "none !important",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};
