import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '../../config/routes';

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(routes)}
      fallbackElement={<p>Loading...</p>}
    />
  )
}