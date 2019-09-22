class Api {
  constructor(url, token, ipCards) {
    this.url = url;
    this.token = token;
    this.ipCards = ipCards;
  }
  getProfile() {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: { authorization: `${this.token}` }
    })
      .then(res => {
        if (res.ok) {
          return Promise.resolve(res.json());
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })

      .catch(err => {
        console.log(err);
      });
  }
  getCards() {
    return fetch(`${this.url}/cards`, {
      method: "GET",
      headers: { authorization: `${this.token}` }
    })
      .then(res => {
        if (res.ok) {
          return Promise.resolve(res.json());
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })

      .catch(err => {
        console.log(err);
      });
  }
  postCards(data) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: {
        authorization: `${this.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return Promise.resolve(res.json());
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
      });
  }
  delCard() {
    return fetch(`${this.url}/cards/${this.ipCards}`, {
      method: "DELETE",
      headers: {
        authorization: `${this.token}`,
        "Content-Type": "application/json"
      }
    });
  }
  likeCard() {
    // likeCard более читаемо
    return fetch(`${this.url}/cards/like/${this.ipCards}`, {
      method: "PUT",
      headers: {
        authorization: `${this.token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return Promise.resolve(res.json());
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })

      .catch(err => {
        console.log(err);
      });
  }
  delLike() {
    return fetch(`${this.url}/cards/like/${this.ipCards}`, {
      method: "DELETE",
      headers: {
        authorization: `${this.token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return Promise.resolve(res.json());
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })

      .catch(err => {
        console.log(err);
      });
  }
  setAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `${this.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return Promise.resolve(res.json());
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
      });
  }
  updateProfile(data) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

export { Api };
