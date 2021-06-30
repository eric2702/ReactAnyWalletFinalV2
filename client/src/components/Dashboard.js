import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
const axios = require("axios");

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      // const response = await axios.get("https://localhost:5000/dashboard/", {
      //   headers: {
      //     'token': localStorage.token,
      //   },
      // });

      const parseRes = await response.json();

      setName(parseRes.name);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
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
