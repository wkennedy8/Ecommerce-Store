import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ContextProvider } from './context/AppContext';
import { Home, Product, ShoppingCart, About, Shop } from './pages';
import { Header, SideDrawer, Footer } from './components';
import './App.css';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/products/:productId" component={Product} />
          <Route exact path="/cart" component={ShoppingCart} />
          <Route exact path="/shop" component={Shop} />
        </Switch>
        <SideDrawer />
        <Footer />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
