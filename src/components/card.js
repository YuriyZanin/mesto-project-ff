// @todo: Функция создания карточки
export function createCard(cardData, callbacks) {
  const cardElement = cardData.template.querySelector(".card").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButtonElement = cardElement.querySelector(".card__delete-button");
  const likeButtonElement = cardElement.querySelector(".card__like-button");

  imageElement.src = cardData.link;
  imageElement.alt = `Фото - ${cardData.name}`;
  titleElement.textContent = cardData.name;
  deleteButtonElement.addEventListener("click", callbacks.deleteFunction);
  likeButtonElement.addEventListener("click", callbacks.likeFunction);
  imageElement.addEventListener("click", () =>
    callbacks.openImageFunction(cardData.name, cardData.link)
  );
  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(event) {
  const eventTarget = event.target;
  eventTarget.closest(".places__item").remove();
}

export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
