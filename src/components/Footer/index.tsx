import React from 'react';
import Social from '~components/SocialMenu';

const Footer = () => (
  <footer className="Footer">
    <div className="Footer__container LokiContainer">
      <div className="Footer__contact">
        <h3>Contact us</h3>
        <p>
          01273 678152
          <br />
          info@sussexstudent.com
          <br />
          Falmer House, Falmer, East Sussex, BN1 9QF
        </p>

        <p>
          <a href="/about-us/contact-us">
            View contact details for particular departments, staff and officers
          </a>
          <br />
          <a href="/about-us/jobs">Jobs</a>
          <br />
          <a href="/advertise">Advertise With Us</a>
          <br />
          <a href="/privacy">Our privacy policy</a>
        </p>
        <p>
          <small>
            University of Sussex Students’ Union - Company No. 07695765. Charity
            No. 1147242
          </small>
          <br />
          <small>
            University of Sussex Students’ Union Trading Ltd - Company No.
            02146582
          </small>
        </p>

        <p>
          <small>
            {"Designed and built by Sussex Students' Union. Powered by MSL. "}
            <a href="https://sussexstudent.github.io/changelog/">changelog</a>
          </small>
        </p>
      </div>
      <div className="Footer__social">
        <Social />
        <a
          className="Button Button--yellow"
          href="/newsletter"
          data-action="newsletter_subscribe"
        >
          Subscribe to our email newsletter
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
