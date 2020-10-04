import galleryItems from "./gallery-items.js";

const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeButton = document.querySelector(".lightbox__button");

const arrayWithGallery = galleryItems.map(item => {
  const li = document.createElement("li");
  li.classList.add("gallery__item");

  const a = document.createElement("a");
  a.classList.add("gallery__link");
  a.href = item.original;

  const img = document.createElement("img");
  img.classList.add("gallery__image");
  img.src = item.preview;

  img.setAttribute("data-source", item.original);
  img.alt = item.description;

  a.appendChild(img);
  li.appendChild(a);
  return li;
});
gallery.append(...arrayWithGallery);

const openImageModal = ({ target }) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  lightbox.classList.add("is-open");
  lightboxImage.src = target.dataset.source;
  document.addEventListener("keyup", closeImageModal);
};
const closeImageModal = event => {
  event.preventDefault();
  if (
    event.key === "Escape" ||
    event.target === closeButton ||
    event.target.parentNode.className === "lightbox js-lightbox is-open"
  ) {
    lightbox.classList.remove("is-open");
    lightboxImage.setAttribute("src", "");
    document.removeEventListener("keyup", closeImageModal);
  }
};

gallery.addEventListener("click", openImageModal);
lightbox.addEventListener("click", closeImageModal);