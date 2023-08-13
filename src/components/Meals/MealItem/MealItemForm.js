import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
const MealItemForm = (props) => (
  <form className={classes.form}>
    <Input
      label="Amount"
      input={{
        step: '1',
        defaultValue: '1',
        min: '1',
        max: '5',
        type: 'number',
        id: 'amount',
      }}
    />
    <button>+ Add</button>
  </form>
);
export default MealItemForm;
