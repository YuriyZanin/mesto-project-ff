export function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByEscape);
}

export function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

export function closeModalByEscape(event) {
  if (event.key === "Escape") {
    const openedCard = document.querySelector(".popup_is-opened");
    closeModal(openedCard);
  }
}

export function closeModalByOverlay(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closeModal(event.target);
  }
}

export function closeModalByButton(event) {
  const openedCard = event.target.closest(".popup_is-opened");
  closeModal(openedCard);
}
