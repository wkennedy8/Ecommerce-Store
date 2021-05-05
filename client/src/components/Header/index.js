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

  const handleLogout = () => {
    sessionStorage.clear();
    setCurrentUser('');
  };

  return (
    <div className="container d-flex justify-content-between align-items-center header">
      <div className="d-flex align-items-center">
        <GiHamburgerMenu
          className="mr-4 hamburger"
          onClick={() => setShowDrawer(true)}
        />
        <h5 className="pointer" onClick={() => history.push('/')}>
          React Online Shop
        </h5>
      </div>
      <div className="d-flex">
        <ul className="d-flex align-items-center header-right">
          <p
            className="nav-shop--icon"
            data-tooltip={(currentUser && shoppingCart?.cartQuantity) || null}
            onClick={() => setShowCart(true)}
          >
            <GiShoppingBag />
          </p>
          <div className="header-right-actions">
            <li onClick={() => history.push('/shop')} className="pointer">
              Shop
            </li>
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
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </div>
        </ul>
      </div>
      <LoginModal show={loginModal} onHide={() => setLoginModal(false)} />
      <SignUpModal show={signupModal} onHide={() => setSignupModal(false)} />
    </div>
    // <Navbar bg="transparent" expand="lg" className="p-4">
    //   <GiHamburgerMenu
    //     className="mr-4 hamburger"
    //     onClick={() => setShowDrawer(true)}
    //   />
    //   <Navbar.Brand as={NavLink} to="/">
    //     React Online Shop
    //   </Navbar.Brand>

    //   <Nav className="ml-auto d-flex align-items-center header-right right-dropdown">
    //     <p
    //       className="nav-shop--icon"
    //       data-tooltip={(currentUser && shoppingCart.cartQuantity) || null}
    //       onClick={() => setShowCart(true)}
    //     >
    //       <GiShoppingBag />
    //     </p>

    //     <Nav.Link as={NavLink} to="/shop">
    //       Shop
    //     </Nav.Link>

    //     <NavDropdown
    //       title={currentUser.name || currentUser.email || 'Guest'}
    //       id="dropdown-menu-align-responsive-2"
    //     >
    //       {!currentUser ? (
    //         <>
    //           <NavDropdown.Item onClick={() => setLoginModal(true)}>
    //             Login
    //           </NavDropdown.Item>
    //           <NavDropdown.Item onClick={() => setSignupModal(true)}>
    //             Create Account
    //           </NavDropdown.Item>
    //         </>
    //       ) : (
    //         <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
    //       )}
    //     </NavDropdown>
    //   </Nav>

    // </Navbar>
  );
};

export default Header;
