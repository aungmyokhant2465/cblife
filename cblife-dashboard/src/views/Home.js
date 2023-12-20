import React, { useState, useEffect, createContext, Suspense } from "react";
import Header from "../layouts/Header";
import SideBar from "../layouts/SideBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import { Alert } from "@mui/material";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { initToken } from "../utils/constant";
import authService from "../services/auth";

import AllNews from "./auth/newsPost/AllNews";
import News from "./auth/newsPost/News";
import UpdateNews from "./auth/newsPost/UpdateNews";
import CreateNews from "./auth/newsPost/CreateNews";
import Promotions from "./auth/promotions/Promotions";
import CreatePromotion from "./auth/promotions/CreatePromotion";
import Promotion from "./auth/promotions/Promotion";
import UpdatePromotion from "./auth/promotions/UpdatePromotion";
import Knowledges from "./auth/knowledges/Knowledges";
import CreateKnowledge from "./auth/knowledges/CreateKnowledge";
import Knowledge from "./auth/knowledges/Knowledge";
import UpdateKnowledge from "./auth/knowledges/UpdateKnowledge";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "100vh",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Home() {
  const navigate = useNavigate();
  const AuthContext = createContext();
  const [auth, setAuth] = useState(null);
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState({ message: "", isError: false });

  const homeAlert = (message, isError = false) => {
    setShowAlert({ message: message, isError: isError });
    setTimeout(() => {
      setShowAlert({ message: "", isError: false });
    }, 4000);
  };

  useEffect(() => {
    const loggedJSON = window.localStorage.getItem("cblife_logged_admin");
    if (loggedJSON) {
      const parsedJSON = JSON.parse(loggedJSON);
      fetchAuth(parsedJSON.token).then(() => {
        initToken(parsedJSON.token, parsedJSON.role);
      });
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAuth = async (token) => {
    try {
      const res = await authService.getAuth(token);
      setAuth(res.data);
    } catch (error) {
      if (
        error?.response.data.error === "token invalid" ||
        error?.response.data.error === "token expired"
      ) {
        navigate("/login");
      }
    }
  };

  if (!auth) {
    return <div>Loading...</div>;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateAuth = (data) => {
    setAuth(data);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        user={auth}
        updateUser={updateAuth}
        homeAlert={homeAlert}
      />
      <SideBar handleDrawerClose={handleDrawerClose} open={open} auth={auth} />
      <Main open={open}>
        <DrawerHeader />
        <Suspense fallback={<div>Loading...</div>}>
          <AuthContext.Provider value={auth}>
            <Routes>
              <Route path="/all_news" element={<AllNews />} />
              <Route
                path="/news/:id"
                element={<News homeAlert={homeAlert} />}
              />
              <Route
                path="/updateNews/:id"
                element={<UpdateNews homeAlert={homeAlert} />}
              />
              <Route
                path="/createNews"
                element={<CreateNews homeAlert={homeAlert} />}
              />
              <Route path="/promotions" element={<Promotions />} />
              <Route
                path="/promotions/:id"
                element={<Promotion homeAlert={homeAlert} />}
              />
              <Route
                path="/createPromotion"
                element={<CreatePromotion homeAlert={homeAlert} />}
              />
              <Route
                path="/updatePromotion/:id"
                element={<UpdatePromotion homeAlert={homeAlert} />}
              />
              <Route path="/knowledges" element={<Knowledges />} />
              <Route
                path="/knowledges/:id"
                element={<Knowledge homeAlert={homeAlert} />}
              />
              <Route
                path="/createKnowledge"
                element={<CreateKnowledge homeAlert={homeAlert} />}
              />
              <Route
                path="/updateKnowledge/:id"
                element={<UpdateKnowledge homeAlert={homeAlert} />}
              />
            </Routes>
          </AuthContext.Provider>
        </Suspense>
      </Main>
      {showAlert.message && !showAlert.isError && (
        <Alert
          sx={{ position: "fixed", bottom: "1em", right: "1em" }}
          severity="success"
        >
          {showAlert.message}
        </Alert>
      )}
      {showAlert.message && showAlert.isError && (
        <Alert
          sx={{ position: "fixed", bottom: "1em", right: "1em" }}
          severity="warning"
        >
          {showAlert.message}
        </Alert>
      )}
    </Box>
  );
}
