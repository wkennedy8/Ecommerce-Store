import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { CgShoppingCart } from 'react-icons/cg';
import { DiGithubBadge } from 'react-icons/di';
import { RiLinkedinBoxFill } from 'react-icons/ri';
import { NavLink, useHistory } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { LoginModal, SignUpModal } from '../index';
import './Header.scss';

const Header = () => {
  const history = useHistory();
  const { setCurrentUser, currentUser, shoppingCart } = useContext(AppContext);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    setCurrentUser('');
  };

  return (
    <header className="header">
      <ul className="header__list">
        <NavLink to="/" activeClassName="active">
          <li className="header__list--item">Shop</li>
        </NavLink>
        <NavLink to="/about" activeClassName="active">
          <li className="header__list--item">About</li>
        </NavLink>
        <NavLink to="/contact" activeClassName="active">
          <li className="header__list--item">Contact</li>
        </NavLink>
      </ul>
      <div className="header__name">
        <h3>ECommerce</h3>
      </div>
      <ul className="header__list">
        <li className="header__list--item social-icon">
          <a
            href="https://github.com/wkennedy8"
            target="_blank"
            rel="noreferrer"
          >
            <DiGithubBadge />
          </a>
        </li>
        <li className="header__list--item social-icon">
          <a
            href="https://www.linkedin.com/in/williamkennedy8/"
            target="_blank"
            rel="noreferrer"
          >
            <RiLinkedinBoxFill />
          </a>
        </li>
        <li
          className="header__list--item social-icon"
          onClick={() => history.push('/cart')}
          data-tooltip={
            shoppingCart.cartQuantity > 0 ? shoppingCart.cartQuantity : null
          }
        >
          <CgShoppingCart style={{ color: '#007bff' }} />
        </li>
        <li>
          <NavDropdown
            title={currentUser.name || 'Guest'}
            id="basic-nav-dropdown"
          >
            {!currentUser ? (
              <>
                <NavDropdown.Item onClick={() => setLoginModal(true)}>
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setSignupModal(true)}>
                  Create Account
                </NavDropdown.Item>
              </>
            ) : (
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            )}
          </NavDropdown>
        </li>
      </ul>
      <LoginModal show={loginModal} onHide={() => setLoginModal(false)} />
      <SignUpModal show={signupModal} onHide={() => setSignupModal(false)} />
    </header>
  );
};

export default Header;
