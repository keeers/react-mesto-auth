import { apiURL, apiToken } from './utils';

class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        } return Promise.reject(`Ошибка: ${res.status}`)
    };

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        })
            .then(res => this._getResponse(res));
    };

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        })
            .then(res => this._getResponse(res));
    };

    setUserInfo(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            },
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        }).then(res => this._getResponse(res));
    };

    addNewCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            },
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        }).then(res => this._getResponse(res));
    };

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        }).then(res => this._getResponse(res));
    };

    changeLikeCardStatus(id, like) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            }
        }).then(res => this._getResponse(res));
    };

    setAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': this._headers["Content-Type"]
            },
            body: JSON.stringify({
                avatar: link
            })
        }).then(res => this._getResponse(res));
    };

}

const api = new Api({
    baseUrl: apiURL,
    headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
    }
});

export default api;
