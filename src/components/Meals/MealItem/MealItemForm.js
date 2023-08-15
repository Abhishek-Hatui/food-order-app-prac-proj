import { useState, useRef } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
const MealItemForm = (props) => {
  const inputAmountRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputAmountRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddCart(enteredAmountNumber);

  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputAmountRef}
        label="Amount"
        input={{
          step: '1',
          defaultValue: '1',
          min: '1',
          max: '5',
          type: 'number',
          id: 'amount_' + props.id,
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter valid amount (1-5)</p>}
    </form>
  );
};
export default MealItemForm;
