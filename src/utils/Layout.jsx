import { Outlet } from 'react-router-dom';
import Header from '../components/header';

const Layout = () => {
  return (
    <>
      <Header />
      <div className='container mx-auto p-4'>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
