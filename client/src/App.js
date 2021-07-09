import React, { useState, useEffect, Suspense } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./css/loading.css";

import Loading from "./components/Loading";

const axios = require("axios");

toast.configure();

const Dashboard = React.lazy(() => import("./components/Dashboard"));
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await axios.get("http://localhost:5000/auth/is-verify", {
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = response.data;
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          exact
          path="/register"
          component={() =>
            !isAuthenticated ? (
              <Register setAuth={setAuth} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/login"
          component={() =>
            !isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/dashboard"
          component={() =>
            isAuthenticated ? (
              <Dashboard setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </Suspense>
  );
}

export default App;
