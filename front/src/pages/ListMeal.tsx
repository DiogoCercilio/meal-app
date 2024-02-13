import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import Topbar from '../components/App/Topbar';
import Title from '../components/Typography/Title';
import Wrapper from '../components/Wrapper/Wrapper';
import MealItem from '../components/MealItem/MealItem';
import axios from 'axios';
import Dialog from '../components/Dialog/Dialog';
import MealForm from '../components/MealForm/MealForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserMeal } from '../models/MealInterface';

export const USER_ID = 1; // Fake User...

function ListMeal() {
  const [meals, setMeals] = useState<UserMeal[]>([]);
  const [open, setOpen] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [editingData, setEditingData] = useState();

  const handleOpen = () => {
    setOpen(!open);
  };

  const onMealChange = (res: any) => {
    if (res && res.action === 'excludeConfirmed') {
      toast.success('Meal deleted successfully!', { position: toast.POSITION.BOTTOM_RIGHT });
      setIsRefresh(!isRefresh);
    }
    if (res && res.action === 'openEdition') {
      setIsRefresh(!isRefresh);
      setEditingData(res.meal);
      handleOpen();
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:9000/api/user-meal?userId=${USER_ID}`).then((response) => {
      setMeals(response.data);
    });
  }, [open, isRefresh]);

  return (
    <Wrapper>
      <main className="pt-10">
        <Topbar logo={false} />

        <section className="">
          <div className="flex align-center justify-center relative">
            <div className="flex-1 text-center justify-center align-center">
              <img
                width={100}
                className="m-auto mb-4"
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Meal_ready.svg"
              />
              <Title>My Meal List</Title>
            </div>

            <div className="w-30 absolute right-0 top-10">
              <Button onClick={handleOpen}>Add a Meal</Button>
            </div>
          </div>

          <div className="mt-5">
            {meals.map((meal: any) => (
              <MealItem key={meal.id} data={meal} onChange={onMealChange} />
            ))}
            {!meals.length && <p className="pt-3 text-center text-blue-gray-200 mt-20">No Meals found :(</p>}
          </div>
        </section>

        {!!meals.length && (
          <h4 className="text-xl m-auto text-center block mt-10 text-blue-gray-500">
            Total: {meals.map((i: any) => !!i.calories && i.calories * i.quantity).reduce((a: any, b: any) => a + b, 0)}{' '}
            calories
          </h4>
        )}
      </main>

      <Dialog
        handleOpen={handleOpen}
        open={open}
        data={{
          title: `${editingData ? 'Edit' : 'Register'} a Meal`,
          content: <MealForm onChange={() => setOpen(false)} data={editingData} />,
        }}
        size="xs"
      />
      <ToastContainer />
    </Wrapper>
  );
}

export default ListMeal;
