import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { authActions } from "../store/auth";
const axios = require("axios");

const Dashboard = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await axios.get("http://localhost:5000/dashboard/", {
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = response.data;

      setName(parseRes.name);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    logoutHandler();
    toast.error("Logged out successfully");
  };

  useEffect(() => {
    getName();
  }, []);
  return (
    <Fragment>
      <h1>Dashboard {name}</h1>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
