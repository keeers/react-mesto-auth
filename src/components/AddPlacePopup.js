import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {

    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');
    const [inputNameValid, setInputNameValid] = React.useState(false);
    const [inputLinkValid, setInputLinkValid] = React.useState(false);
    const [inputNameValidationMessage, setInputNameValidationMessage] = React.useState('');
    const [inputLinkValidationMessage, setInputLinkValidationMessage] = React.useState('');
    const [inputsValid, setInputsValid] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ name: cardName, link: cardLink });
    };

    function handleNameChange(e) {
        const target = e.target;
        const targetValidity = target.validity.valid;
        setCardName(target.value);
        targetValidity ? setInputNameValid(true) : setInputNameValid(false);
        targetValidity ? setInputNameValidationMessage('') : setInputNameValidationMessage(target.validationMessage);
    };

    function handleLinkChange(e) {
        const target = e.target;
        const targetValidity = target.validity.valid;
        setCardLink(target.value);
        targetValidity ? setInputLinkValid(true) : setInputLinkValid(false);
        targetValidity ? setInputLinkValidationMessage('') : setInputLinkValidationMessage(target.validationMessage);
    };

    React.useEffect(() => {
        inputLinkValid && inputNameValid ? setInputsValid(true) : setInputsValid(false);
    }, [inputLinkValid, inputNameValid])

    React.useEffect(() => {
        setCardName('');
        setCardLink('');
        setInputNameValid(false);
        setInputNameValidationMessage('')
        setInputLinkValid(false);
        setInputLinkValidationMessage('')
    }, [isOpen]);

    return (
        <PopupWithForm type='add-card' name='addForm' title='Новое место' button='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isValid={inputsValid}>
            <div className="popup__section">
                <input type="text" className="popup__input popup__input_type_title" name="titleInput"
                    placeholder="Название" required minLength="2" maxLength="30" onChange={handleNameChange} value={cardName || ''} />
                <span className={`popup__input-error ${!inputsValid && 'popup__input-error_active'}`}>{inputNameValidationMessage}</span>
            </div>
            <div className="popup__section">
                <input type="url" className="popup__input popup__input_type_link" name="linkInput" required
                    placeholder="Ссылка на картинку" onChange={handleLinkChange} value={cardLink || ''} />
                <span className={`popup__input-error ${!inputsValid && 'popup__input-error_active'}`}>{inputLinkValidationMessage}</span>
            </div>
        </PopupWithForm >
    )
}

export default AddPlacePopup;