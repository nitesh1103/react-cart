import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import CartContext from './CartContext';
import { getCart, storeCart } from './helpers';

const App = () => {
  const [ cart, setCart ] = useState({});
  
  useEffect(() => {
   getCart()
    .then(_cart => {
      setCart(JSON.parse(_cart));
    });
  }, []);

  useEffect(() => {
    storeCart(cart);
  }, [cart]);

  // console.log(cart);

  return (
    <>
      <CartContext.Provider value={ { cart: cart, setCart: setCart } }>
        <Navigation />
        <Routes>
          <Route path={'/'} element={ <Home /> } />
          <Route path={'/products'} element={ <ProductsPage /> } />
          <Route path={'/products/:_id'} element={ <SingleProduct /> } />
          <Route path={'/cart'} element={ <Cart /> } />
        </Routes>
      </CartContext.Provider>
    </>
  );
};

export default App;
