import React from "react";
import jwt from "jwt-decode";

import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
// import logo from "../asset/logo.jpg";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    let err = {};
    if (!values.username) {
      err.username = "Please enter signed in username";
    }
    if (!values.password) {
      err.password = "Please enter correct password";
    }
    if (Object.getOwnPropertyNames(err).length > 0) {
      setErrors({ ...err });
      return;
    }
    try {
      setLoading(true);
      const response = await loginService.login({
        username: values.username,
        password: values.password,
      });
      const decodedToken = jwt(response.data.token);
      const data = JSON.stringify({
        decodedToken,
        token: response.data.token,
      });
      window.localStorage.setItem("cblife_logged_admin", data);
      navigate("/");
    } catch (error) {
      if (error.response.data.error) {
        setErrors({
          username: error.response.data.error,
          password: error.response.data.error,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          bgcolor: "#ccc",
          margin: 0,
        }}
      >
        <Card sx={{ p: 4 }}>
          <Box sx={{ m: 1, width: 300, height: 50 }}>
            {/* <img className="app-logo" src={logo} alt="" /> */}
            <Typography variant="h5" component="h1">
              CB Life
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControl sx={{ m: 2, width: "300px" }} variant="outlined">
              <TextField
                id="username"
                label="Username"
                value={values.username}
                onChange={handleChange("username")}
                error={errors.username ? true : false}
                helperText={errors.username}
              />
            </FormControl>
            <FormControl sx={{ m: 2, width: "300px" }} variant="outlined">
              <TextField
                id="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Password"
                error={errors.password ? true : false}
                helperText={errors.password}
              />
            </FormControl>
            <FormControl sx={{ m: 2 }}>
              <LoadingButton
                onClick={handleLogin}
                loading={loading}
                variant="contained"
                sx={{
                  backgroundColor: "#4b26d1",
                  width: 100,
                  margin: "0 auto",
                }}
                size="meduin"
              >
                Login
              </LoadingButton>
            </FormControl>
          </Box>
          <Typography
            variant="span"
            component="span"
            sx={{ fontSize: "0.8rem", p: 3 }}
          >
            Version 1.0.0
          </Typography>
        </Card>
      </Box>
    </>
  );
};

export default Login;
