import { useEffect, useState } from 'react';
import Topbar from '../components/App/Topbar';
import Title from '../components/Typography/Title';
import Wrapper from '../components/Wrapper/Wrapper';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import MealItemCard from '../components/MealItemCard/MealItemCard';
import MealItemPublic from '../components/MealItemPublic/MealItemPublic';
import { Button } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';

function PublicMealList() {
  const [meals, setMeals] = useState<any[]>([]);
  const [mealCategories, setMealCategories] = useState<any>([]);

  const onClickCategoryHandler = (category: number) => {
    setMeals([]);
    axios.get(`http://localhost:9000/api/meal?category=${category.id}`).then((res) => {
      setMeals(res.data);
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:9000/api/meal/category`).then((res) => {
      setMealCategories(res.data);
    });
  }, []);

  return (
    <Wrapper>
      <main className="pt-10">
        <Topbar logo={true} />

        <section className="">
          <div className="flex-1 text-center justify-center align-center">
            <div className="flex justify-between mt-4">
              <div className="flex-1 ml-20">
                <Title>Public Meals</Title>
                <p className="mb-3 text-blue-gray-400 font-thin">All available Meals</p>
              </div>

              <div>
                <NavLink to="/meals/form">
                  <Button>Add a public Meal</Button>
                </NavLink>
              </div>
            </div>

            <div className="flex my-4 justify-around">
              {mealCategories.map((category: any) => (
                <MealItemCard key={category.id} category={category} onClick={onClickCategoryHandler} />
              ))}
            </div>

            <div className="flex flex-col">
              {meals.map((meal: any) => (
                <MealItemPublic key={meal.id} data={meal} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <ToastContainer />
    </Wrapper>
  );
}

export default PublicMealList;
