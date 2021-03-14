import gallery from "./gallery-items.js";

const galleryList = document.querySelector("ul.js-gallery");
const fullImage = document.querySelector(".lightbox__image");
const modalWindow = document.querySelector("div.lightbox");
const closeButton = document.querySelector(
  "button[data-action='close-lightbox']"
);
const overlay = document.querySelector(".lightbox__overlay");

const html = gallery.reduce((accum, { preview, original, description }) => {
  return (
    accum +
    `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`
  );
}, "");

galleryList.insertAdjacentHTML("beforeend", html);

galleryList.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("gallery__image")) {
    fullImage.src = event.target.dataset.source;
    fullImage.alt = event.target.alt;
    modalWindow.classList.add("is-open");
  }
});

const closeModal = () => {
  modalWindow.classList.remove("is-open");
  fullImage.src = "";
  fullImage.alt = "";
};

closeButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

const switchImage = (arrow) => {
  let indexImage = gallery.findIndex((item) => fullImage.src === item.original);

  if (arrow === "ArrowLeft") {
    const previousIndexImage =
      indexImage === 0 ? gallery.length - 1 : indexImage - 1;
    fullImage.src = gallery[previousIndexImage].original;
    fullImage.alt = gallery[previousIndexImage].description;
  } else if (arrow === "ArrowRight") {
    const nextIndexImage =
      indexImage === gallery.length - 1 ? 0 : indexImage + 1;
    fullImage.src = gallery[nextIndexImage].original;
    fullImage.alt = gallery[nextIndexImage].description;
  }
};

window.addEventListener("keydown", ({ code }) => {
  if (modalWindow.classList.contains("is-open")) {
    if (code === "Escape") {
      closeModal();
    } else {
      switchImage(code);
    }
  }
});
