import { useEffect, useState } from 'react';
import Topbar from '../components/App/Topbar';
import Title from '../components/Typography/Title';
import Wrapper from '../components/Wrapper/Wrapper';
import { Input, Button, Select, Option } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useQuery } from '../hooks/useQuery';

function RegisterMealForm() {
  const query = useQuery();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [calories, setCalories] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>();
  const [categories, setCategories] = useState<any[]>([]);
  const [validMeal, setValidMeal] = useState<boolean>(false);

  const addMeal = () => {
    axios
      .post(`http://localhost:9000/api/meal`, {
        name: name || query.get('name'),
        description,
        categoryId,
        calories,
        image,
      })
      .then(() => {
        toast.success('Meal added successfully!', { position: toast.POSITION.BOTTOM_RIGHT });
      });
  };

  useEffect(() => {
    setValidMeal(!!name && !!description && !!categoryId && !!calories && !!image);
  }, [name, description, categoryId, calories, image]);

  useEffect(() => {
    const _name = query.get('name');

    if (_name) {
      setName(_name);
    }
    axios.get('http://localhost:9000/api/meal/category').then((response) => {
      setCategories(response.data);
    });
  }, [query]);

  return (
    <Wrapper>
      <main className="pt-10">
        <Topbar logo={true} />

        <section className="">
          <div className="flex-1 text-center justify-center align-center">
            <Title>Register a Meal</Title>
            <p className="mb-3 text-blue-gray-400 font-thin">
              Here you can add a public Meal. This Meal will be accessible for using for anyone who wants to.
            </p>

            <>
              <div className="relative">
                <Input label="Name" onChange={(e) => setName(e.target.value)} value={name} />
              </div>
              <br />
              <Input min="1" label="Description" onChange={(e) => setDescription(e.target.value)} />
              <br />
              <Select onChange={(e: any) => setCategoryId(parseInt(e))} label="Meal Category">
                {categories.map((category) => (
                  <Option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </Option>
                ))}
              </Select>

              <br />
              <Input type="number" min="1" label="Calories" onChange={(e) => setCalories(parseInt(e.target.value))} />

              <br />
              <Input label="Meal Image (URL)" onChange={(e) => setImage(e.target.value)} />

              <br />
              <Button onClick={() => addMeal()} className="w-full mb-4" disabled={!validMeal}>
                Add
              </Button>
            </>
          </div>
        </section>
      </main>
      <ToastContainer />
    </Wrapper>
  );
}

export default RegisterMealForm;
