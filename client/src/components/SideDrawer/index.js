import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer, Divider } from '@material-ui/core';
import { RiCloseLine } from 'react-icons/ri';
import { AppContext } from '../../context/AppContext';
import { LoginModal, SignUpModal } from '../index';
import './SideDrawer.scss';

const SideDrawer = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const history = useHistory();
  const {
    categories,
    showDrawer,
    setShowDrawer,
    currentUser,
    setFilter,
    setCurrentUser
  } = useContext(AppContext);

  const handleSelect = (category) => {
    setFilter(category);
    setShowDrawer(false);
    history.push('/shop');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setCurrentUser('');
    setShowDrawer(false);
  };

  return (
    <>
      <Drawer open={showDrawer} onClose={() => setShowDrawer(false)}>
        <div className="side-drawer" onClick={() => setShowDrawer(false)}>
          <RiCloseLine className="side-drawer--close" />
          <h5>Shop by category</h5>
          {categories.map((category) => (
            <p
              className="side-drawer--item"
              key={category._id}
              onClick={() => handleSelect(category._id)}
            >
              {category.name}
            </p>
          ))}
          <p className="side-drawer--item" onClick={() => handleSelect('')}>
            All
          </p>
        </div>
        <Divider className="divider" />
        <div className="user-options">
          {!currentUser ? (
            <>
              <p
                className="side-drawer--item"
                onClick={() => {
                  setShowDrawer(false);

                  setLoginModal(true);
                }}
              >
                Login
              </p>
              <p
                className="side-drawer--item"
                onClick={() => {
                  setSignupModal(true);
                  setShowDrawer(false);
                }}
              >
                Create Account
              </p>
            </>
          ) : (
            <p className="side-drawer--item" onClick={handleLogout}>
              Logout
            </p>
          )}
        </div>
      </Drawer>
      <LoginModal show={loginModal} onHide={() => setLoginModal(false)} />
      <SignUpModal show={signupModal} onHide={() => setSignupModal(false)} />
    </>
  );
};

export default SideDrawer;
