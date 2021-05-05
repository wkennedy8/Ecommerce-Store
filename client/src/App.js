import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ContextProvider } from './context/AppContext';
import { Home, Product, About, Shop } from './pages';
import { Header, SideDrawer, CartDrawer, Footer } from './components';
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
          <Route exact path="/shop" component={Shop} />
        </Switch>
        <SideDrawer />
        <CartDrawer />
        <Footer />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
