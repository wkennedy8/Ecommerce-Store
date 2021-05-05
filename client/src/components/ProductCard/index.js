import React from 'react';
import { Card } from 'react-bootstrap';
import './ProductCard.scss';
import { Link, useHistory } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const history = useHistory();

  return (
    <Card
      className="product-card"
      onClick={() => history.push(`/products/${product._id}`)}
    >
      <div className="product-card--image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-card--image"
        />
      </div>
      <Link to={`/products/${product._id}`}>
        <Card.Title className="product-card--name">{product.name}</Card.Title>
      </Link>
      <Card.Text className="product-card--price">
        ${product.price.toFixed(2)}
      </Card.Text>
    </Card>
  );
};

export default ProductCard;
