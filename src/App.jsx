import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import Dishes from './pages/Dishes';
import { getRestaurant } from './store/restaurant/restaurantSlice';
import Layout from './utils/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='/:id' element={<Dishes />} />
        <Route index element={<Navigate to={'/11'} />} />
      </Route>
    </>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurant());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
