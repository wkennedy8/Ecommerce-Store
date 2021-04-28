import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { AuthModal } from '../../components';
import './ShoppingCart.scss';

const ShoppingCart = () => {
  const { shoppingCart, decrementUpdateCart } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  const cart = JSON.parse(sessionStorage.getItem('cart'));

  console.log(cart);
  return (
    <div>
      <h1>ShoppingCart</h1>

      {!cart || Object.values(cart).length < 1 ? (
        <h4>You have nothing in your shopping cart. Continue Shopping</h4>
      ) : null}
      {cart && Object.values(cart).length > 0 ? (
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(cart || shoppingCart)?.map((item) => (
              <tr key={item.product?._id}>
                <td>
                  <div className="d-flex align-items-center justify-content-around">
                    <div onClick={() => decrementUpdateCart(item.product)}>
                      x
                    </div>
                    <img
                      style={{ height: 300, width: 150, objectFit: 'contain' }}
                      src={item?.product?.image}
                      alt={item?.product?.name}
                    />
                    <div>
                      <h6>{item?.product?.name}</h6>
                      <p>Size: L</p>
                    </div>
                  </div>
                </td>
                <td>{item?.count}</td>
                <td>${(item?.product?.price * item.count).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <AuthModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default ShoppingCart;
