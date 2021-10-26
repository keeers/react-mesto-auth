import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const EntryPageForm = ({ name, title, button, type, onSubmit, isValid, children }) => {
    return (
        <>
            {type === 'register' ? <Header type='sign-in' text='Войти' loggedIn={false} /> : <Header type='sign-up' text='Регистрация' loggedIn={false} />}
            <section className='entrypage'>
                <form className="popup__container popup__container_type_black" name={name} noValidate onSubmit={onSubmit}>
                    <h2 className="popup__title popup__title_type_black">{title}</h2>
                    {children}
                    <button type="submit" className={`popup__save-btn popup__save-btn_type_black ${!isValid && 'popup__save-btn_disabled'}`} disabled={!isValid && true}>{button}</button>
                    {type === 'register' &&
                        <div className="entrypage__section">
                            <p className="entrypage__text">Уже зарегистрированы?</p>
                            <Link to="/sign-in" className="link entrypage__link">Войти</Link>
                        </div>}
                </form>
            </section>
        </>
    );
};

export default EntryPageForm;