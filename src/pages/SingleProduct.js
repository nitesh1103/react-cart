import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddToCartBtn from '../components/AddToCartBtn';

const SingleProduct = () => {
  const [ product, setProduct ] = useState({});
  const params = useParams();
  // console.log(params);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/products/${ params._id }`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setProduct(data);
      })
      .catch(err => console.log(err));
  }, [ params._id ]);

  return (
    <div className='container mx-auto py-8'>
      <button onClick={() => { navigate(-1) }} className='text-lg font-bold'>Back</button>
      <div className='flex mt-10'>
        <img src={ product.image } alt='Single-Pizza' />
        <div className='ml-16'>
          <h1 className='text-xl font-bold'>{ product.name }</h1>
          <div className='text-md'>{ product.size }</div>
          <div className='font-bold mt-1 mb-2'>₹ { product.price }</div>
          <AddToCartBtn product={ product } />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;