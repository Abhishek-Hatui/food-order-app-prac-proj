import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from '../Meals/MealItem/MealItem';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError,setHttpError] = useState(null);
  useEffect(() => {
    const fetchVal = async () => {
      const response = await fetch(
        'https://custom-hook-prac-c7cf8-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
      );

      if(!response.ok){
        throw new Error('Something Went Wrong');
      }

      const data = await response.json();
      setMeals(data);
      setIsLoading(false);
    };

    fetchVal().catch(error=>{
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if(isLoading){
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  }

  if(httpError){
    return <section className={classes.MealsError}>
    <p>{httpError}</p>
  </section>
  }

  const mealArray = [];
  for (const key in meals) {
    mealArray.push({
      id: key,
      name: meals[key].name,
      description: meals[key].description,
      price: meals[key].price,
    });
  }

  const mealsList = mealArray.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
