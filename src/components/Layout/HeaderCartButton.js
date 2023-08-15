import { useContext, useState, useEffect } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isButtonHigh, setIsButtonHigh] = useState(false);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsButtonHigh(true);
    const timer = setTimeout(() => {
      setIsButtonHigh(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const btnClasses = `${classes.button} ${isButtonHigh ? classes.bump : ''}`;

  return (
    <button className={btnClasses} onClick={props.show}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
