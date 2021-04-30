import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { CgShoppingCart } from 'react-icons/cg';
import { DiGithubBadge } from 'react-icons/di';
import { RiLinkedinBoxFill } from 'react-icons/ri';
import { NavLink, useHistory } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { AuthModal, SignUpModal } from '../index';
import './Header.scss';

const Header = () => {
  const history = useHistory();
  const { setCurrentUser, currentUser } = useContext(AppContext);
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
          <DiGithubBadge />
        </li>
        <li className="header__list--item social-icon">
          <RiLinkedinBoxFill />
        </li>
        <li
          className="header__list--item social-icon"
          onClick={() => history.push('/cart')}
        >
          <CgShoppingCart />
          {/* {Object.values(cart).count > 0 && (
            <Badge variant="dark">{Object.values(cart).count}</Badge>
          )} */}
        </li>
        <li>
          <NavDropdown
            title={currentUser.email || 'Guest'}
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
      <AuthModal show={loginModal} onHide={() => setLoginModal(false)} />
      <SignUpModal show={signupModal} onHide={() => setSignupModal(false)} />
    </header>
  );
};

export default Header;
