import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if(action.type === 'RESET'){
    return defaultState;
  }
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    let updatedItems;
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.items[existingItemIndex];

    if (existingItem) {
      const updatedItem = { ...existingItem, amount: existingItem.amount + action.item.amount };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type === 'REMOVE'){
    let updatedItems;
    const existingItemIndex = state.items.findIndex((item)=> item.id === action.id);
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    if(existingItem.amount === 1){
      updatedItems = state.items.filter((item)=> item.id !== action.id);
    }else{
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return{
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  return defaultState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const addItemHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const reset = () => {
    dispatchCartAction({type: 'RESET'});
  }

  const cartContext = {
    totalAmount: cartState.totalAmount,
    items: cartState.items,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    reset
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
