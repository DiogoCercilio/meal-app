import { Input, Button, Textarea } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { USER_ID } from '../../pages/ListMeal';
import { NavLink } from 'react-router-dom';
import { Meal, MealFormProps, UserMeal } from '../../models/MealInterface';
import { ToastContainer, toast } from 'react-toastify';

function MealForm({ data, onChange }: MealFormProps) {
  const [meals, setMeals] = useState([]);
  const [mealId, setMealId] = useState<number>(data?.mealId);
  const [quantity, setQuantity] = useState<number>(data?.quantity);
  const [details, setDetails] = useState<string>(data?.details);
  const [unitMeasure, setUnitMeasure] = useState(data?.unitMeasure);
  const [mealsCached, setMealsCached] = useState([]);
  const [search, setSearch] = useState(data?.name);
  const [isSearching, setIsSearching] = useState(false);
  const [validMeal, setValidMeal] = useState(false);

  const searchMeal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsSearching(!!e.target.value.length);
    setMeals(
      mealsCached.filter((m: Meal) => {
        return new RegExp(`${e.target.value}`, 'gi').test(m.name);
      }),
    );
  };

  const onSearch = (meal: Meal) => {
    setSearch(meal.name);
    setIsSearching(false);
  };

  const addMeal = () => {
    const body: UserMeal = { mealId, quantity, unitMeasure, details, userId: USER_ID };
    const action = !!data?.name ? axios.put : axios.post;

    if (!!data?.name) {
      body.id = data.id;
    }

    action(`http://localhost:9000/api/user-meal`, body)
      .then(() => {
        onChange();
      })
      .catch((err) => {
        toast.error(err.response?.data || err.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:9000/api/meal`).then((response) => {
      setMeals(response.data);
      setMealsCached(response.data);
    });
  }, []);

  useEffect(() => {
    const item: any = meals.find((m: Meal) => m.name === search);
    setMealId(item?.id);
    setValidMeal(item?.name && quantity && unitMeasure?.length);
  }, [search, quantity, unitMeasure, meals]);

  return (
    <>
      <div className="relative">
        <Input label="Name" onChange={searchMeal} value={search} />

        <br />

        {isSearching && (
          <div className="absolute bg-white shadow-lg p-2 w-full" style={{ zIndex: 1 }}>
            {meals.map((meal: Meal) => (
              <div
                key={meal.id}
                className="flex shadow-sm p-1 mb-1 items-center cursor-pointer hover:bg-gray-100"
                onClick={() => onSearch(meal)}
              >
                <img width={40} src={meal.image} alt="" />
                <p key={meal.id} className="ml-2">
                  {meal.name}
                </p>
              </div>
            ))}
            {!meals.length && (
              <div className="flex items-center">
                <small>We don&apos;t have this meal in our database. Would you like to</small>
                <small className="text-blue-400 font-medium hover:text-blue-600 cursor-pointer underline ml-1">
                  <NavLink to={`/meals/form?name=${search}`}> Add it?</NavLink>
                </small>
              </div>
            )}
          </div>
        )}
      </div>

      <Textarea
        value={details}
        onChange={(e) => setDetails(e.currentTarget.value)}
        placeholder={'Describe the details of the Meal (Ex: Today I ate a Big Mac with my girfriend)'}
      />

      <br />
      <Input
        type="number"
        min="1"
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />

      <br />
      <Input label="Unit Measure" value={unitMeasure} onChange={(e) => setUnitMeasure(e.target.value)} />

      <br />
      <Button onClick={() => addMeal()} className="w-full mb-4" disabled={!validMeal}>
        {data?.name ? 'Edit' : 'Add'}
      </Button>
      <ToastContainer />
    </>
  );
}

export default MealForm;
