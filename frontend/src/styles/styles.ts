import styled from "styled-components";
import TextField from "@mui/material/TextField";

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

export const EmployeeInfoBox = styled.form`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -70%);
  width: 20vw;
  height: 60vh;
  border: 3px solid #030201;
  border-radius: 50px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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

export const SubmitButton = styled.button`
  border: 3px solid #030201;
  background: black;
  color: #fdf5f0;
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
