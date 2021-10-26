import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onDeleteCard, onCardClick, initialCards, onCardLike, onCardDelete }) => {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-box" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar}
                        alt="Аватар пользователя" />
                </div>
                <div className="profile__info">
                    <div>
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                    <button type="button" aria-label="Изменить" className="profile__edit-btn" onClick={onEditProfile}></button>
                </div>
                <button type="button" aria-label="Добавить" className="profile__add-btn" onClick={onAddPlace}></button>
            </section>
            <section className="cards">
                {initialCards.map(({ _id, link, name, likes, owner }) => (
                    <Card key={_id} id={_id} link={link} name={name} likes={likes} owner={owner} onDeleteCard={onDeleteCard} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                ))}
            </section>
        </main>
    );
};

export default Main;