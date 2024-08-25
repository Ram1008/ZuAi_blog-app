import { useState, useContext } from 'react';
import './Layout.scss';
import SearchBar from '../../components/searchBar/SearchBar';
import LoginModal from '../../components/loginModal/LoginModal';
import RegisterModal from '../../components/registerModal/RegisterModal';
import authContext from '../../contexts/auth/authContext'; 

const Layout = ({ heading, buttonLabel, buttonClick, children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const { user, logoutUser } = useContext(authContext); // Use authContext

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="layout__container">
      <header className="layout__header">
        <div className="layout__header-logo">
        </div>
        <div className='layout__header-button-container'>
          {!user ? (
            <>
              <button onClick={handleLoginClick}>Login</button>
              <button onClick={handleRegisterClick}>Register</button>
            </>
          ) : (
            <button onClick={logoutUser}>Logout</button>
          )}
        </div>
      </header>
      <div className="layout__body">
        <h1>{heading}</h1>
        <div className="layout__body-header">
          <SearchBar/>
          <button onClick={buttonClick}>{buttonLabel}</button>
        </div>
        <hr />
        {children}
      </div>

      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
      {isRegisterModalOpen && <RegisterModal onClose={closeRegisterModal} />}
    </div>
  );
};

export default Layout;
