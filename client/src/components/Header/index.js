import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { CgShoppingCart } from 'react-icons/cg';
import { DiGithubBadge } from 'react-icons/di';
import { RiLinkedinBoxFill } from 'react-icons/ri';
import { NavLink, useHistory } from 'react-router-dom';
import { NavDropdown, Navbar, Nav, Form } from 'react-bootstrap';
import { LoginModal, SignUpModal } from '../index';
import './Header.scss';

const Header = () => {
  const history = useHistory();
  const { setCurrentUser, currentUser, shoppingCart, products } = useContext(
    AppContext
  );
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    setCurrentUser('');
  };

  return (
    <Navbar bg="transparent" expand="lg" className="p-4">
      <Navbar.Brand as={NavLink} to="/">
        React Online Shop
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/">
            Shop
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={NavLink} to="/contact">
            Contact
          </Nav.Link>
        </Nav>

        <Nav className="pr-4">
          <NavDropdown
            title={currentUser.name || currentUser.email || 'Guest'}
            id="dropdown-menu-align-responsive-2"
            style={{ right: 0 }}
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
              <>
                <NavDropdown.Item
                  onClick={() => history.push('/cart')}
                  data-tooltip={
                    shoppingCart?.cartQuantity > 0
                      ? shoppingCart?.cartQuantity
                      : null
                  }
                >
                  Cart
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <LoginModal show={loginModal} onHide={() => setLoginModal(false)} />
      <SignUpModal show={signupModal} onHide={() => setSignupModal(false)} />
    </Navbar>
  );
};

export default Header;
