import { useReducer } from 'react';

const defaultState = {
  value: '',
  isTouched: false,
};

const reducerFunction = (state, action) => {
  if (action.type === 'INPUT') {
    return { ...state, value: action.value };
  }
  if (action.type === 'BLUR') {
    return { ...state, isTouched: true };
  }
  if(action.type === 'RESET'){
    return defaultState;
  }
  return defaultState;
};

const useInput = (validate) => {
  const [state, dispatch] = useReducer(reducerFunction, defaultState);
  const isValid = validate(state.value);
  const hasError = !isValid && state.isTouched

  const inputChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const blurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({type: 'RESET'});
  }

  return {
    value: state.value,
    hasError,
    isValid,
    inputChangeHandler,
    blurHandler,
    reset
  }
};

export default useInput;
