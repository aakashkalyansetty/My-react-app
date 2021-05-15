import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { URL } from "../../utils/url";
import logo from "../../assets/logo.png";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

const Login = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [errorMsg, setErrormsg] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState({
    display: false,
    message: "",
    response: ""
  });
  
  const handleSubmit =  async(event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const response = await fetch(`${URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
              "username":username,
              "password":password
        }),
      });

      const data = await response.json();
      const { data: user,status, error } = data;
      console.log(data);

      if (status === 200) {
        localStorage.setItem("token", user.token)
        history.push("/");
      } else if (status === 404) {
        setErrormsg('Username or Password is incorrect');
        setShowMessage(({
          display: true,
          message: error,
          response: "error"
        }))
      } else {
        setShowMessage(({
          display: true,
          message: error,
          response: "error"
        }))
      }
    } catch (err) {
      setShowMessage({
        display: true,
        message: err.message,
        response: 'error'
      })
    } finally {
      setIsLoading(false);
    }
    };
  

  const handleChangeUser = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const goDashboard = () => {
    history.push("/Dashboard");
  }

  return (
    <div class="login-body">
      <Box
        className="login-box"
        boxShadow={5}
        bgcolor="background.paper"
        m={5}
        p={5}
      >
        <div class="login">
          <img src={logo} className="logo" />
          <br />
          <form onSubmit={goDashboard}>
            <TextField
              required={true}
              id="login-input"
              name="value"
              label="Username"
              onChange={(e) => handleChangeUser(e)}
              style={{ marginBottom: "13px" }}
              onKeyUp={() => setShowMessage({
                display: false,
                message: "",
                response: ""
              })}
            />
            <TextField
              id="login-input"
              type="password"
              name="password"
              label="Password"
              onChange={(e) => handleChangePassword(e)}
              required={true}
              style={{ marginBottom: "13px" }}
              onKeyUp={() => setShowMessage({
                display: false,
                message: "",
                response: ""
              })}
            />
            <span className="error">{errorMsg}</span>
            <button 
            type="submit" 
            class="btn btn-primary login-button"
            >
              <strong>Login</strong>
            </button>
          </form>
          <br />
        </div>
      </Box>
    </div>
  );
};

export default Login;
