class Popup {
  constructor(
    textTitle,
    nameForm,
    inputNameId,
    inputNamePlaceholder,
    idPopupErrorName,
    inputType,
    inputLinkPlaceholder,
    inputMinlength,
    inputMaxlength,
    idPopupErrorLink,
    idPopupButton,
    buttonTextcontent,
    btnDefaul
  ) {
    this.body = this.popupBody(
      textTitle,
      nameForm,
      inputNameId,
      inputNamePlaceholder,
      idPopupErrorName,
      inputType,
      inputLinkPlaceholder,
      inputMinlength,
      inputMaxlength,
      idPopupErrorLink,
      idPopupButton,
      buttonTextcontent,
      btnDefaul
    );
  }

  popupBody(
    textTitle,
    nameForm,
    inputNameId,
    inputNamePlaceholder,
    idPopupErrorName,
    inputType,
    inputLinkPlaceholder,
    inputMinlength,
    inputMaxlength,
    idPopupErrorLink,
    idPopupButton,
    buttonTextcontent,
    btnDefaul
  ) {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    const popupContent = document.createElement("div");
    popupContent.classList.add("popup__content");
    popup.appendChild(popupContent);

    const popupClaseImg = document.createElement("img");
    popupClaseImg.classList.add("popup__close");
    popupClaseImg.src = "./images/close.svg";
    popupClaseImg.alt = "close";
    popupContent.appendChild(popupClaseImg);

    const popupTitle = document.createElement("h3");
    popupTitle.classList.add("popup__title");
    popupTitle.textContent = textTitle; //менять (новое место) || (редактировать профиль)
    popupContent.appendChild(popupTitle);

    const popupForm = document.createElement("form");
    popupForm.classList.add("popup__form");
    popupForm.name = nameForm; // менять (new || edit)
    popupContent.appendChild(popupForm);

    const labelName = document.createElement("label");
    popupForm.appendChild(labelName);

    const inputName = document.createElement("input");
    inputName.classList.add("popup__input");
    inputName.classList.add("popup__input_type_name");
    inputName.id = inputNameId; //менять (popup-name || "")
    inputName.type = "text";
    inputName.name = "name";
    inputName.placeholder = inputNamePlaceholder; // менять (название) ||( имя)
    inputName.autocomplete = "off";
    inputName.setAttribute("minlength", "2");
    inputName.setAttribute("maxlength", "30");
    inputName.setAttribute("required", "");
    labelName.appendChild(inputName);

    const popupErrorName = document.createElement("span");
    popupErrorName.classList.add("popup__error");
    popupErrorName.id = idPopupErrorName; // менять (new-error-name) || (error-name)
    labelName.append(popupErrorName);

    const labelLink = document.createElement("label");
    popupForm.appendChild(labelLink);

    const inputlink = document.createElement("input");
    inputlink.classList.add("popup__input");
    inputlink.classList.add("popup__input_type_link-url");
    inputlink.id = "popup-link";
    inputlink.type = inputType; //менять  (url) || (text)
    inputlink.name = "link";
    inputlink.placeholder = inputLinkPlaceholder; // менять (Ссылка на картинку) (О себе)
    inputlink.autocomplete = "off";
    inputlink.setAttribute("minlength", inputMinlength); //minlength = inputMinlength; // менять "" || 2
    inputlink.setAttribute("maxlength", inputMaxlength); // менять "" || 30
    inputlink.setAttribute("required", "");
    labelLink.appendChild(inputlink);

    const popupErrorLink = document.createElement("span");
    popupErrorLink.classList.add("popup__error");
    popupErrorLink.id = idPopupErrorLink; //менять (new-error-link) || (error-job)
    labelLink.append(popupErrorLink);

    const button = document.createElement("button");
    button.classList.add("button");
    button.classList.add("popup__button");
    button.id = idPopupButton; // менять (popup-button) || (form-edit)
    button.disabled = btnDefaul; // менять true || false
    button.textContent = buttonTextcontent; // поменять ('+") || (Сохранить)
    popupForm.appendChild(button);

    return popup;
  }

  renderPopup() {
    const root = document.querySelector(".root");
    root.appendChild(this.body);
  }
  anRenderPopup() {
    const root = document.querySelector(".root");
    const popupEdit = document.querySelector(".popup");
    root.removeChild(popupEdit);
  }
  openPopup() {
    const popup = document.querySelector(".popup");
    popup.classList.add("popup_is-opened");
  }
  closePopup() {
    const popup = document.querySelector(".popup");
    popup.classList.remove("popup_is-opened");
  }

  popupInfoDefault() {
    const name = document.querySelector(".user-info__name");
    const job = document.querySelector(".user-info__job");
    const form = document.forms.edit;

    form.elements.name.value = name.textContent;
    form.elements.link.value = job.textContent;
  }

  patchProfile(form) {
    const formName = form.elements.name;
    const formAboutMyself = form.elements.link;

    let profile = {
      name: formName.value,
      about: formAboutMyself.value
    };
    return profile;
  }
  postProfile(form) {
    const formName = form.elements.name;
    const formAboutMyself = form.elements.link;

    let profile = {
      name: formName.value,
      link: formAboutMyself.value
    };
    return profile;
  }

  renderLoading(isLoading) {
    const loading = document.querySelector(".popup__button");
    if (isLoading) {
      loading.textContent = "Загрузка...";
    } else {
      loading.textContent = "Сохранить";
    }
  }
  renderLoadingNew(isLoading) {
    const loading = document.querySelector(".popup__button");
    if (isLoading) {
      loading.textContent = "Загрузка...";
    } else {
      loading.textContent = "+";
    }
  }
}
export { Popup };
