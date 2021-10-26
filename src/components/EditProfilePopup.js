import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
    const [inputNameValid, setInputNameValid] = React.useState(false);
    const [inputDescriptionValid, setInputDescriptionValid] = React.useState(false);
    const [inputNameValidationMessage, setInputNameValidationMessage] = React.useState('');
    const [inputDescriptionValidationMessage, setInputDescriptionValidationMessage] = React.useState('');
    const [inputsValid, setInputsValid] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    };

    function handleNameChange(e) {
        const target = e.target;
        const targetValidity = target.validity.valid;
        setName(e.target.value);
        targetValidity ? setInputNameValid(true) : setInputNameValid(false);
        targetValidity ? setInputNameValidationMessage('') : setInputNameValidationMessage(target.validationMessage);
    };

    function handleDescriptionChange(e) {
        const target = e.target;
        const targetValidity = target.validity.valid;
        setDescription(e.target.value);
        targetValidity ? setInputDescriptionValid(true) : setInputDescriptionValid(false);
        targetValidity ? setInputDescriptionValidationMessage('') : setInputDescriptionValidationMessage(target.validationMessage);
    };

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        setInputNameValid(true);
        setInputDescriptionValid(true);
    }, [currentUser, isOpen]);

    React.useEffect(() => {
        inputDescriptionValid && inputNameValid ? setInputsValid(true) : setInputsValid(false);
    }, [inputDescriptionValid, inputNameValid]);

    return (
        <PopupWithForm name='editForm' title='Редактировать профиль' button='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isValid={inputsValid}>
            <div className="popup__section">
                <input type="text" className="popup__input popup__input_type_name" name="nameInput" placeholder="Имя"
                    required minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange} />
                <span className={`popup__input-error ${!inputsValid && 'popup__input-error_active'}`}>{inputNameValidationMessage}</span>
            </div>
            <div className="popup__section">
                <input type="text" className="popup__input popup__input_type_job" name="jobInput"
                    placeholder="Вид деятельности" required minLength="2" maxLength="200" value={description || ''} onChange={handleDescriptionChange} />
                <span className={`popup__input-error ${!inputsValid && 'popup__input-error_active'}`}>{inputDescriptionValidationMessage}</span>
            </div>
        </PopupWithForm>
    )
};

export default EditProfilePopup;