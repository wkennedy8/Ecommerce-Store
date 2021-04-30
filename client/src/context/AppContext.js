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
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);

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

  const getCart = async () => {
    const { data } = await axios.get('/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setShoppingCart(data);
  };

  useEffect(() => {
    getCategories();
    getProducts();

    if (token && !currentUser) {
      getCurrentUser();
      getCart();
    }

    // eslint-disable-next-line
  }, []);

  const handleUpdateCart = async (product, quantity) => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        '/api/cart',
        { product, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setShoppingCart(data);
      setPurchased(false);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.log('ERROR: ', error.message);
    }
  };

  const decrementUpdateCart = async (product, cartId) => {
    try {
      const { data } = await axios.put(
        `/api/cart/${cartId}`,
        { product },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setShoppingCart(data);
    } catch (error) {
      console.log('ERROR: ', error.message);
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
        setCurrentUser,
        loading,
        setLoading,
        token,
        purchased,
        setPurchased
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
