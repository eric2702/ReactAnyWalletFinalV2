import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/register.css";

const axios = require("axios");

const Register = ({ setAuth }) => {
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
        setAuth(true);
        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div class="container-fluid register">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Sign Up</h5>
              <form class="form-signin" onSubmit={onSubmitForm}>
                <div class="form-label-group">
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

                <div class="form-label-group">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    required
                  />
                  <label for="inputPassword">Password</label>
                </div>

                <div class="form-label-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => onChange(e)}
                    id="inputConfPassword"
                    class="form-control"
                    placeholder="Confirm Password"
                    required
                  />
                  <label for="inputConfPassword">Confirm Password</label>
                </div>

                <div class="form-label-group">
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
                  class="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Sign Up!
                </button>
                <hr class="my-4" />
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <button
                    class="btn btn-lg btn-google btn-block text-uppercase"
                    type="submit"
                  >
                    <i class="fab fa-google mr-2"></i>Sign In Instead!
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
