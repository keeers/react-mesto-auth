import React from "react";
import { Link } from "react-router-dom";
import headerLogo from '../images/header__logo.svg';

const Header = ({ type, text, loggedIn, onLogout }) => {

    return (
        <header className="header">
            <div className="header__section">
                <a className="link" href="#" target="_blank">
                    <img src={headerLogo} className="header__logo" alt="Место Россия" />
                </a>
                {!loggedIn && <Link to={`/${type}`} className='link header__link'>{text}</Link >}

                {loggedIn &&
                    <div className="header__logout">
                        <p className="header__email">{text}</p>
                        <p onClick={onLogout} className='header__exit link'>Выйти</p>
                    </div>
                }
            </div>

        </header>
    );
};

export default Header;