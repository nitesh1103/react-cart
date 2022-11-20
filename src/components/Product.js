import React from 'react';
import { Link } from 'react-router-dom';
import AddToCartBtn from './AddToCartBtn';

const Product = (props) => {
  const { product } = props;
  // console.log(product);

  return (
    <Link to={`/products/${product._id}`}>
      <div className='product-item w-80 md:w-full mx-auto'>
        <img className='w-full' src={ product.image } alt='Pizza' />
        <div className='text-center'>
          <h2 className='text-lg font-bold py-2'>{ product.name }</h2>
          <span className='px-4 py-1 text-sm bg-gray-200 rounded-full'>{ product.size }</span>
          <div className='flex items-center justify-between mt-4'>
            <span className='font-bold text-sm'>₹ { product.price }</span>
            <AddToCartBtn product={ product } />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;