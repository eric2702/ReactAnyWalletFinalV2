import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/auth.css";
import { authActions } from "../store/auth";

const axios = require("axios");

const Register = ({ setAuth }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  const loginHandler = () => {
    dispatch(authActions.login());
  };
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const { email, password, confirmPassword, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const body = { email, password, confirmPassword, name };

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        body
      );

      const parseRes = response.data;

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        loginHandler();
        toast.success("Registered Successfully");
      } else {
        logoutHandler();
        toast.error(parseRes);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="register">
      <div className="row mr-0 ml-0">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign Up</h5>
              <form className="form-signin" onSubmit={onSubmitForm}>
                <div className="form-label-group">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    required
                    autofocus
                  />
                  <label for="inputEmail">Email address</label>
                </div>

                <div className="form-label-group">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                  <label for="inputPassword">Password</label>
                </div>

                <div className="form-label-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => onChange(e)}
                    id="inputConfPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    required
                  />
                  <label for="inputConfPassword">Confirm Password</label>
                </div>

                <div className="form-label-group">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => onChange(e)}
                    id="inputName"
                    className="form-control"
                    placeholder="Name"
                    required
                  />
                  <label for="inputName">Name</label>
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Sign Up!
                </button>
                <hr className="my-4" />
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <button
                    className="btn btn-lg btn-google btn-block text-uppercase"
                    type="submit"
                  >
                    <i className="fab fa-google mr-2"></i>Sign In Instead!
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
