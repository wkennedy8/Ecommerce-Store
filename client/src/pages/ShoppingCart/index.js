import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { AuthModal, CheckoutModal } from '../../components';
import './ShoppingCart.scss';
import { Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const ShoppingCart = () => {
  const {
    shoppingCart,
    currentUser,
    decrementUpdateCart,
    purchased
  } = useContext(AppContext);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  console.log(shoppingCart);
  const renderLoginMessage = () => {
    return (
      <p>
        Please <span onClick={() => setShowAuthModal(true)}>LOGIN</span> to add
        items to your shopping cart
      </p>
    );
  };

  const renderPurchaseMessage = () => {
    return (
      <div>
        <h1>Thank you for your Purchase!</h1>
        <Link to="/">Go to home</Link>
      </div>
    );
  };

  const renderEmptyCartMessage = () => {
    return (
      <div>
        <h4>Your cart</h4>
        <h5>No items in your cart, please continue shopping!</h5>
      </div>
    );
  };

  if (!currentUser) {
    return renderLoginMessage();
  }

  if (purchased) {
    return renderPurchaseMessage();
  }

  if (!shoppingCart?.products || shoppingCart?.products?.length < 1) {
    return renderEmptyCartMessage();
  }

  return (
    <div>
      <h4>Your cart</h4>
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
                    style={{
                      height: 300,
                      width: 150,
                      objectFit: 'contain'
                    }}
                    src={product.image}
                    alt={product.name}
                  />
                  <div>
                    <h6>{product.name}</h6>
                    <p>Size: {product.size}</p>
                  </div>
                </div>
              </td>
              <td>{product.quantity}</td>
              <td>${product.price?.toFixed(2)}</td>
            </tr>
          ))}
        </thead>
      </table>

      {shoppingCart?.products?.length > 0 && !purchased && (
        <div>
          <p>Total: ${shoppingCart.total?.toFixed(2)}</p>
          <Button
            size="lg"
            variant="outline-info"
            onClick={() => setShowCheckoutModal(true)}
          >
            Checkout
          </Button>
        </div>
      )}
      <AuthModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
      <Elements stripe={stripePromise}>
        <CheckoutModal
          show={showCheckoutModal}
          onHide={() => setShowCheckoutModal(false)}
        />
      </Elements>
    </div>
  );
};

export default ShoppingCart;
