import Card from '../UI/Card';
import useInput from '../../hooks/use-input';
import classes from './OrderForm.module.css';
const OrderForm = (props) => {
 
  const validateFunction = (value) => value.trim() !== '';

  const {
    value: nameValue,
    isValid: isNameValid,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(validateFunction);

  const {
    value: addressValue,
    isValid: isAddressValid,
    hasError: addressHasError,
    inputChangeHandler: addressChangeHandler,
    blurHandler: addressBlurHandler,
    reset: addressReset,
  } = useInput(validateFunction);

  const isFormValid =
    isNameValid &&
    isAddressValid;

  

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    const userDetails = {
        name: nameValue,
        address: addressValue,
    }
    props.onConfirm(userDetails)
    nameReset();
    addressReset();
    props.reset();
  };

  const nameClasses = nameHasError
    ? [`${classes['form-control']} ${classes.invalid}`]
    : classes['form-control'];
  const addressClasses = addressHasError
    ? [`${classes['form-control']} ${classes.invalid}`]
    : classes['form-control'];

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className={classes['control-group']}>
          <div className={nameClasses}>
            <label htmlFor="name">Enter Name</label>
            <input
              type="text"
              id="name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={nameValue}
            />
            {nameHasError && (
              <p className={classes['error-text']}>Name is empty</p>
            )}
          </div>
          <div className={addressClasses}>
            <label htmlFor="add">Enter Address</label>
            <input
              type="text"
              id="add"
              value={addressValue}
              onChange={addressChangeHandler}
              onBlur={addressBlurHandler}
            />
            {addressHasError && (
              <p className={classes['error-text']}>address is empty</p>
            )}
          </div>
          <div className={classes['form-actions']}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button disabled={!isFormValid}>Confirm Order</button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default OrderForm;
