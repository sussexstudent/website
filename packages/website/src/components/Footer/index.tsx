import React from 'react';
import { SocialMenu } from '../SocialMenu';

export const Footer: React.FC = () => (
  <footer className="Footer">
    <div className="Footer__menu LokiContainer">
      <ul>
        <li>
          <a href="/about-us/contact-us">Contact us</a>
        </li>
        <li>
          <a href="/about-us/jobs">Jobs</a>
        </li>
        <li>
          <a href="/advertise">Advertise with us</a>
        </li>
        <li>
          <a href="/privacy">Our Privacy Policy</a>
        </li>
      </ul>
    </div>
    <div className="Footer__container LokiContainer">
      <div className="Footer__social">
        <SocialMenu />
        <a
          className="Button Button--white"
          href="/newsletter"
          data-action="newsletter_subscribe"
        >
          Subscribe to our email newsletter
        </a>
      </div>
      <div className="Footer__contact">
        <p>
          Falmer House, Falmer, East Sussex, BN1 9QF
          <br />
          01273 678152
          <br />
          info@sussexstudent.com
          <br />
        </p>

        <p>
          University of Sussex Students’ Union - Company No. 07695765. Charity
          No. 1147242
          <br />
          University of Sussex Students’ Union Trading Ltd - Company No.
          02146582
        </p>

        <p>
          {"Designed and built by Sussex Students' Union. Powered by MSL. "}
          <a href="https://sussexstudent.github.io/changelog/">changelog</a>
        </p>
      </div>
    </div>
  </footer>
);
