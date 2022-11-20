import React from 'react';
import Products from '../components/Products';

const Home = () => {
  return (
    <>
      <section className='hero py-14'>
        <div className='container mx-auto flex items-center justify-between'>
          <div className='w-1/2'>
            <h6 className='text-lg'><em>Are You Hungry?</em></h6>
            <h1 className='text-3xl md:text-6xl font-bold'>Don't Wait!</h1>
            <button className='px-6 py-2 text-white font-bold bg-yellow-500 hover:bg-yellow-600 rounded-full mt-4'>Order Now</button>
          </div>
          <div className='w-1/2'>
            <img className='w-4/5' src='/images/pizza.png' alt='Hero-Img' />
          </div>
        </div>
      </section>

      <section className='pt-6 pb-20'>
        <Products />
      </section>
    </>
  );
};

export default Home;
