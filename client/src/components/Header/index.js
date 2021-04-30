import React from 'react';
import { CgShoppingCart } from 'react-icons/cg';
import { DiGithubBadge } from 'react-icons/di';
import { RiLinkedinBoxFill } from 'react-icons/ri';
import { NavLink, useHistory } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const history = useHistory();

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
      </ul>
    </header>
  );
};

export default Header;
