import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { AuthModal } from '../../components';
import './ShoppingCart.scss';

const ShoppingCart = () => {
  const { shoppingCart, currentUser, decrementUpdateCart } = useContext(
    AppContext
  );
  const [showModal, setShowModal] = useState(false);

  console.log(shoppingCart);

  return (
    <div>
      <h1>ShoppingCart</h1>
      {!currentUser && (
        <p>
          Please <span onClick={() => setShowModal(true)}>LOGIN</span> to add
          items to your shopping cart
        </p>
      )}
      {shoppingCart && shoppingCart.products.length > 0 ? (
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
            {shoppingCart.products?.map((product) => (
              <tr key={product.productId}>
                <td>
                  <div className="d-flex align-items-center justify-content-around">
                    <div
                      onClick={() =>
                        decrementUpdateCart(
                          {
                            ...product,
                            _id: product.productId,
                            price: product.price / product.quantity
                          },
                          shoppingCart._id
                        )
                      }
                    >
                      x
                    </div>
                    <img
                      style={{ height: 300, width: 150, objectFit: 'contain' }}
                      src={product.image}
                      alt={product.name}
                    />
                    <div>
                      <h6>{product.name}</h6>
                      <p>Size: L</p>
                    </div>
                  </div>
                </td>
                <td>{product.quantity}</td>
                <td>${product.price?.toFixed(2)}</td>
              </tr>
            ))}
          </thead>
        </table>
      ) : (
        <h1>No items in your cart, please continue shopping!</h1>
      )}

      {shoppingCart.products.length > 0 && (
        <p>Total: ${shoppingCart.total?.toFixed(2)}</p>
      )}
      <AuthModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default ShoppingCart;
