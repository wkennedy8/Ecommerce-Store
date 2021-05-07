import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { RiCloseLine } from 'react-icons/ri';
import { GoTrashcan } from 'react-icons/go';
import { useHistory } from 'react-router-dom';
import { CheckoutModal } from '../index';
import { Drawer, Divider } from '@material-ui/core';
import './CartDrawer.scss';
import { Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_mIntaKnzcY7VnFGDTZa7fzpp00byScppBZ');

const CartDrawer = () => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const history = useHistory();
  const {
    showCart,
    setShowCart,
    shoppingCart,
    currentUser,
    removeItemFromCart
  } = useContext(AppContext);

  const handleSelect = (productId) => {
    setShowCart(false);
    history.push(`/products/${productId}`);
  };

  const handleCheckoutModal = () => {
    setShowCart(false);
    setShowCheckoutModal(true);
  };

  const renderLoginMessage = () => {
    return (
      <Drawer anchor="right" open={showCart} onClose={() => setShowCart(false)}>
        <RiCloseLine
          className="side-drawer--close"
          onClick={() => setShowCart(false)}
        />
        <div className="side-drawer">
          <h6 className="text-center">
            Please login/register to add items to your shopping cart
          </h6>
        </div>
      </Drawer>
    );
  };

  const renderEmptyCartMessage = () => {
    return (
      <Drawer anchor="right" open={showCart} onClose={() => setShowCart(false)}>
        <RiCloseLine
          className="side-drawer--close"
          onClick={() => setShowCart(false)}
        />
        <div className="side-drawer">
          <div>
            <h4 className="text-center">Your cart</h4>
            <h5 className="mt-4">
              No items in your cart, please continue shopping!
            </h5>
          </div>
        </div>
      </Drawer>
    );
  };

  if (!currentUser) {
    return renderLoginMessage();
  }

  if (!shoppingCart?.products || shoppingCart?.products?.length < 1) {
    return renderEmptyCartMessage();
  }

  return (
    <>
      <Drawer anchor="right" open={showCart} onClose={() => setShowCart(false)}>
        <RiCloseLine
          className="side-drawer--close"
          onClick={() => setShowCart(false)}
        />
        <div className="side-drawer">
          <h5>Your cart</h5>
          <div className="side-drawer-row-container">
            {shoppingCart?.products?.map((product) => (
              <div
                key={product.productId}
                className="cart-product-row-container"
              >
                <div className="cart-product-row">
                  <div className="cart-product-row--image">
                    <img
                      className="cart-product-row--image"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  <p
                    className="cart-product-row--name"
                    onClick={() => handleSelect(product.productId)}
                  >
                    {product.name}
                  </p>

                  <div
                    className="cart-product-row--remove pointer"
                    onClick={() =>
                      removeItemFromCart(product, shoppingCart?._id)
                    }
                  >
                    <GoTrashcan />
                  </div>
                </div>
                <div
                  style={{ width: '100%', marginTop: -50 }}
                  className="d-flex justify-content-between"
                >
                  <p>Quantity</p>
                  <p>{product.quantity}</p>
                </div>
                <div
                  style={{ width: '100%' }}
                  className="d-flex justify-content-between"
                >
                  <p>Price</p>
                  <p>${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <Divider />
          <div className="cart-footer">
            <div
              style={{ width: '100%' }}
              className="d-flex justify-content-between"
            >
              <p>Shipping:</p>
              <p>FREE</p>
            </div>
            <div
              style={{ width: '100%' }}
              className="d-flex justify-content-between"
            >
              <p>Total:</p>
              <p>${shoppingCart?.total?.toFixed(2)}</p>
            </div>
            <div className="cart-footer-actions">
              <Button onClick={() => setShowCart(false)}>
                Continue Shopping
              </Button>
              <Button onClick={handleCheckoutModal}>Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      </Drawer>
      <Elements stripe={stripePromise}>
        <CheckoutModal
          show={showCheckoutModal}
          onHide={() => setShowCheckoutModal(false)}
        />
      </Elements>
    </>
  );
};

export default CartDrawer;
