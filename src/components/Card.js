import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ id, link, name, likes, owner, onDeleteCard, onCardClick, onCardLike }) => {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = currentUser._id === owner._id;
    const isLiked = likes.some((user) => user._id === currentUser._id);

    function handleClick() {
        onCardClick({ cardLink: link, cardName: name })
    };

    function handleLikeClick() {
        onCardLike({ likes, id });
    };

    function handleCardDelete() {
        onDeleteCard(id)
    }

    return (
        <article className="card">
            <img className="card__image" src={link} alt={name} onClick={handleClick} />
            {isOwn ? <button type="button" aria-label="Удалить" className="card__delete-btn" onClick={handleCardDelete}></button> : <button type="button" aria-label="Удалить" className="card__delete-btn card__delete-btn_disabled" disabled onClick={handleCardDelete}></button>}
            <div className="card__rectangle">
                <h2 className="card__title">{name}</h2>
                <div className="card__like-section">
                    {isLiked ? <button type="button" aria-label="Нравится" className="card__like-btn card__like-btn_is-active" onClick={handleLikeClick}></button> : <button type="button" aria-label="Нравится" className="card__like-btn" onClick={handleLikeClick}></button>}
                    <p className="card__like">{likes.length}</p>
                </div>
            </div>
        </article>
    );
};

export default Card;