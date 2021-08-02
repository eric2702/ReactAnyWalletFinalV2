import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authActions } from "../../store/auth";

const Navbar = ({ loggedIn, name }) => {
  function navbar() {
    if (loggedIn) {
      return (
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div class="nav-link">
                Home <span class="sr-only">(current)</span>
              </div>
            </Link>
          </li>
          <li class="nav-item active mr-2">
            <div class="nav-link text-dark rounded bg-white">{name}</div>
          </li>
          <button className="btn btn-danger" onClick={(e) => logout(e)}>
            Logout
          </button>
        </ul>
      );
    } else {
      return (
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div class="nav-link">
                Home <span class="sr-only">(current)</span>
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
      <div class="collapse navbar-collapse" id="navbarNav">
        {/* <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div class="nav-link">
                Home <span class="sr-only">(current)</span>
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
        </ul> */}
        {navbar()}
      </div>
    </nav>
  );
};

export default Navbar;
