class ValidForms {
  btnActive(form) {
    const btn = form.querySelector("button");
    btn.style.backgroundColor = "#000000";
    btn.style.color = "#ffffff";
    btn.disabled = false;
    btn.style.cursor = "pointer";
  }
  btnInactive(form) {
    const btn = form.querySelector("button");
    btn.style.backgroundColor = "#ffffff";
    btn.style.color = "rgba(0, 0, 0, 0.2)";
    btn.disabled = true;
    btn.style.cursor = "auto";
  }
  validityForm(form) {
    if (form.checkValidity()) {
      validity.btnActive(form);
    } else {
      validity.btnInactive(form);
    }
  }
  validityInputEdit(name, error) {
    if (!name.checkValidity()) {
      if (event.target.value.length === 0) {
        error.textContent = "Это обязательное поле";
      } else {
        if (event.target.validity.tooShort) {
          error.textContent = "Должно быть от 2 до 30 символов";
        } else {
          error.textContent = "";
        }
      }
    } else error.textContent = "";
  }
  validityInputUrl(name, error) {
    if (event.target.value.length === 0) {
      error.textContent = "Это обязательное поле";
    } else {
      if (!event.target.checkValidity()) {
        error.textContent = "Это должна быть ссылка";
      } else {
        error.textContent = "";
      }
    }
  }
}

const validity = new ValidForms();
export { validity };
