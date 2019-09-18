import { Popup } from "./popup";
class PopupProfile extends Popup {
  constructor() {
    super();
    this.body = this.popupProfileBody();
  }
  popupProfileBody() {
    const closeIcon = require("../images/close.svg");
    const body = `<div class="popup">
      <div class="popup__content">
        <img src="${closeIcon}" alt="" class="popup__close" />
        <h3 class="popup__title">Обновить аватар</h3>
        <form class="popup__form" name="avatar">
        <label>
          <input
            id="popup-link"
            type="url"
            name="link"
            class="popup__input popup__input_type_link-url"
            placeholder="Ссылка на аватар"
            autocomplete="off"
            pattern="https://.*"
            required
          />
          <span class="popup__error" id="new-error-link"></span>
          </label>
          <button
            id="popup-button"
             disabled="true"
            class="button popup__button popup__button-avatar"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>`;
    let element = document.createElement("div");
    element.insertAdjacentHTML("beforeend", body.trim());
    return element.firstChild;
  }
  renderPopupProfile() {
    const root = document.querySelector(".root");
    root.appendChild(this.body);
  }
  openPopupProfile() {
    super.openPopup();
  }
  renderLoadingAvatar(isLoading) {
    super.renderLoading(isLoading);
  }
  pathProfileAvatar(form) {
    const formLink = form.elements.link;
    let profile = {
      avatar: formLink.value
    };
    return profile;
  }
}
export { PopupProfile };
