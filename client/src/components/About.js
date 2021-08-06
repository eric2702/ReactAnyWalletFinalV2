import Navbar from "./partials/Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <section data-aos="fade-right" data-aos-anchor-placement="center-bottom">
        <div class="container">
          <h1
            className="p-5 text-center font-weight-bold"
            style={{ fontFamily: "Courier New, monospace", fontSize: "45px" }}
          >
            What is <span style={{ color: "#21fc21" }}>AnyWallet</span>?
          </h1>
          <p className="text-center">
            <strong style={{ color: "#21fc21" }}>AnyWallet</strong> is the
            world's{" "}
            <strong style={{ fontSize: "1.5em", color: "#fcdc21" }}>#1</strong>{" "}
            expense tracker tool that helps keep track of your everyday
            expenses!
          </p>
          <h1
            className="p-5 text-center font-weight-bold"
            style={{ fontFamily: "Courier New, monospace", fontSize: "45px" }}
          >
            OUR TEAM
          </h1>
          <div class="row align-items-center">
            <div class="col-lg-6 order-lg-2">
              <div class="p-5">
                <img
                  class="img-fluid rounded-circle"
                  src="assets/img/01.png"
                  alt="..."
                />
              </div>
            </div>
            <div class="col-lg-6 order-lg-1">
              <div class="p-5">
                <h2 class="display-4">Eric</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                  aliquid, mollitia odio veniam sit iste esse assumenda amet
                  aperiam exercitationem, ea animi blanditiis recusandae!
                  Ratione voluptatum molestiae adipisci, beatae obcaecati.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section data-aos="fade-right" data-aos-anchor-placement="center-bottom">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="p-5">
                <img
                  class="img-fluid rounded-circle"
                  src="assets/img/02.png"
                  alt="..."
                />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="p-5">
                <h2 class="display-4">Arief</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                  aliquid, mollitia odio veniam sit iste esse assumenda amet
                  aperiam exercitationem, ea animi blanditiis recusandae!
                  Ratione voluptatum molestiae adipisci, beatae obcaecati.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section data-aos="fade-right" data-aos-anchor-placement="center-bottom">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 order-lg-2">
              <div class="p-5">
                <img
                  class="img-fluid rounded-circle"
                  src="assets/img/03.png"
                  alt="..."
                />
              </div>
            </div>
            <div class="col-lg-6 order-lg-1">
              <div class="p-5">
                <h2 class="display-4">Asep</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                  aliquid, mollitia odio veniam sit iste esse assumenda amet
                  aperiam exercitationem, ea animi blanditiis recusandae!
                  Ratione voluptatum molestiae adipisci, beatae obcaecati.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-aos="fade-right" data-aos-anchor-placement="center-bottom">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="p-5">
                <img
                  class="img-fluid rounded-circle"
                  src="assets/img/04.jpg"
                  alt="..."
                />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="p-5">
                <h2 class="display-4">Ilham</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                  aliquid, mollitia odio veniam sit iste esse assumenda amet
                  aperiam exercitationem, ea animi blanditiis recusandae!
                  Ratione voluptatum molestiae adipisci, beatae obcaecati.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section data-aos="fade-right" data-aos-anchor-placement="center-bottom">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 order-lg-2">
              <div class="p-5">
                <img
                  class="img-fluid rounded-circle"
                  src="assets/img/05.jpg"
                  alt="..."
                />
              </div>
            </div>
            <div class="col-lg-6 order-lg-1">
              <div class="p-5">
                <h2 class="display-4">Casey</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                  aliquid, mollitia odio veniam sit iste esse assumenda amet
                  aperiam exercitationem, ea animi blanditiis recusandae!
                  Ratione voluptatum molestiae adipisci, beatae obcaecati.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
