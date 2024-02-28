import { checkResponse } from "./utils";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "470564dd-5f9f-43f4-bb23-d3e6c2faac28",
    "Content-Type": "application/json",
  },
};

export function getInitialCards() {
  return request("/cards", {
    headers: config.headers,
  });
}

export function getProfile() {
  return request("/users/me", {
    headers: config.headers,
  });
}

export function updateProfile(name, about) {
  return request("/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
}

export function postNewCard(name, link) {
  return request("/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
}

export function deleteCardById(id) {
  return request(`/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

export function addLike(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
}

export function deleteLike(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

export function updateProfileAvatar(link) {
  return request("/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  });
}

function request(endpoint, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(config.baseUrl + endpoint, options).then(checkResponse);
}
