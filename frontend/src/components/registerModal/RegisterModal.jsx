import { useState, useContext } from 'react';
import authContext from '../../contexts/auth/authContext';
import './registerModal.scss';

const RegisterModal = ({ onClose }) => {
    const { registerUser } = useContext(authContext);
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!registerData.name) newErrors.name = 'Name is required';
        if (!registerData.email) newErrors.email = 'Email is required';
        if (!registerData.password) newErrors.password = 'Password is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                await registerUser(registerData.name, registerData.email, registerData.password);
                onClose(); 
            } catch (error) {
                console.error('Error registering user:', error);
            }
        }
    };

    return (
        <div className="modal__overlay" onClick={onClose}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h2>Register</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal__body">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={registerData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={registerData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={registerData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </label>
                </div>
                <div className="modal__footer">
                    <button type="button" onClick={handleSubmit}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
