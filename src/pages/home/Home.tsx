import { FC, ReactNode, useEffect } from 'react';
import Header from '../../components/common/Header';
import RecipeListCards from '../../components/recipe/RecipeListCards';
import { useAuth } from '../../context/AuthContext';
import style from './home.module.scss';

const Home: FC<{ children: ReactNode; }> = ({ children }) => {

  const { user } = useAuth();

  useEffect(() => {
  }, [user]);


  return (
    <div className={`${style.home_container}`}>
      <Header />
      Home
      {children}
      <RecipeListCards />
    </div>
  );
};

export default Home;
