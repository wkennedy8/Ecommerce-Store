import React from 'react';
import './ProductCard.scss';
import { useHistory } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const history = useHistory();

  return (
    <div
      className="product-card"
      onClick={() => history.push(`/products/${product._id}`)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="product-card--image"
      />
      <p className="product-card--name">{product.name}</p>
      <p className="product-card--price">${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
