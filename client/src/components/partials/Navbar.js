import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authActions } from "../../store/auth";

const Navbar = () => {
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

  useEffect(() => {
    getName();
  }, []);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  function navbar() {
    if (isAuth) {
      return (
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul style={{ left: "0" }} class="navbar-nav ml-auto">
            <li class="nav-item active">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div class="nav-link">
                  Home <span class="sr-only">(current)</span>
                </div>
              </Link>
            </li>
            <li class="nav-item active">
              <Link to="/about" style={{ textDecoration: "none" }}>
                <div class="nav-link">
                  About <span class="sr-only">(current)</span>
                </div>
              </Link>
            </li>
            <li class="nav-item active">
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <div class="nav-link">
                  Dashboard <span class="sr-only">(current)</span>
                </div>
              </Link>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {name}
              </a>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <a onClick={(e) => logout(e)} class="dropdown-item" href="#">
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div class="nav-link">
                  Home <span class="sr-only">(current)</span>
                </div>
              </Link>
            </li>
            <li class="nav-item active">
              <Link to="/about" style={{ textDecoration: "none" }}>
                <div class="nav-link">
                  About <span class="sr-only">(current)</span>
                </div>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/register" style={{ textDecoration: "none" }}>
                <div class="nav-link">Sign Up</div>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/login" style={{ textDecoration: "none" }}>
                <div class="nav-link">Sign In</div>
              </Link>
            </li>
          </ul>
        </div>
      );
    }
  }
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    logoutHandler();
    toast.error("Logged out successfully");
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div class="navbar-brand">AnyWallet</div>
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      {navbar()}
    </nav>
  );
};

export default Navbar;
