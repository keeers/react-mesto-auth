import React from "react";
import PopupWithForm from "./PopupWithForm";

const DeletePlacePopup = ({ isOpen, onClose, onCardDeleting, deletingCardId }) => {

    function handleSubmit(e) {
        e.preventDefault();
        onCardDeleting(deletingCardId);
    }

    return (
        <PopupWithForm name='deleteCardForm' title='Вы уверены?' button='Да' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isValid={true}>
        </PopupWithForm>
    )
}

export default DeletePlacePopup;