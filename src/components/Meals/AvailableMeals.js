import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await fetch(
          "https://meals-app-b7c8b-default-rtdb.firebaseio.com/meals.json"
        );
        if (!response.ok) {
          throw new Error("There are something wrong!");
        }
        const meals = await response.json();

        console.log(meals);
        const mealList = [];
        for (const meal in meals) {
          mealList.push({
            id: meal,
            name: meals[meal].name,
            description: meals[meal].description,
            price: meals[meal].price,
          });
        }
        if (mealList.length === 0) {
          console.log(meals);
          throw new Error("There are no meals");
        }
        setMeals(mealList);
        setIsLoading(false);
      } catch (errorMessage) {
        setIsLoading(false);
        setErrorMessage(errorMessage.message);
      }
    };
    fetchHandler();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.name}
      id={meal.name}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {isLoading && <p className={classes.isLoading}>Loading...</p>}
      {mealsList.length === 0 && (
        <p className={classes["text-error"]}>{errorMessage}</p>
      )}
      {mealsList.length > 0 ? (
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      ) : null}
    </section>
  );
};

export default AvailableMeals;
