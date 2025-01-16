import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import { useAuth } from '../../context/AuthContext';
import style from './home.module.scss';

const Home: FC = () => {

  const { user } = useAuth();

  useEffect(() => {
  }, [user]);


  return (
    <div className={`${style.home_container}`}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
