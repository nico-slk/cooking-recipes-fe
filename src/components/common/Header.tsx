// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../context/AuthContext';
import CustomButton from './CustomButton';
import style from './common.module.scss';

const Header = () => {

  // const { logout, user } = useAuth();
  const { user } = useAuth();
  // const navigate = useNavigate();

  const handleLogout = () => {
    // logout();
    // navigate('/login');
  };

  return (
    <div className={`${style.header_container}`}>
      <div className={`${style.header_content}`}>

        <Link to="/" >
          <p className={`${style.header_logo}`}>
            <img src={logo} alt="logo" className={`${style.header_logo_img}`} />
          </p>
        </Link>
        <div className={`${style.header_user_logout}`}>
          <Link to="/my-profile" >
            <p>{user?.name}</p>
          </Link>
          <CustomButton style={`${style.logout_button}`} text='Logout' fn={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Header;
