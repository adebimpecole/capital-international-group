import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <a
          href="/"
          aria-current="page"
          className="footer-logo w-inline-block w--current"
        >
          <img
            src="https://assets-global.website-files.com/5e100b7a946b12ba33ac57ee/5e12f977c5e98c6f6bfd0612_CIG-white-gold.svg"
            width="135"
            alt="capital logo"
            className="image-123"
          />
        </a>
        <ul role="list" className="icon_list">
          <li className="list-item">
            <a href="#" target="_blank" className="icon_link">
              <img
                src="https://assets-global.website-files.com/5e100b7a946b12ba33ac57ee/5e100b7a946b1214a5ac5861_linkedin.svg"
                alt="linkedin"
                className="social_icon"
              />
            </a>
          </li>
          <li className="list-item">
            <a href="#" target="_blank" className="icon_link">
              <img
                src="https://assets-global.website-files.com/5e100b7a946b12ba33ac57ee/5e100b7a946b1260a3ac5851_facebook.svg"
                alt="facebook"
                className="social_icon"
              />
            </a>
          </li>
          <li className="list-item">
            <a href="#" target="_blank" className="icon_link">
              <img
                src="https://assets-global.website-files.com/5e100b7a946b12ba33ac57ee/5e100b7a946b1264faac5859_twitter.svg"
                alt="twitter"
                className="social_icon"
              />
            </a>
          </li>
          <li className="list-item">
            <a href="#" target="_blank" className="icon_link">
              <img
                src="https://assets-global.website-files.com/5e100b7a946b12ba33ac57ee/5e100b7a946b123113ac5858_instagram.svg"
                alt="instagram"
                className="social_icon"
              />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer_right">
        <div className="footer_column">
          <h6 className="column_head">Services</h6>
          <ul className="column_list">
            <li className="list_item">
              <a href="#">
                Investment <br />
                Platform
              </a>
            </li>
            <li className="list_item">
              <a href="#">
                Investment <br />
                Management
              </a>
            </li>
            <li className="list_item">
              <a href="#">
                Corporate
                <br /> Banking
              </a>
            </li>
          </ul>
        </div>
        <div className="footer_column">
          <h6 className="column_head">Company</h6>
          <ul role="list" className="column_list">
            <li className="list_item">
              <a href="#">About us</a>
            </li>
            <li className="list_item">
              <a href="#">Blog</a>
            </li>
            <li className="list_item">
              <a href="#">
                Conscious <br />
                Capital
              </a>
            </li>
            <li className="list_item">
              <a href="#">Careers</a>
            </li>
            <li className="list_item">
              <a href="#">Contact us</a>
            </li>
          </ul>
        </div>
        <div className="footer_column">
          <h6 className="column_head">Resources</h6>
          <ul role="list" className="column_list">
            <li className="list_item">
              <a href="#">
                Investment <br />
                Platform <br />
                Resources
              </a>
            </li>
            <li className="list_item">
              <a href="#">
                Investment <br />
                Management
                <br />
                Resources
                <br />
              </a>
            </li>
            <li className="list_item">
              <a href="#">
                Capital International
                <br />
                Bank Resources
              </a>
            </li>
            <li className="list_item">
              <a href="#">Client Charter</a>
            </li>
            <li className="list_item">
              <a href="#">
                Investment <br />
                Onboarding
                <br />
                Support
              </a>
            </li>
            <li className="list_item">
              <a href="#">
                Fraud
                <br /> Awareness
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
