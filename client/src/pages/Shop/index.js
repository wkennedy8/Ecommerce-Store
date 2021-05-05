import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ProductCard } from '../../components';

const Shop = () => {
  const { products, filter } = useContext(AppContext);
  return (
    <div>
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

export default Shop;
