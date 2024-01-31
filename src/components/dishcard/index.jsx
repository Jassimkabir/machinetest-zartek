import { useDispatch } from 'react-redux';
import { setQuantity } from '../../store/restaurant/restaurantSlice';

/* eslint-disable react/prop-types */
const DishCard = ({ data }) => {
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    dispatch(
      setQuantity({
        id: data.dish_id,
        quantity: data.quantity - 1,
      })
    );
  };

  const increaseQuantity = () => {
    dispatch(setQuantity({ id: data.dish_id, quantity: data.quantity + 1 }));
  };

  return (
    <div className='w-full flex justify-between gap-4 border-b pb-4'>
      <div className='w-full flex flex-col justify-between gap-4 items-start'>
        <div className='w-full flex flex-col gap-2'>
          <div className='flex items-center gap-3'>
            <TypeIndicator type={data.dish_Type} />
            <h1 className='text-lg font-medium'>{data.dish_name}</h1>
          </div>
          <div className='flex justify-between items-center text-sm'>
            <span className='font-medium'>
              {data.dish_currency} {data.dish_price}
            </span>
            <span>{data.dish_calories} Calories</span>
          </div>
        </div>
        <span className='text-sm text-gray-500'>{data.dish_description}</span>
        {data.dish_Availability && (
          <div className='w-36 flex justify-between items-center bg-green-600 rounded-full text-white py-1 font-medium'>
            <button
              className='w-full text-center disabled:opacity-50 disabled:text-gray-200'
              onClick={decreaseQuantity}
              disabled={!data.quantity}
            >
              -
            </button>
            <span>{data.quantity}</span>
            <button className='w-full' onClick={increaseQuantity}>
              +
            </button>
          </div>
        )}
        {data.addonCat.length > 0 ? (
          <span className='text-red-600 text-sm'>Customization available</span>
        ) : !data.dish_Availability ? (
          <span className='text-red-600 text-sm'>Not available</span>
        ) : null}
      </div>
      <div className='w-60 h-40 max-sm:w-32 max-sm:h-24'>
        <img
          className='w-full h-full object-cover rounded-lg'
          src={data.dish_image}
          alt={data.dish_name}
        />
      </div>
    </div>
  );
};

const TypeIndicator = ({ type }) => {
  return (
    <div
      className={`w-4 h-4 min-w-4 min-h-4 border-2 flex justify-center items-center ${type === 1 ? 'border-red-600' : 'border-green-600'}`}
    >
      <div
        className={`w-2 h-2 rounded-full ${type === 1 ? 'bg-red-600' : 'bg-green-600'}`}
      ></div>
    </div>
  );
};

export default DishCard;
