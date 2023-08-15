import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state,action) => {
    if(action.type === 'ADD'){
        const updatedItems = [...state.items,action.item];
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultState;
}

const CartProvider = (props) => {

    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultState);

    const addItemHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    }

    const removeItemHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id:id});
    }

    const cartContext = {
        totalAmount :cartState.totalAmount,
        items: cartState.items,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;