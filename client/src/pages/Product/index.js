import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import './Product.scss';

const Product = ({ match }) => {
  const { handleUpdateCart, loading } = useContext(AppContext);
  const [product, setProduct] = useState([]);
  const { productId } = match.params;
  const inputRef = useRef(null);
  const sizeRef = useRef(null);
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
        src={product?.image}
        alt={product?.name}
        className="product-details__image"
      />
      <div className="product-details__info">
        <h1 className="product-details__info--name">{product?.name}</h1>
        <h4 className="product-details__info--price">
          ${product?.price?.toFixed(2)}
        </h4>
        <p>DESCRIPTION</p>
        <p className="product-details__info--description">
          {product?.description}
        </p>
        <p>SIZE</p>
        <select className="product-details__info--select" ref={sizeRef}>
          <option>Select Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <p>QTY</p>
        <input
          type="number"
          defaultValue={1}
          className="product-details__info--qty"
          ref={inputRef}
        />
        <button
          disabled={loading || product?.quantity === 0}
          className="product-details__info--btn"
          onClick={() =>
            handleUpdateCart(
              { ...product, size: sizeRef.current.value },
              inputRef.current.value
            )
          }
        >
          {loading ? 'Adding' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default Product;
