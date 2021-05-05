import React, { useContext } from 'react';
import { Hero } from '../../components';
import { AppContext } from '../../context/AppContext';
import './Home.scss';

const Home = () => {
  const { products, filter } = useContext(AppContext);

  return (
    <div>
      <Hero />
    </div>
  );
};

export default Home;
