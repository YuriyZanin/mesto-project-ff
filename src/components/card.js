// @todo: Функция создания карточки
export function createCard(
  cardTmp,
  name,
  link,
  deleteCard,
  likeCard,
  openImage
) {
  const cardElement = cardTmp.querySelector(".card").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButtonElement = cardElement.querySelector(".card__delete-button");
  const likeButtonElement = cardElement.querySelector(".card__like-button");

  imageElement.src = link;
  imageElement.alt = `Фото - ${name}`;
  titleElement.textContent = name;
  deleteButtonElement.addEventListener("click", deleteCard);
  likeButtonElement.addEventListener("click", likeCard);
  imageElement.addEventListener("click", openImage);
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
