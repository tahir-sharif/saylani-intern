import { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Link as Mlink, useNavigate } from "react-router-dom";
import "./auth.css";
import { auth } from "../../firebase/Firebase";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setloginData] = useState({});
  const loginHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setloginData({
      ...loginData,
      [name]: value,
    });
  };
  const loginSubmit = () => {
    auth
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then((user) => {
        console.log("Logged in as", user.user.email);
        setloginData({})
        navigate('/home')
      });
  };
  return (
    <div className='authForm'>
      <Box autoComplete="off">
        <div className="form login">
          <div className="formHeading">Login</div>
          <div className="inputFields">
            <Input placeholder="Email" name="email" onChange={loginHandler} />
            <Input
              placeholder="Password"
              name="password"
              onChange={loginHandler}
            />
          </div>
          <div className="button">
            <Button variant="contained" color="success" onClick={loginSubmit}>
              Login
            </Button>
          </div>
          <Mlink to="/signup" underline="hover">
            Don't have an account
          </Mlink>
        </div>
      </Box>{" "}
    </div>
  );
};

export default Login;
