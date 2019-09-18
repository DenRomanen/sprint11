import { Api } from "./api";
import { url, token } from "./index";

class Card {
  constructor(name, link, likeLength, idCard, developerName, likesName) {
    this.name = name;
    this.link = link;
    this.idCard = idCard;
    this.likesLength = likeLength;
    this.developerName = developerName;
    this.likesName = likesName;
    this.cardDom = this.create();
    this.cardDom.addEventListener("click", this.like);
    this.cardDom.addEventListener("click", this.remove);
  }
  create() {
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");
    placeCard.id = this.idCard;

    const placeCardImage = document.createElement("div");
    placeCardImage.classList.add("place-card__image");
    placeCardImage.style.backgroundImage = "url(" + this.link + ")";
    placeCard.appendChild(placeCardImage);

    const placeCardDeleteIcon = document.createElement("button");
    placeCardDeleteIcon.classList.add("place-card__delete-icon");
    placeCardImage.appendChild(placeCardDeleteIcon);

    const placeCardDescription = document.createElement("div");
    placeCardDescription.classList.add("place-card__description");
    placeCard.appendChild(placeCardDescription);

    const placeCardName = document.createElement("h3");
    placeCardName.classList.add("place-card__name");
    placeCardName.textContent = this.name;
    placeCardDescription.appendChild(placeCardName);

    const likeIconAndNumber = document.createElement("div");
    likeIconAndNumber.classList.add("place-card__like-number");
    placeCardDescription.appendChild(likeIconAndNumber);

    const placeCardLikeIcon = document.createElement("button");
    placeCardLikeIcon.classList.add("place-card__like-icon");
    likeIconAndNumber.appendChild(placeCardLikeIcon);

    const placeCardLikeNumber = document.createElement("div");
    placeCardLikeNumber.classList.add("place-card__number");
    placeCardLikeNumber.textContent = this.likesLength;
    likeIconAndNumber.appendChild(placeCardLikeNumber);
    return placeCard;
  }

  like(event) {
    if (event.target.classList.contains("place-card__like-icon")) {
      const placeCard = event.target.parentNode.parentNode.parentNode;
      const likesOnServer = event.target.parentNode.querySelector(
        ".place-card__number"
      );

      const doLike = new Api(url, token, placeCard.id); // Добавление лайка
      // удаление лайка
      let activeLike = event.target.classList.toggle(
        "place-card__like-icon_liked"
      );
      if (activeLike) {
        doLike.likeCard().then(result => {
          likesOnServer.textContent = result.likes.length;
        });
      } else {
        doLike.delLike().then(result => {
          likesOnServer.textContent = result.likes.length;
        });
      }
    }
  }

  remove(event) {
    if (event.target.classList.contains("place-card__delete-icon")) {
      const delIcon = event.target;
      const imgCard = delIcon.parentNode;
      const placeCard = imgCard.parentNode;

      let result = window.confirm(
        "Вы действительно хотите удалить эту картинку?"
      );
      if (result) {
        const delCardApi = new Api(url, token, placeCard.id);
        delCardApi.delCard().then(res => {
          if (res.ok) {
            placeCard.parentNode.removeChild(placeCard);
          } else {
            alert("Это не моя картинка!");
          }
        });
      }
    }
  }
}
export { Card };
