import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const token = sessionStorage.getItem('token');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({});
  const [filter, setFilter] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const getCategories = async () => {
    const { data } = await axios.get('/api/categories');
    setCategories(data);
  };

  const getProducts = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };

  const getCurrentUser = async () => {
    const { data } = await axios.get('/api/users/current', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setCurrentUser(data);
  };

  useEffect(() => {
    getCategories();
    getProducts();

    if (token && !currentUser) {
      getCurrentUser();
    }
    // eslint-disable-next-line
  }, []);

  const handleUpdateCart = async (product) => {
    //get cart from sessionStorage and parse into an object
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    //if there is a cart do the following
    if (cart) {
      //Find out if the cart contains the product passed to the function
      const currentItemInCart = cart[product._id];
      //if the product passed is currently not in the cart
      if (!currentItemInCart) {
        //add it to the cart
        const updatedCart = {
          ...cart,
          [product._id]: { count: 1, product }
        };
        //update the state....(not necessary)
        setShoppingCart(updatedCart);
        //update the cart is sessionStorage
        return sessionStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      //if the product IS currently in the cart
      //update the count
      const updatedCartQty = {
        ...cart,
        [product._id]: { count: currentItemInCart.count + 1, product }
      };
      //update the state
      setShoppingCart(updatedCartQty);
      //update the cart in sessionStorage
      return sessionStorage.setItem('cart', JSON.stringify(updatedCartQty));
    } else {
      const newCart = {
        ...shoppingCart,
        [product._id]: { count: 1, product }
      };
      setShoppingCart(newCart);
      return sessionStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const decrementUpdateCart = (product) => {
    //get cart from sessionStorage
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    //check if product is currently in cart
    let currentItemInCart = cart[product._id];

    //if count of product in cart is 1, remove it
    if (currentItemInCart.count === 1) {
      currentItemInCart = {
        ...cart,
        [product._id]: { count: 0, product }
      };
      delete currentItemInCart[product._id];
      setShoppingCart(currentItemInCart);
      return sessionStorage.setItem('cart', JSON.stringify(currentItemInCart));
    }
    if (currentItemInCart) {
      const updatedCart = {
        ...cart,
        [product._id]: { count: currentItemInCart.count - 1, product }
      };
      setShoppingCart(updatedCart);
      return sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  return (
    <AppContext.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        filter,
        setFilter,
        shoppingCart,
        setShoppingCart,
        handleUpdateCart,
        decrementUpdateCart,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
