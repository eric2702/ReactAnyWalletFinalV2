import Navbar from "./partials/Navbar";
import "../css/home.css"

const About = () => {
  return (
    <div>
      <Navbar />
      <section data-aos="fade-right" data-aos-anchor-placement="top-bottom">
        <div className="container">
          <h1
            className="p-5 text-center font-weight-bold"
            style={{ fontSize: "45px" }}
          >
            OUR TEAM
          </h1>
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="p-5">
                <img
                  className="img-fluid rounded-circle"
                  src="assets/img/01.jpg"
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="p-5">
                <h1 className="display-2">Eric</h1>
                <h2>
                  "There is beauty in simplicity."
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section data-aos="fade-left" data-aos-anchor-placement="center-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="p-5">
                <img
                  className="img-fluid rounded-circle"
                  src="assets/img/02.jpg"
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-5">
                <h1 className="display-2">Casey</h1>
                <h2>
                  "AnyWallet is a part of me!"
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section data-aos="fade-right" data-aos-anchor-placement="center-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="p-5">
                <img
                  className="img-fluid rounded-circle"
                  src="assets/img/03.jpg"
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="p-5">
                <h1 className="display-2">Arief</h1>
                <h2>
                  "We prepare millenials for their retirement."
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-aos="fade-left" data-aos-anchor-placement="center-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="p-5">
                <img
                  className="img-fluid rounded-circle"
                  src="assets/img/04.jpg"
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-5">
                <h1 className="display-2">Ilham</h1>
                <h2>
                  "Say goodbye to impulsive buying for all of us."
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section data-aos="fade-right" data-aos-anchor-placement="center-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="p-5">
                <img
                  className="img-fluid rounded-circle"
                  src="assets/img/05.jpg"
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="p-5">
                <h1 className="display-2">Asep</h1>
                <h2>
                  "No more scraping your pocket for change at the end of the month."
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
