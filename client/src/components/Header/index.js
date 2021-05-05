import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { GiHamburgerMenu, GiShoppingBag } from 'react-icons/gi';
import { NavLink, useHistory } from 'react-router-dom';
import './Header.scss';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { LoginModal, SignUpModal } from '../index';

const Header = () => {
  const history = useHistory();
  const {
    setCurrentUser,
    currentUser,
    shoppingCart,
    setShowDrawer,
    setShowCart
  } = useContext(AppContext);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  console.log(shoppingCart);
  const handleLogout = () => {
    sessionStorage.clear();
    setCurrentUser('');
  };

  return (
    <Navbar bg="transparent" expand="lg" className="p-4">
      <GiHamburgerMenu
        className="mr-4 hamburger"
        onClick={() => setShowDrawer(true)}
      />
      <Navbar.Brand as={NavLink} to="/">
        React Online Shop
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto d-flex align-items-center">
          <p
            className="nav-shop--icon"
            data-tooltip={(currentUser && shoppingCart.cartQuantity) || null}
            onClick={() => setShowCart(true)}
          >
            <GiShoppingBag />
          </p>

          <Nav.Link as={NavLink} to="/shop">
            Shop
          </Nav.Link>
        </Nav>

        <Nav className="pr-4 right-dropdown">
          <NavDropdown
            title={currentUser.name || currentUser.email || 'Guest'}
            id="dropdown-menu-align-responsive-2"
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
        </Nav>
      </Navbar.Collapse>
      <LoginModal show={loginModal} onHide={() => setLoginModal(false)} />
      <SignUpModal show={signupModal} onHide={() => setSignupModal(false)} />
    </Navbar>
  );
};

export default Header;
