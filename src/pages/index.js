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
import { handleSubmit } from "../components/utils.js";

import {
  cardTmp,
  list,
  profileImage,
  profileTitle,
  profileDescription,
  editProfileModal,
  editProfileButton,
  editProfileForm,
  nameInput,
  jobInput,
  editAvatarModal,
  editAvatarForm,
  avatarLink,
  newCardModal,
  newCardButton,
  newCardForm,
  placeInput,
  linkInput,
  deleteCardModal,
  deleteCardButton,
  imageModal,
  popupImage,
  popupImageCaption,
  closeButtons,
  modals,
  validationConfig,
} from "../components/constants.js";

let createCardCallbacks = {
  deleteFunction: openModalDeleteCard,
  likeFunction: handleLikeCard,
  openImageFunction: openPopupImage,
};
let cardToDelete = {};
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
  .catch(console.error);

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

function openModalDeleteCard(cardId, event) {
  cardToDelete = {id: cardId, event: event};
  openModal(deleteCardModal);
}

function handleEditProfileFormSubmit(event) {
  const request = () => {
    return updateProfile(nameInput.value, jobInput.value).then((res) => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(editProfileModal);
    });
  };

  handleSubmit(request, event);
}

function handleAvatarEditFormSubmit(event) {
  const request = () => {
    return updateProfileAvatar(avatarLink.value).then((res) => {
      profileImage.style.backgroundImage = `url(${avatarLink.value})`;
      closeModal(editAvatarModal);
    });
  };

  handleSubmit(request, event);
}

function handleAddCardFormSubmit(event) {
  const request = () => {
    return postNewCard(placeInput.value, linkInput.value).then((res) => {
      res.template = cardTmp;
      res.profileId = profileId;
      list.prepend(createCard(res, createCardCallbacks));
      closeModal(newCardModal);
    });
  };

  handleSubmit(request, event);
}

function handleDeleteCard(event) {
  event.preventDefault();

  deleteCardById(cardToDelete.id)
    .then((res) => {
      removeCard(cardToDelete.event);
      closeModal(deleteCardModal);
    })
    .catch(console.error);
}

function handleLikeCard(cardId, event) {
  event.preventDefault();

  if (event.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((res) => {
        likeCard(event, res.likes.length);
      })
      .catch(console.error);
  } else {
    addLike(cardId)
      .then((res) => {
        likeCard(event, res.likes.length);
      })
      .catch(console.error);
  }
}

enableValidation(validationConfig);

// listeners
editProfileButton.addEventListener("click", editProfile);
profileImage.addEventListener("click", editAvatar);
newCardButton.addEventListener("click", openModalAddNewCard);
deleteCardButton.addEventListener("click", handleDeleteCard);
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
newCardForm.addEventListener("submit", handleAddCardFormSubmit);
editAvatarForm.addEventListener("submit", handleAvatarEditFormSubmit);
modals.forEach((item) => {
  item.classList.add("popup_is-animated");
  item.addEventListener("click", closeModalByOverlay);
});
closeButtons.forEach((item) => {
  item.addEventListener("click", closeModalByButton);
});
