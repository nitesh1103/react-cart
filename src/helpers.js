
export const getCart = () => {
  return new Promise((resolve, reject) => {
    const _cart = window.localStorage.getItem('cart');
    resolve(_cart);
  });
};

export const storeCart = (_cart) => {
  window.localStorage.setItem('cart', JSON.stringify(_cart));
};
