import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer } from '@material-ui/core';
import { RiCloseLine } from 'react-icons/ri';
import { AppContext } from '../../context/AppContext';
import './SideDrawer.scss';

const SideDrawer = () => {
  const history = useHistory();
  const { categories, showDrawer, setShowDrawer, setFilter } = useContext(
    AppContext
  );

  const handleSelect = (category) => {
    setFilter(category);
    setShowDrawer(false);
    history.push('/shop');
  };

  return (
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
    </Drawer>
  );
};

export default SideDrawer;
