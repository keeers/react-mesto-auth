import React from "react";

const ImagePopup = ({ card, isOpen, onClose }) => {
    return (
        <div className={`popup ${isOpen && 'popup_is-opened'}`}>
            <div className="popup__viewbox">
                <button type="button" className="popup__close-btn popup__close-btn_type_s" aria-label="Закрыть" onClick={onClose}></button>
                <figure className="popup__figure">
                    <img className="popup__image" src={card.cardLink} alt={card.cardName} />
                    <figcaption className="popup__caption">{card.cardName}</figcaption>
                </figure>
            </div>
        </div>
    );
};

export default ImagePopup;