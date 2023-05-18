import React from "react";
import "../CSS/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_newsletter">
        <p>Subscribe to our Newsletter!</p>
        <p>
          I wish to subscribe to weekly newsletter about upcoming... *note* not
          actually functional
        </p>
        <div className="Newsletter_input">
          <input
            type="text"
            placeholder="Enter your E-mail"
          />
          <button>Subscribe!</button>
        </div>

        <div className="footer_socials">
          <p>Follow us on social media!</p>
          <div className="social_media">
            <a href="/">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="/">
              <i className="fab fa-instagram-square"></i>
            </a>
            <a href="/">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a href="/">
              <i className="fab fa-youtube-square"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer_links">
        <div className="footer_nav">
          <p>MyEvents</p>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </div>

        <div className="footer_team">
          <p>Project by:</p>

          <div>
            <a
              target="blank"
              href="https://www.linkedin.com/in/tomas-rinkevicius/"
            >
              <i className="fa-brands fa-linkedin"></i>
              Tomas R.
            </a>
            <p>Front-end</p>
            <p>UI/UX</p>
            <p>Design</p>
          </div>

          <div>
            <a
              target="blank"
              href="https://www.linkedin.com/in/donatas-kusleika-26684b131/"
            >
              <i className="fa-brands fa-linkedin"></i>Donatas K.
            </a>
            <p>Front-end</p>
            <p>UI/UX</p>
          </div>

          <div>
            <a
              href="https://www.linkedin.com/in/tomas-%C5%A1pigelskis-6ab99524b/"
              target="blank"
            >
              <i className="fa-brands fa-linkedin"></i>
              Tomas Šp.
            </a>
            <p>Team Lead</p>
            <p>Back-end</p>
          </div>

          <div>
            <a
              target="blank"
              href="https://www.linkedin.com/in/airidas-%C5%A1mitas-a83001224/"
            >
              <i className="fa-brands fa-linkedin"></i>Airidas Š.
            </a>
            <p>Back-end</p>
          </div>

          <div>
            <a
              target="blank"
              href="https://www.linkedin.com/in/evelina-marcinkeviciene/"
            >
              <i className="fa-brands fa-linkedin"></i>Evelina M.
            </a>
            <p>Back-end</p>
          </div>
        </div>
      </div>

      <div className="footer_drops">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </footer>
  );
}

export default Footer;
