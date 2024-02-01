import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DishCard from '../components/dishcard';
import { selectRestaurant } from '../store/restaurant/restaurantSlice';

const Dishes = () => {
  const { id } = useParams();

  const restaurant = useSelector(selectRestaurant);

  return (
    <div className='flex flex-col gap-4'>
      {restaurant?.table_menu_list
        .find((category) => category.menu_category_id === id)
        .category_dishes?.map((item) => (
          <div key={item.dish_id}>
            <DishCard data={item} />
          </div>
        ))}
    </div>
  );
};

export default Dishes;
