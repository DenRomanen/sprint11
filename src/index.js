import "./style.css";
import { Card } from "../blocks/place-card/place-card";
import { Api } from "../js/api";
import { CardList } from "../blocks/places-list/palce-list";
import { Popup } from "../blocks/popup/popup";
import { PopupProfile } from "../blocks/profile/profile";
import { xxlImage } from "../blocks/image-fullscreen/image-fullscreen";
import { validity } from "../js/validatForm";

// переменные
const serverUrl =
  NODE_ENV === "development"
    ? "http://praktikum.tk/cohort2"
    : "https://praktikum.tk/cohort2";
const root = document.querySelector(".root");

export const url = serverUrl;
export const token = "405e1703-0e09-4ead-ad1e-c5465f11f208";

const api = new Api(url, token);
// получил первоначальный профиль с сервера
api.getProfile().then(result => {
  document.querySelector(".user-info__name").textContent = result.name;
  document.querySelector(".user-info__job").textContent = result.about;
  document.querySelector(".user-info__photo").style.backgroundImage =
    "url(" + result.avatar + ")";
});
// получил карты с сервера
api.getCards().then(result => {
  const cardList = new CardList(document.querySelector(".places-list"), result);
  cardList.render();
});

// создал 2 popup
const popupNew = new Popup(
  "Новое место",
  "new",
  "popup-name",
  "Название",
  "new-error-name",
  "url",
  "Ссылка на картинку",
  "0",
  "",
  "new-error-link",
  "popup-button",
  "+",
  true
);
const popupEdit = new Popup(
  "Редактировать профиль",
  "edit",
  "",
  "Имя",
  "error-name",
  "text",
  "О себе",
  "2",
  "30",
  "error-job",
  "form-edit",
  "Сохранить",
  false
);
const popupProfile = new PopupProfile();

//-----------------
//// слушатели ///
root.addEventListener("click", function(event) {
  // popup изменения аватара
  if (event.target.classList.contains("user-info__photo")) {
    popupProfile.renderPopupProfile();
    popupProfile.openPopupProfile();

    const form = document.forms.avatar;
    form.addEventListener("input", function(event) {
      event.preventDefault();
      const link = form.elements.link;
      const errorLink = form.querySelector("#new-error-link");
      validity.validityForm(form);
      if (event.target === link) {
        validity.validityInputUrl(link, errorLink);
      }
    });
    const submitAvatar = event => {
      event.preventDefault();
      popupProfile.renderLoadingAvatar(true);
      let profileAvatar = popupProfile.pathProfileAvatar(form);

      api.setAvatar(profileAvatar).then(result => {
        document.querySelector(".user-info__photo").style.backgroundImage =
          "url(" + result.avatar + ")";

        popupProfile.renderLoadingAvatar(false); //отмана "загузка..."

        popupNew.closePopup();
        form.reset();
        popupNew.anRenderPopup();
      });

      form.removeEventListener("submit", submitAvatar);
    };
    form.addEventListener("submit", submitAvatar);
  }

  if (event.target.classList.contains("user-info__button")) {
    //работа  с popup NEW
    popupNew.renderPopup();
    popupNew.openPopup();

    const form = document.forms.new;
    // validat----------------

    form.addEventListener("input", function(event) {
      event.preventDefault();

      const name = form.elements.name;
      const link = form.elements.link;
      const errorName = form.querySelector("#new-error-name");
      const errorLink = form.querySelector("#new-error-link");
      validity.validityForm(form);

      if (event.target === name) {
        validity.validityInputEdit(name, errorName);
      }

      if (event.target === link) {
        validity.validityInputUrl(link, errorLink);
      }
    });
    ///-------------- добавление картинки
    const submitNew = event => {
      event.preventDefault();
      popupNew.renderLoadingNew(true); // загрузка
      let profile = popupEdit.postProfile(form);

      // положил на сервер -> отрисовал
      api
        .postCards(profile)
        .then(result => {
          console.log(result);
          const placesList = document.querySelector(".places-list");
          const cardExtra = new Card(
            result.name,
            result.link,
            result.likes.length,
            result._id
          );
          // иконка удаления активна
          const doDelIconActivExtra = cardExtra.cardDom.querySelector(
            ".place-card__delete-icon"
          );
          doDelIconActivExtra.style.display = "block";
          placesList.appendChild(cardExtra.cardDom);
        })
        .then(() => {
          popupNew.renderLoadingNew(false); //отмана "загузка..."

          popupNew.closePopup();
          form.reset();
          popupNew.anRenderPopup();
        });

      form.removeEventListener("submit", submitNew); // Хорошо
    };
    form.addEventListener("submit", submitNew);
  }

  if (event.target.classList.contains("user-info__button-edit")) {
    // работа с popup EDIT
    popupEdit.renderPopup();
    popupEdit.openPopup();
    popupEdit.popupInfoDefault(); // по умолчанию
    const form = document.forms.edit;

    // validat----------------
    form.addEventListener("input", function(event) {
      event.preventDefault();

      const name = form.elements.name;
      const link = form.elements.link;
      const errorName = form.querySelector("#error-name");
      const errorLink = form.querySelector("#error-job");

      validity.validityForm(form);
      if (event.target === name) {
        validity.validityInputEdit(name, errorName);
      }

      if (event.target === link) {
        validity.validityInputEdit(link, errorLink);
      }
    });
    //-------- изменение профиля
    const submitEdit = event => {
      event.preventDefault();
      popupEdit.renderLoading(true); /// "загрузка..."
      //---- Запись на сервер профиля и считывание для отображения
      let profile = popupEdit.patchProfile(form);

      api.updateProfile(profile).then(() => {
        api.getProfile().then(result => {
          document.querySelector(".user-info__name").textContent = result.name;
          document.querySelector(".user-info__job").textContent = result.about;
          document.querySelector(".user-info__photo").style.backgroundImage =
            "url(" + result.avatar + ")";
          popupEdit.closePopup();
          popupEdit.renderLoading(false);
          popupEdit.anRenderPopup();
        });
      });
      //----

      form.removeEventListener("submit", submitEdit);
    };
    form.addEventListener("submit", submitEdit);
  }
  // закрытие
  if (
    event.target.classList.contains("popup__close") &&
    event.target.parentNode.classList.contains("image-fullscreen__content")
  ) {
    xxlImage.fullscreenImageClose(event);
  } else if (
    event.target.classList.contains("popup__close") &&
    document.querySelector(".popup__title").textContent === "Новое место"
  ) {
    popupNew.closePopup();
    popupNew.anRenderPopup();
  } else if (
    event.target.classList.contains("popup__close") &&
    document.querySelector(".popup__title").textContent ===
      "Редактировать профиль"
  ) {
    popupEdit.closePopup();
    popupEdit.anRenderPopup();
  } else if (
    event.target.classList.contains("popup__close") &&
    document.querySelector(".popup__title").textContent === "Обновить аватар"
  ) {
    popupEdit.closePopup();
    popupEdit.anRenderPopup();
  }
  // открытие большой карты
  if (event.target.classList.contains("place-card__image")) {
    xxlImage.fullscreenImageOpen(event);
  }
});
