import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { LoadingButton } from "@mui/lab";

import authService from "../services/auth";
import { instanceToken } from "../utils/constant";

const UpdateAuth = ({ handleClose, userAlert, user, updateData }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
    conPassword: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    if (user) {
      setValues({ ...values, username: user.username });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const updateUser = async (payload) => {
    try {
      const res = await authService.putAuth(instanceToken.token, payload);
      console.log("response : ", res);
      if (res.data) {
        updateData(res.data);
        userAlert("Your profile have been updated!", false);
        handleClose();
      }
    } catch (error) {
      console.log("error : ", error);
    } finally {
      setLoading(false);
      setErrors({});
    }
  };

  const handleUpdate = () => {
    setLoading(true);
    setErrors({});
    let isErrorExit = false;
    let errorObject = {};
    if (!values.username) {
      errorObject.username = "Username field is required.";
      isErrorExit = true;
    }
    if (values.password) {
      if (values.password !== values.conPassword) {
        errorObject.password = "Password & Confirm Password must be the same";
        errorObject.conPassword =
          "Password & Confirm Password must be the same";
        isErrorExit = true;
      }
    }
    if (isErrorExit) {
      setErrors({ ...errorObject });
      setLoading(false);
      return;
    }
    updateUser(values);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Typography variant="h5" component="h2" sx={{ my: 3 }}>
          Update your profile
        </Typography>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "350px",
          }}
        >
          <CardContent>
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
              <FormControl sx={{ m: 2, width: "300px" }} variant="outlined">
                <TextField
                  id="conPassword"
                  type={values.showPassword ? "text" : "password"}
                  value={values.conPassword}
                  onChange={handleChange("conPassword")}
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
                  label="Confirm Password"
                  error={errors.conPassword ? true : false}
                  helperText={errors.conPassword}
                />
              </FormControl>
              <FormControl sx={{ m: 2 }} variant="outlined">
                <LoadingButton
                  variant="contained"
                  loading={loading}
                  onClick={handleUpdate}
                  sx={{ backgroundColor: "#4b26d1", alignSelf: "end" }}
                >
                  Update
                </LoadingButton>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default UpdateAuth;
