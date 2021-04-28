import React, { useContext } from 'react';
import { ProductCard, Filter } from '../../components';
import { AppContext } from '../../context/AppContext';
import './Home.scss';

const Home = () => {
  const { products, filter } = useContext(AppContext);

  return (
    <div>
      <Filter />
      <div className="products">
        {products
          .filter((item) => item.categoryId.includes(filter))
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Home;
