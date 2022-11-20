import React, { useState, useEffect } from 'react';
import Product from './Product';

const Products = () => {
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProducts(data);
      })
      .catch(err => console.log(err));
  }, []);
  // console.log(products);

  return (
    <div className='container mx-auto'>
      <h1 className='font-bold text-lg mb-8'>Products</h1>
      <div
        className='products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16'>
        {
          products.map(product => <Product key={ product._id } product={ product } />)
        }
      </div>
    </div>
  );
};

export default Products;