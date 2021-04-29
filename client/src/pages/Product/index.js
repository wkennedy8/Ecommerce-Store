import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import './Product.scss';

const Product = ({ match }) => {
  const { handleUpdateCart } = useContext(AppContext);
  const [product, setProduct] = useState([]);
  const { productId } = match.params;
  const inputRef = useRef(null);
  const getProducts = async () => {
    const { data } = await axios.get(`/api/products/${productId}`);
    setProduct(data);
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="product-details">
      <img
        src={product.image}
        alt={product.name}
        className="product-details__image"
      />
      <div className="product-details__info">
        <h1 className="product-details__info--name">{product.name}</h1>
        <h4 className="product-details__info--price">
          ${product?.price?.toFixed(2)}
        </h4>
        <p>DESCRIPTION</p>
        <p className="product-details__info--description">
          {product.description}
        </p>
        <p>SIZE</p>
        <select className="product-details__info--select">
          <option>Select Size</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
        <p>QTY</p>
        <input
          type="number"
          defaultValue={1}
          className="product-details__info--qty"
          ref={inputRef}
        />
        <button
          disabled={product.quantity === 0}
          className="product-details__info--btn"
          onClick={() => handleUpdateCart(product, inputRef.current.value)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
