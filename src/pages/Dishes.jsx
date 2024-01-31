import { useParams } from 'react-router-dom';

const Dishes = () => {
  const { id } = useParams();

  return (
    <div>
      {id}
      <div>Dishes</div>
    </div>
  );
};

export default Dishes;
