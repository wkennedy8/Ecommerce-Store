import React from 'react';
import {
  AiOutlineGithub,
  AiFillLinkedin,
  AiFillInstagram
} from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  const history = useHistory();
  return (
    <div className="footer">
      <div className="footer__left">
        <ul className="footer__left--list">
          <li
            className="footer__left--list-item"
            onClick={() => history.push('/about')}
          >
            About us
          </li>
          <li
            className="footer__left--list-item"
            onClick={() => history.push('/contact')}
          >
            Contact
          </li>
          <li
            className="footer__left--list-item"
            onClick={() => history.push('/shipping')}
          >
            Shipping
          </li>
        </ul>
      </div>
      <div className="footer__right">
        <p>&copy; {new Date().getFullYear()} React Online Shop</p>
        <div>
          <AiOutlineGithub className="footer__right--icon" />
          <AiFillLinkedin className="footer__right--icon" />
          <AiFillInstagram className="footer__right--icon" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
