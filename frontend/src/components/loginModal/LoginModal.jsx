import { useState, useContext } from 'react';
import './loginModal.scss';
import authContext from '../../contexts/auth/authContext'; // Import authContext

const LoginModal = ({ onClose }) => {
    const [loginData, setLoginData] = useState({
        email: '', 
        password: ''
    });

    const { loginUser } = useContext(authContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            await loginUser(loginData.email, loginData.password); // Use loginUser to log in
            onClose();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="modal__overlay" onClick={onClose}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h2>Login</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal__body">
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="modal__footer">
                    <button type="button" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
