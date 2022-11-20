import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../CartContext';

const Cart = () => {
  let grandTotal = 0;
  const [ products, setProducts ] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  const [ isInfoFetched, setIsInfoFetched ] = useState(false);

  useEffect(() => {
    if( !cart || !cart.items ) return;
    if( isInfoFetched ) return;

    fetch(
      '/api/products/cart-items',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Object.keys(cart.items) })
      }
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setProducts(data);
        setIsInfoFetched(true);
      })
      .catch(err => console.log(err));
  }, [cart, isInfoFetched]);

  const getQty = (productID) => {
    // console.log(productID);
    const qty = cart.items[productID];
    // console.log(`${productID} : ${qty}`);
    return qty;
  };

  const increment = (productID) => {
    const currentQty = cart.items[productID];
    // console.log(currentQty);
    const _cart = { ...cart };
    _cart.items[productID] = currentQty + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  };

  const decrement = (productID) => {
    const currentQty = cart.items[productID];
    // console.log(productID, currentQty);
    if( currentQty === 1 ) return;

    const _cart = { ...cart };
    // console.log('_cart: ', _cart);
    _cart.items[productID] = currentQty - 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  };

  const getSum = (productID, productPrice) => {
    const currentQty = cart.items[productID];
    // console.log(currentQty, productPrice);
    const sum = currentQty * productPrice;
    grandTotal += sum;
    return sum;
  };

  const handleDeleteCartItem = (productID) => {
    const _cart = { ...cart };
    const itemQty = _cart.items[productID];
    delete _cart.items[productID];
    _cart.totalItems -= itemQty;
    setCart(_cart);
    setProducts(products.filter(product => product._id !== productID));
  };

  const handleOrderNow = () => {
    window.alert('Order placed successfully!');
    setCart({});
    setProducts([]);
  };

  return (
    !products.length 
    ? 
    <img className='w-1/2 mx-auto mt-12' src='/images/empty-cart.png' alt='EmptyCart' /> 
    : 
    <div className='container mx-auto w-full lg:w-1/2 pt-8 pb-24'>
      <h2 className='mb-10 font-bold'>Cart Items</h2>
      <ul>
        {
          products.map(product => {
            return (
              <li className='mb-8' key={ product._id }>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <img className='h-16' src={ product.image } alt='Pizza' />
                    <span className='font-bold ml-4 w-48'>{ product.name }</span>
                  </div>
                  <div>
                    <button
                      onClick={ () => { decrement(product._id) } }
                      className='px-4 py-2 font-bold bg-yellow-500 hover:bg-yellow-600 rounded-full leading-none'
                    > - </button>
                    <b className='mx-2'>{ getQty(product._id) }</b>
                    <button
                      onClick={ () => { increment(product._id) } }
                      className='px-4 py-2 font-bold bg-yellow-500 hover:bg-yellow-600 rounded-full leading-none'
                    > + </button>
                  </div>
                  <span className='font-bold'>₹ { getSum(product._id, product.price) }</span>
                  <button
                    onClick={ () => { handleDeleteCartItem(product._id) } }
                    className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full leading-none'>Delete</button>
                </div>
              </li>
            );
          })
        }
      </ul>
      <hr className='my-6' />
      <div className='text-right mb-6'>
        <b>Grand total :</b> ₹ { grandTotal }
      </div>
      <div className='text-right'>
        <button
          onClick={ handleOrderNow }
          className='px-4 py-2 font-bold bg-yellow-500 hover:bg-yellow-600 rounded-full leading-none'>Order Now</button>
      </div>
    </div>
  );
};

export default Cart;