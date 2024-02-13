import { Input, Button, Spinner } from '@material-tailwind/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const doLoginHandler = () => {
    setIsLoading(true);

    axios.post('http://localhost:9000/api/auth').then(() => {
      navigate('/list', { replace: true });
      setIsLoading(false);
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <section className="flex justify-center flex-col">
        <img
          width={60}
          className="mb-4 m-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/0/05/Meal_ready.svg"
        />
        <Input label="Username" value="john@doe.com" onChange={() => null} />
        <br />
        <Input type="password" label="Username" value="123456" onChange={() => null} />
        <br />
        <Button onClick={doLoginHandler}>{isLoading ? <Spinner className="h-5 w-full" /> : 'Signin'}</Button>
      </section>
    </div>
  );
}

export default SignIn;
