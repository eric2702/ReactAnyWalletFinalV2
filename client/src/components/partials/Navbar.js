import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
      </div>
    </nav>
  );
};

export default Navbar;
