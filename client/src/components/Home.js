import { Link } from "react-router-dom";
import "../css/home.css";
import Navbar from "./partials/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div
        data-aos="fade-right"
        className="masthead text-center text-white"
      >
        <div className="masthead-content">
          <div className="container">
            <h1 className="masthead-heading mb-0">AnyWallet</h1>
            <h2 className="masthead-subheading mt-1">Satu solusi. Tuk sadari keuanganmu.</h2>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <a className="btn btn-primary btn-xl rounded-pill mt-5" href="#!">
                Try Now!
              </a>
            </Link>
          </div>
        </div>
        <div className="bg-circle-1 bg-circle"></div>
        <div className="bg-circle-2 bg-circle"></div>
        <div className="bg-circle-3 bg-circle"></div>
        <div className="bg-circle-4 bg-circle"></div>
        <section id="why-us" className="masthead-content">
          <div className="container-fluid" data-aos="fade-up">
            <div className="row">
              <div className="col-lg-12 d-flex flex-column justify-content-center align-items-stretch mt-5">
                <div className="content">
                  <h3><strong>Kenapa Harus Sadar Keuangan?</strong></h3>
                  <p>
                    "Perasaan kemarin masih ada uang di dompet..." <br />
                    "Recehan yang kusimpan banyak, kok udah kosong aja ya?" <br />
                    "Yah, gagal lagi deh target nabung bulan ini..." <br /><br />
                    Ke mana saja uangmu terpakai, berapa yang kamu keluarkan, dan pembelian yang terjadi secara spontan.<br />
                    Dengan menyadari semuanya, kamu bisa mengendalikan pengeluaranmu.<br />
                    Tidak kecewa lagi barang impianmu tidak terbeli. Tidak ada lagi kebutuhan mendesak yang tidak sanggup kamu bayar. <br></br>
                    Kami bantu kamu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer>
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 footer-contact text-white">
                <h3>AnyWallet</h3>
                <p>
                  Jl. P. Mangkubumi <br />
                  Gowongan, Kec. Jetis <br />
                  Kota Yogyakarta, DIY 55233 <br />
                  Indonesia <br /><br />
                  <strong>Phone:</strong> +62 852 3213 1123 <br />
                  <strong>Email:</strong> anywallet@gmail.com <br />
                </p>
              </div>
              <div className="col-lg-6 col-md-6 footer-links text-white">
                <h4>Our Social Networks</h4>
                <div className="social-links mt-3">
                  <a href="#" className="twitter"><i class="fab fa-twitter"></i></a>
                  <a href="#" className="facebook"><i class="fab fa-facebook"></i></a>
                  <a href="#" className="instagram"><i class="fab fa-instagram"></i></a>
                  <a href="#" className="skype"><i class="fab fa-skype"></i></a>
                  <a href="#" className="linkedin"><i class="fab fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Home;
