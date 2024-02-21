import "../pages/index.css"; // добавьте импорт главного файла стилей
import { createCard, removeCard, likeCard } from "../components/card.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  addLike,
  deleteCardById,
  deleteLike,
  getInitialCards,
  getProfile,
  postNewCard,
  updateProfile,
  updateProfileAvatar,
} from "../components/api.js";
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
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileModal = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileForm = document.forms["edit-profile"];
const editProfileSaveButton = editProfileForm.querySelector(".popup__button");
const nameInput = editProfileForm.name;
const jobInput = editProfileForm.description;
const editAvatarModal = document.querySelector(".popup_type_edit-avatar");
const editAvatarForm = document.forms["edit-avatar"];
const editAvatarSaveButton = editAvatarForm.querySelector(".popup__button");
const avatarLink = editAvatarForm["avatar-link"];
const newCardModal = document.querySelector(".popup_type_new-card");
const newCardButton = document.querySelector(".profile__add-button");
const newCardForm = document.forms["new-place"];
const newCardSaveButton = newCardForm.querySelector(".popup__button");
const placeInput = newCardForm["place-name"];
const linkInput = newCardForm.link;
const deleteCardModal = document.querySelector(".popup_type_delete-card");
const imageModal = document.querySelector(".popup_type_image");
const popupImage = imageModal.querySelector(".popup__image");
const popupImageCaption = imageModal.querySelector(".popup__caption");
const createCardCallbacks = {
  deleteFunction: handleDeleteCard,
  likeFunction: handleLikeCard,
  openImageFunction: openPopupImage,
};
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
let profileId;

// @todo: Вывести карточки на страницу
Promise.all([getProfile(), getInitialCards()])
  .then(([profile, cards]) => {
    // обрабатываем результат
    profileImage.style.backgroundImage = `url(${profile.avatar})`;
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileId = profile._id;

    cards.forEach((cardData) => {
      cardData.template = cardTmp;
      cardData.profileId = profile._id;
      list.append(createCard(cardData, createCardCallbacks));
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

const closeButtons = document.querySelectorAll(".popup__close");
const modals = document.querySelectorAll(".popup");

function renderLoading(buttonElement, isLoading) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
}

function openPopupImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openModal(imageModal);
}

function editProfile(event) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfileModal);
}

function editAvatar(event) {
  avatarLink.value = profileImage.style.backgroundImage
    .slice(4, -1)
    .replace(/"/g, "");
  clearValidation(editAvatarForm, validationConfig);
  openModal(editAvatarModal);
}

function openModalAddNewCard(event) {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  openModal(newCardModal);
}

// function openModalDeleteCard(event) {
//   openModal(deleteCardModal);
// }

function handleEditProfileFormSubmit(event) {
  event.preventDefault();

  renderLoading(editProfileSaveButton, true);
  updateProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(editProfileSaveButton, false);
    });
}

function handleAvatarEditFormSubmit(event) {
  event.preventDefault();

  renderLoading(editAvatarSaveButton, true);
  updateProfileAvatar(avatarLink.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${avatarLink.value})`;
      closeModal(editAvatarModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(editAvatarSaveButton, false);
    });
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();

  renderLoading(newCardSaveButton, true);
  postNewCard(placeInput.value, linkInput.value)
    .then((res) => {
      res.template = cardTmp;
      res.profileId = profileId;
      list.prepend(createCard(res, createCardCallbacks));
      closeModal(newCardModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(newCardSaveButton, false);
    });
}

function handleDeleteCard(cardId, event) {
  event.preventDefault();

  deleteCardById(cardId)
    .then((res) => {
      removeCard(event);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleLikeCard(cardId, event) {
  event.preventDefault();

  if (event.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((res) => {
        likeCard(event, res.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(cardId)
      .then((res) => {
        likeCard(event, res.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

enableValidation(validationConfig);

// listeners
editProfileButton.addEventListener("click", editProfile);
profileImage.addEventListener("click", editAvatar);
newCardButton.addEventListener("click", openModalAddNewCard);
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
newCardForm.addEventListener("submit", handleAddCardFormSubmit);
editAvatarForm.addEventListener("submit", handleAvatarEditFormSubmit);
// deleteCardModal.addEventListener("submit", handleDeleteCard);
modals.forEach((item) => {
  item.classList.add("popup_is-animated");
  item.addEventListener("click", closeModalByOverlay);
});
closeButtons.forEach((item) => {
  item.addEventListener("click", closeModalByButton);
});
