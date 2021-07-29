import React, { useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Switch, Route, Redirect } from "react-router-dom";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./css/loading.css";

import Loading from "./components/Loading";
import { authActions } from "./store/auth";
import Home from "./components/Home";
import AOS from "aos";
import "aos/dist/aos.css";

const axios = require("axios");

toast.configure();

const Dashboard = React.lazy(() => import("./components/Dashboard"));
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  const loginHandler = () => {
    dispatch(authActions.login());
  };

  async function isAuthEffect() {
    try {
      const response = await axios.get("http://localhost:5000/auth/is-verify", {
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = response.data;
      parseRes === true ? loginHandler() : logoutHandler();
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuthEffect();
    AOS.init();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route
          exact
          path="/register"
          component={() =>
            !isAuth ? <Register /> : <Redirect to="/dashboard" />
          }
        />
        <Route
          exact
          path="/login"
          component={() => (!isAuth ? <Login /> : <Redirect to="/dashboard" />)}
        />
        <Route
          exact
          path="/dashboard"
          component={() => (isAuth ? <Dashboard /> : <Redirect to="/login" />)}
        />
      </Switch>
    </Suspense>
  );
}

export default App;
