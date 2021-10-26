import React from "react";
import { useHistory } from "react-router-dom";


const InfoToolTip = ({ text, type, image, isOpen, onClose }) => {

    const history = useHistory();

    function handleClick() {
        if (type) {
            history.push('/sign-in')
        };
        onClose();
    };

    return (
        <div className={`popup ${isOpen && 'popup_is-opened'}`}>
            <div className="popup__container popup__container_type_entry">
                <button type="button" className="popup__close-btn" aria-label="Закрыть" onClick={handleClick}></button>
                <img className="popup__image popup__image_type_entry" src={image} alt="Статус обработки запроса" />
                <h2 className="popup__title popup__title_type_entry">{text}</h2>
            </div>
        </div>
    );
};

export default InfoToolTip;
