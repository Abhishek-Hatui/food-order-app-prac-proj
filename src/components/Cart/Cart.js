import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import OrderForm from '../Order/OrderForm';
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [sendingOrderState, setSendingOrder] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [orderSendingError, setOrderSendingError] = useState(null);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${Math.abs(cartCtx.totalAmount.toFixed(2))}`;
  const items = cartCtx.items;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => cartItemAddHandler(item)}
        />
      ))}
    </ul>
  );

  const orderButtonHandler = () => {
    setIsCheckout(true);
  };

  const sendOrder = async (userDetails) => {
    setSendingOrder(true);
    try {
      const response = await fetch(
        'https://custom-hook-prac-c7cf8-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            user: userDetails,
            order: cartCtx.items,
            total: totalAmount,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      setOrderSendingError(error.message);
    }
    setSendingOrder(false);
    setOrderSent(true);
  };

  const modalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amout</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <OrderForm
          onCancel={props.cancel}
          onConfirm={sendOrder}
          reset={cartCtx.reset}
        />
      )}
    </React.Fragment>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.cancel}>
        Cancel
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderButtonHandler}>
          Order
        </button>
      )}
    </div>
  );

  const showOrderErrorContent = (
    <React.Fragment>
      <p>{orderSendingError}</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.cancel}>
          Cancel
        </button>
      </div>
    </React.Fragment>
  );

  const sendingOrderContent = (
    <React.Fragment>
      <p>Your order is processing...</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.cancel}>
          Cancel
        </button>
      </div>
    </React.Fragment>
  );

  const orderSentContent = (
    <React.Fragment>
      <p>Order sent successfully</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.cancel}>
          Cancel
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal cancel={props.cancel}>
      {!orderSent && modalContent}
      {orderSendingError && showOrderErrorContent}
      {sendingOrderState && sendingOrderContent}
      {orderSent && !orderSendingError && orderSentContent}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
