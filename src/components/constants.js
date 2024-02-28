// @todo: Темплейт карточки
export const cardTmp = document.querySelector("#card-template").content;

// @todo: DOM узлы
export const list = document.querySelector(".places__list");
export const profileImage = document.querySelector(".profile__image");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const editProfileModal = document.querySelector(".popup_type_edit");
export const editProfileButton = document.querySelector(".profile__edit-button");
export const editProfileForm = document.forms["edit-profile"];
export const nameInput = editProfileForm.name;
export const jobInput = editProfileForm.description;
export const editAvatarModal = document.querySelector(".popup_type_edit-avatar");
export const editAvatarForm = document.forms["edit-avatar"];
export const avatarLink = editAvatarForm["avatar-link"];
export const newCardModal = document.querySelector(".popup_type_new-card");
export const newCardButton = document.querySelector(".profile__add-button");
export const newCardForm = document.forms["new-place"];
export const placeInput = newCardForm["place-name"];
export const linkInput = newCardForm.link;
export const deleteCardModal = document.querySelector(".popup_type_delete-card");
export const deleteCardButton = deleteCardModal.querySelector(".popup__button");
export const imageModal = document.querySelector(".popup_type_image");
export const popupImage = imageModal.querySelector(".popup__image");
export const popupImageCaption = imageModal.querySelector(".popup__caption");
export const closeButtons = document.querySelectorAll(".popup__close");
export const modals = document.querySelectorAll(".popup");
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};