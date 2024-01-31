import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DishCard from '../components/dishcard';
import {
  getDishes,
  selectDishes,
  selectRestaurant,
} from '../store/restaurant/restaurantSlice';

const Dishes = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const dishes = useSelector(selectDishes);
  const rest = useSelector(selectRestaurant);

  useEffect(() => {
    dispatch(getDishes(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, rest]);

  return (
    <div className='flex flex-col gap-4'>
      {dishes?.map((item) => (
        <div key={item.dish_id}>
          <DishCard data={item} />
        </div>
      ))}
    </div>
  );
};

export default Dishes;
