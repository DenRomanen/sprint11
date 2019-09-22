class XXLImage {
  fullscreenImageOpen(event) {
    const fullscreenImage = document.querySelector(".image-fullscreen");
    const src = event.target.style.backgroundImage
      .slice(4, -1)
      .replace(/"/g, "");
    document.getElementById("fullscreen").src = src;
    fullscreenImage.classList.add("image-fullscreen_is-opened");
  }
  fullscreenImageClose() {
    const fullscreen = document.querySelector(".image-fullscreen");
    fullscreen.classList.remove("image-fullscreen_is-opened");
  }
}
const xxlImage = new XXLImage();
export { xxlImage };
