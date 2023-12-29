// @todo: Темплейт карточки
let cardTmp = document.querySelector("#card-template").content;

// @todo: DOM узлы
let list = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(name, link, deleteFunction) {
  let cardElement = cardTmp.querySelector(".card").cloneNode(true);
  let imageElement = cardElement.querySelector(".card__image");
  let titleElement = cardElement.querySelector(".card__title");
  let buttonElement = cardElement.querySelector(".card__delete-button");

  imageElement.src = link;
  imageElement.alt = `Фото - ${name}`;
  titleElement.textContent = name;
  buttonElement.addEventListener("click", deleteFunction);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  let eventTarget = event.target;
  eventTarget.closest(".places__item").remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  list.append(createCard(item.name, item.link, deleteCard));
});
