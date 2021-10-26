import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {

    const [avatar, setAvatar] = React.useState('');
    const [inputValid, setInputValid] = React.useState(false);
    const [inputValidationMessage, setInputValidationMessage] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar
        });
    };

    function handleChange(e) {
        const target = e.target;
        const targetValidity = target.validity.valid;
        setAvatar(target.value);
        targetValidity ? setInputValid(true) : setInputValid(false);
        targetValidity ? setInputValidationMessage('') : setInputValidationMessage(target.validationMessage);
    };

    React.useEffect(() => {
        setAvatar('');
        setInputValid(false);
        setInputValidationMessage('')
    }, [isOpen]);

    return (
        <PopupWithForm name='editAvatarForm' title='Обновить аватар' button='Сохранить' isOpen={isOpen} onClose={onClose} isValid={inputValid} onSubmit={handleSubmit}>
            <div className="popup__section">
                <input type="url" className="popup__input popup__input_type_link" name="linkInput" required
                    placeholder="Ссылка на картинку" onChange={handleChange} value={avatar || ''} />
                <span className={`popup__input-error ${!inputValid && 'popup__input-error_active'}`}>{inputValidationMessage}</span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;