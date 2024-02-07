import "../pages/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import {
  openModal,
  closeModal,
  closeModalByOverlay,
  closeModalByButton,
} from "../components/modal.js";

// @todo: Темплейт карточки
const cardTmp = document.querySelector("#card-template").content;

// @todo: DOM узлы
const list = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileModal = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.name;
const jobInput = editProfileForm.description;
const newCardModal = document.querySelector(".popup_type_new-card");
const newCardButton = document.querySelector(".profile__add-button");
const newCardForm = document.forms["new-place"];
const placeInput = newCardForm["place-name"];
const linkInput = newCardForm.link;
const imageModal = document.querySelector(".popup_type_image");
const image = imageModal.querySelector(".popup__image");
const caption = imageModal.querySelector(".popup__caption");

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  list.append(
    createCard(cardTmp, item.name, item.link, deleteCard, likeCard, openImage)
  );
});

const closeButtons = document.querySelectorAll(".popup__close");
const modals = document.querySelectorAll(".popup");

function openImage(event) {
  image.src = event.target.src;
  image.alt = event.target.alt;
  caption.textContent = event.target.alt;
  openModal(imageModal);
}

function editProfile(event) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
}

function addNewCard(event) {
  openModal(newCardModal);
}

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  list.prepend(
    createCard(
      cardTmp,
      placeInput.value,
      linkInput.value,
      deleteCard,
      likeCard,
      openImage
    )
  );
  closeModalByButton(event);
}

// listeners
editProfileButton.addEventListener("click", editProfile);
newCardButton.addEventListener("click", addNewCard);
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
newCardForm.addEventListener("submit", handleAddCardFormSubmit);
modals.forEach((item) => {
  item.classList.add("popup_is-animated");
  item.addEventListener("click", closeModalByOverlay);
});
closeButtons.forEach((item) => {
  item.addEventListener("click", closeModalByButton);
});
