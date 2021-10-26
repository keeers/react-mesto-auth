import React from "react";
import EntryPageForm from "./EntryPageForm";

const Register = ({ onRegister }) => {

    const [userData, setUserData] = React.useState({
        password: '',
        email: ''

    });

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            return;
        };
        onRegister(userData.password, userData.email);
    };

    return (
        <EntryPageForm name='registerForm' title='Регистрация' button='Зарегистрироваться' type='register' isValid={true} onSubmit={handleSubmit}>
            <div className="popup__section popup__section_type_black">
                <input type="text" className="popup__input popup__input_type_black" name="email" placeholder="Email"
                    required minLength="2" maxLength="40" value={userData.email || ''} onChange={handleChange} />
            </div>
            <div className="popup__section popup__section_type_black">
                <input type="password" className="popup__input popup__input_type_black" name="password"
                    placeholder="Пароль" required minLength="2" maxLength="200" value={userData.password || ''} onChange={handleChange} />
            </div>
        </EntryPageForm>
    );
};

export default Register;