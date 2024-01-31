import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import {
  selectCartCount,
  selectRestaurant,
} from '../../store/restaurant/restaurantSlice';
import { StyledNavLink } from './style';

const Header = () => {
  const restaurant = useSelector(selectRestaurant);
  const cartCount = useSelector(selectCartCount);

  return (
    <div className='sticky top-0 shadow-lg z-10 bg-white'>
      <div className='container mx-auto'>
        <div className='p-4 py-4 flex justify-between items-center'>
          <h1 className='font-bold text-lg'>{restaurant?.restaurant_name}</h1>
          <div className='flex justify-between items-center gap-4'>
            <span>My orders</span>
            <div className='relative'>
              <ShoppingCart />
              <div className='p-1 w-5 h-5 flex justify-center items-center bg-red-700 rounded-full absolute top-[-8px] right-[-8px]'>
                <span className='text-white text-xs'>{cartCount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='overflow-auto max-w-full w-full flex items-center gap-1'>
          {restaurant?.table_menu_list?.map((item) => (
            <StyledNavLink
              key={item.menu_category_id}
              className='p-4 text-nowrap border-b-2 border-white hover:border-b-2 hover:border-red-600 transition-all hover:text-red-600'
              to={`/${item.menu_category_id}`}
            >
              {item.menu_category}
            </StyledNavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
