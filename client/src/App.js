import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ContextProvider } from './context/AppContext';
import { Home, Product, ShoppingCart } from './pages';
import { Header } from './components';
import './App.css';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:productId" component={Product} />
          <Route exact path="/cart" component={ShoppingCart} />
        </Switch>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
