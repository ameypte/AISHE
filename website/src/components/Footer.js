import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub, } from '@fortawesome/free-brands-svg-icons';
import { faHome, faEnvelope, faPhone, faPrint, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const myStyle = {
    width: '60px',
    backgroundColor: '#7c4dff',
    height: '2px',
  };

  return (
    <div>
      <footer className="text-center text-lg-start text-white" style={{backgroundColor: "#1c2331"}}>
        <section className="d-flex justify-content-between p-4" style={{backgroundColor: "#6351ce"}}>
          <div className="me-5">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="https://www.facebook.com/" className="text-white me-4">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com/" className="text-white me-4">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.google.com/" className="text-white me-4">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="https://www.instagram.com/" className="text-white me-4">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.linkedin.com/" className="text-white me-4">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com/" className="text-white me-4">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </section>

        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-6 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Company name</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={myStyle} />
                <p>
                  Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>

              <div className="col-md-6 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={myStyle} />
                <p>
                  <a href="#" className="text-white">
                    MDBootstrap
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white">
                    MDWordPress
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white">
                    BrandFlow
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white">
                    Bootstrap Angular
                  </a>
                </p>
              </div>

              <div className="col-md-6 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={myStyle} />
                <p>
                  <a href="#" className="text-white">
                    Your Account
                  </a>
                </p>
                <p>
                  <a href="#" className="text-white">
                    Become an Affiliate
                  </a>
                </p>
              <p>
                <a href="#" className="text-white">
                  Shipping Rates
                </a>
              </p>
              <p>
                <a href="#" className="text-white">
                  Help
                </a>
              </p>
            </div>

            <div className="col-md-6 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={myStyle}
              />
              <p>
              <FontAwesomeIcon icon={faHome} /> New York, NY 10012, US
              </p>
              <p>
              <FontAwesomeIcon icon={faEnvelope} /> info@example.com
              </p>
              <p>
              <FontAwesomeIcon icon={faPhone} /> + 01 234 567 88
              </p>
              <p>
              <FontAwesomeIcon icon={faPrint} /> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-3"
        style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
      >
       Made with <FontAwesomeIcon icon={faHeart} /> by GPANS
      </div>
    </footer>
  </div>
  )
}