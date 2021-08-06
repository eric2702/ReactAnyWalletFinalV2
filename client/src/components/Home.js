import { Link } from "react-router-dom";
import "../css/home.css";
import Navbar from "./partials/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <header
        style={{ height: "100vh" }}
        data-aos="fade-right"
        class="masthead text-center text-white"
      >
        <div class="masthead-content">
          <div class="container">
            <h1 class="masthead-heading mb-0">AnyWallet</h1>
            <h2 class="masthead-subheading mb-0">Expense Tracker</h2>
            <Link to="/about" style={{ textDecoration: "none" }}>
              <a class="btn btn-primary btn-xl rounded-pill mt-5" href="#!">
                Learn More
              </a>
            </Link>
          </div>
        </div>
        <div class="bg-circle-1 bg-circle"></div>
        <div class="bg-circle-2 bg-circle"></div>
        <div class="bg-circle-3 bg-circle"></div>
        <div class="bg-circle-4 bg-circle"></div>
      </header>
    </div>
  );
};

export default Home;
