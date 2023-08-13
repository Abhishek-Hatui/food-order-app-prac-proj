import Modal from '../UI/Modal';
import classes from './Cart.module.css';
const Cart = (props) => {
    const cartItems = <ul className={classes['cart-items']}>{[{id: 'c1', name: 'duks', price: '69.99', amount: '3'}].map(item => <li>{item.name}</li>)}</ul>
    return (
        <Modal>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amout</span>
                <span>55</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']}>Cancel</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
}

export default Cart;