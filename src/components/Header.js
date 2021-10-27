import React from "react";
import { Link } from "react-router-dom";
import headerLogo from '../images/header__logo.svg';
import headerMenu from '../images/header__menu.svg';
import headerClose from '../images/close__button_s.svg'

const Header = ({ type, text, loggedIn, onLogout }) => {

    const [isClicked, setIsClicked] = React.useState(false);

    function handleClick() {
        setIsClicked(!isClicked);
    };

    return (
        <header className="header">
            {loggedIn && isClicked &&
                <div className="header__menu">
                    <p className="header__menu-text">{text}</p>
                    <p onClick={onLogout} className='header__menu-text link'>Выйти</p>
                </div>
            }
            <div className="header__section">
                <Link to='/' className="link" href="#" target="_blank">
                    <img src={headerLogo} className="header__logo" alt="Место Россия" />
                </Link>
                {!loggedIn && <Link to={`/${type}`} className='link header__link'>{text}</Link >}

                {loggedIn &&
                    <div className="header__logout">
                        <button className="header__button" onClick={handleClick}><img src={isClicked ? headerClose : headerMenu} alt="Развернуть меню" /> </button>
                        <p className="header__email">{text}</p>
                        <p onClick={onLogout} className="header__exit link">Выйти</p>
                    </div>
                }
            </div>

        </header >
    );
};

export default Header;