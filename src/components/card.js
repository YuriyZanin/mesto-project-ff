// @todo: Функция создания карточки
export function createCard(cardData, callbacks) {
  const cardElement = cardData.template.querySelector(".card").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButtonElement = cardElement.querySelector(".card__delete-button");
  const likeButtonElement = cardElement.querySelector(".card__like-button");
  const likeCounterElement = cardElement.querySelector(".card__like-counter");

  updateLikeCounter(likeCounterElement, cardData.likes.length);
  cardData.likes.forEach(like => {
    if(like._id === cardData.profileId) {
      likeButtonElement.classList.add("card__like-button_is-active");
    }
  })

  if (cardData.owner._id !== cardData.profileId) {
    deleteButtonElement.style.display = "none";
  }

  imageElement.src = cardData.link;
  imageElement.alt = `Фото - ${cardData.name}`;
  titleElement.textContent = cardData.name;
  deleteButtonElement.addEventListener("click", (event) =>
    callbacks.deleteFunction(cardData._id, event)
  );
  likeButtonElement.addEventListener("click", (event) =>
    callbacks.likeFunction(cardData._id, event)
  );
  imageElement.addEventListener("click", () =>
    callbacks.openImageFunction(cardData.name, cardData.link)
  );
  return cardElement;
}

// @todo: Функция удаления карточки
export function removeCard(event) {
  const eventTarget = event.target;
  eventTarget.closest(".places__item").remove();
}

export function likeCard(event, counter) {
  event.target.classList.toggle("card__like-button_is-active");
  const counterElement = event.target
    .closest(".card__description")
    .querySelector(".card__like-counter");
  updateLikeCounter(counterElement, counter);
}

function updateLikeCounter(counterElement, counter) {
  counterElement.textContent = counter === 0 ? "" : counter;
}
