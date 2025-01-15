// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
import CustomButton from './CustomButton';
import style from './common.module.scss';

const Header = () => {

  // const { logout, user } = useAuth();
  // const navigate = useNavigate();

  const handleLogout = () => {
    // logout();
    // navigate('/login');
  };

  return (
    <div className={`${style.header_container}`}>
      <div className={`${style.header_content}`}>

        <p className={`${style.header_logo}`}>Terrand Food</p>
        <div className={`${style.header_user_logout}`}>
          {/* <p>{user?.name}</p> */}
          <p>Nico</p>
          <CustomButton style={`${style.logout_button}`} text='Logout' fn={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Header;
