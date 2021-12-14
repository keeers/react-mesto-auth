import React from 'react';
import { Route, Redirect } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import api from '../utils/api';
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import InfoToolTip from './InfoToolTip';
import successImage from '../images/successImage.svg';
import failImage from '../images/failImage.svg';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [infoToolTipMessage, setInfoToolMessage] = React.useState('');
  const [infoToolTipType, setInfoToolTipType] = React.useState(false);
  const [infoToolTipImage, setInfoToolTipImage] = React.useState(failImage);
  const [selectedCard, setSelectedCard] = React.useState({ cardLink: '', cardName: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [initialCards, setCards] = React.useState([]);
  const [deletingCardId, setDeletingCardId] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isMenuClicked, setIsMenuClicked] = React.useState(false);

  function handleLogin(password, email) {
    auth.authorize(password, email).then((data) => {
      localStorage.setItem('jwt', data.token)
      setLoggedIn(true);
    }).catch(err => {
      setIsInfoToolTipOpen(true);
      setInfoToolMessage('Что-то пошло не так! Попробуйте еще раз');
      setInfoToolTipType(false);
      setInfoToolTipImage(failImage);
      console.log(err)
    });
  };

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  function handleRegister(password, email) {
    auth.register(password, email).then(() => {
      setInfoToolMessage('Вы успешно зарегистрировались!');
      setInfoToolTipType(true);
      setInfoToolTipImage(successImage);
    }).catch(err => {
      setInfoToolMessage('Что-то пошло не так! Попробуйте еще раз.');
      setInfoToolTipType(false);
      setInfoToolTipImage(failImage);
      console.log(err)
    }).finally(() => setIsInfoToolTipOpen(true));
  };

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt).then(({ data }) => {
        setUserEmail(data.email);
        setLoggedIn(true);
      }).catch(err => console.log(err));
    };
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleDeleteCardClick(id) {
    setIsDeletePopupOpen(true);
    setDeletingCardId(id);
  };

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard({ cardLink: card.cardLink, cardName: card.cardName });
  };

  function handleUpdateUser(userData) {
    api.setUserInfo(userData).then((updatedData) => {
      setCurrentUser(updatedData);
      setIsEditProfilePopupOpen(false);
    }).catch(err => console.log(err));
  };

  function handleUpdateAvatar({ avatar }) {
    api.setAvatar(avatar).then((updatedData) => {
      setCurrentUser(updatedData);
      setIsEditAvatarPopupOpen(false);
    }).catch(err => console.log(err));
  };

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard).then((createdCard) => {
      setCards([createdCard, ...initialCards]);
      setIsAddPlacePopupOpen(false);
    }).catch(err => console.log(err));
  };

  function handleCardLike({ likes, id }) {
    const isLiked = likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === id ? newCard : c));
    }).catch(err => console.log(err));
  };

  function handleCardDeleting(id) {
    api.deleteCard(id).then(() => {
      const updatedCards = initialCards.filter((card) => {
        return card._id !== id
      });
      setCards(updatedCards);
      setIsDeletePopupOpen(false);
      setDeletingCardId('');
    }).catch(err => console.log(err));
  };

  function handleMenuClick() {
    setIsMenuClicked(!isMenuClicked);
  };

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({ cardLink: '', cardName: '' })
  };

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, initialCards]) => {
        setCurrentUser(data)
        setCards(initialCards);
      }).catch(err => console.log(err));
  }, []);

  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape)
  }, []);

  React.useEffect(() => {
    const closeOnClick = (e) => {
      if (e.target.classList.contains('popup')) {
        closeAllPopups();
      }
    };
    document.addEventListener('click', closeOnClick);
    return () => document.removeEventListener('click', closeOnClick)
  }, []);

  return (
    <div className="page">
      {loggedIn && <Header text={userEmail} loggedIn={loggedIn} onLogout={handleLogout} onClick={handleMenuClick} isClicked={isMenuClicked} />}
      <CurrentUserContext.Provider value={currentUser}>
        <ProtectedRoute path='/' loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onDeleteCard={handleDeleteCardClick} onCardClick={handleCardClick} initialCards={initialCards} onCardLike={handleCardLike} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <DeletePlacePopup isOpen={isDeletePopupOpen} onClose={closeAllPopups} onCardDeleting={handleCardDeleting} deletingCardId={deletingCardId} />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
      <Route path="/sign-in">
        <Login onLogin={handleLogin} />
      </Route>
      <Route path="/sign-up">
        <Register onRegister={handleRegister} />
      </Route>
      <Route>
        {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
      </Route>
      <InfoToolTip text={infoToolTipMessage} type={infoToolTipType} image={infoToolTipImage} isOpen={isInfoToolTipOpen} onClose={closeAllPopups} />
      <Footer />
    </div>
  );
}

export default App;
