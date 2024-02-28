export function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
  });
}

export function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = profileForm.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    toggleButtonState(inputList, buttonElement, validationConfig);
    hideInputError(profileForm, inputElement, validationConfig);
  });
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationConfig);

  formElement.addEventListener("reset", () => {
    disableButton(buttonElement, validationConfig);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationConfig);
  } else {
    enableButton(buttonElement, validationConfig);
  }
}

function disableButton(submitButton, settings) {
  submitButton.classList.add(settings.inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, settings) {
  submitButton.classList.remove(settings.inactiveButtonClass);
  submitButton.disabled = false;
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity("Вы пропустили это поле.");
  }

  if (inputElement.validity.typeMismatch && inputElement.type === "url") {
    inputElement.setCustomValidity("Введите адрес сайта.");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}
