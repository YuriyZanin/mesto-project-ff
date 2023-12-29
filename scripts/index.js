// @todo: Темплейт карточки
const cardTmp = document.querySelector("#card-template").content;

// @todo: DOM узлы
const list = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
  const cardElement = cardTmp.querySelector(".card").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const buttonElement = cardElement.querySelector(".card__delete-button");

  imageElement.src = link;
  imageElement.alt = `Фото - ${name}`;
  titleElement.textContent = name;
  buttonElement.addEventListener("click", deleteCard);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const eventTarget = event.target;
  eventTarget.closest(".places__item").remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  list.append(createCard(item.name, item.link, deleteCard));
});
