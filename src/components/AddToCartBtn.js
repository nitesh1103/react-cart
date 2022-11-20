import React, { useContext, useState } from 'react';
import CartContext from '../CartContext';

const AddToCartBtn = (props) => {
  const { product } = props;
  const [ isAdding, setIsAdding ] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const addToCart = (e, PRODUCT) => {
    e.preventDefault();
    let _cart = { ...cart };
    if( !_cart.items ) {
      _cart.items = {};
    };

    if( _cart.items[PRODUCT._id] ) {
      _cart.items[PRODUCT._id] += 1;
    } else {
      _cart.items[PRODUCT._id] = 1;
    };

    if( !_cart.totalItems ) {
      _cart.totalItems = 0;
    }

    _cart.totalItems += 1;
    setCart(_cart);

    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div>
      <button
        disabled={ isAdding ? true : false }
        onClick={ (e) => { addToCart(e, product) } }
        className={`${ isAdding ? 'bg-green-500' : 'bg-yellow-500' } px-4 py-1 font-bold rounded-full`}
      >
        ADD{ isAdding ? 'ED' : '' }
      </button>
    </div>
  );
};

export default AddToCartBtn;