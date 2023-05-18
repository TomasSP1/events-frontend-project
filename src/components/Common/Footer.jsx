import React from "react";

import "../CSS/Footer.css";
import { creatorsData } from "../../utils/creatorsData.js";

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

          {creatorsData.map(({ name, socialLink, stack }) => (
            <div key={name}>
              <a
                target="blank"
                href={socialLink}
              >
                <i className="fa-brands fa-linkedin"></i>
                {name}
              </a>
              {stack &&
                stack.map((item, index) => <p key={item + index}>{item}</p>)}
            </div>
          ))}
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
