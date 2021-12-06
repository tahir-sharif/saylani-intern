import { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Link as Mlink, useNavigate } from "react-router-dom";
import "./auth.css";
import { auth } from "../../firebase/Firebase";
import { fireStore } from "../../firebase/Firebase";

const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setsignupData] = useState({});
  const signupHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setsignupData({
      ...signupData,
      [name]: value,
    });
  };
  const signupSubmit = () => {
    auth
      .createUserWithEmailAndPassword(signupData.email, signupData.password)
      .then((user) => {
        console.log("Succesfull", user);
        fireStore.collection("usersData").doc(user.user.uid).set({
          name: signupData.userName,
          email: signupData.email,
        });
        setsignupData({});
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="authForm">
      <Box autoComplete="off">
        <div className="form signup">
          <div className="formHeading">Sign Up</div>
          <div className="inputFields">
            <Input
              placeholder="User name"
              name="userName"
              onChange={signupHandler}
            />
            <Input placeholder="Email" name="email" onChange={signupHandler} />
            <Input
              placeholder="Password"
              name="password"
              onChange={signupHandler}
            />
          </div>
          <div className="button">
            <Button variant="contained" color="success" onClick={signupSubmit}>
              Sign up
            </Button>
          </div>
          <Mlink to="/login" underline="hover">
            Already Have an account
          </Mlink>
        </div>
      </Box>
    </div>
  );
};

export default Signup;
