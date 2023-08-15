import React from 'react';
const CartContext = React.createContext({
  totalAmount: 4,
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
