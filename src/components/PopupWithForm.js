import React from "react";

const PopupWithForm = ({ name, title, button, isOpen, onClose, onSubmit, isValid, children }) => {
    return (
        <div className={`popup ${isOpen && 'popup_is-opened'}`}>
            <form className="popup__container" name={name} noValidate onSubmit={onSubmit}>
                <button type="button" className="popup__close-btn" aria-label="Закрыть" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                {children}
                <button type="submit" className={`popup__save-btn ${!isValid && 'popup__save-btn_disabled'}`} disabled={!isValid && true}>{button}</button>
            </form>
        </div>
    );
};

export default PopupWithForm;