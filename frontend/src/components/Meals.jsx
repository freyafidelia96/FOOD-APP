import { useState, useEffect, use } from "react";
import MealItem from "./MealItem.jsx";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("http://127.0.0.1:8000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch meals.");
        }

        const data = await response.json();
        setMeals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMeals();
  }, []);

  if (isLoading) {
    return <section>Loading meals...</section>;
  }

  if (error) {
    return <section>Error: {error}</section>;
  }

  return (
    <section className="grid md:grid-cols-3 justify-center items-stretch gap-4 w-3/4 mx-auto my-10">
      {meals.map((meal) => (
        <MealItem
          key={meal.id}
          name={meal.name}
          imgSrc={meal.image}
          price={meal.price}
          description={meal.description}
          id={meal.id}
        />
      ))}
    </section>
  );
}
