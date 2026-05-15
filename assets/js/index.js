import { decks, getDeckByID } from "./decks.js";
import{ stringToHex, hexToString, removeColorClasses } from "./colorMap.js";
import { renderCarouselView } from "./carousel.js";

const homeSection = document.querySelector("#home");
const mainEl = document.querySelector(".page__main-content");
const aboutSection = document.querySelector("#about");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector("#carousel");

function renderDecksView() {
  homeSection.style.display = "block";
  aboutSection.style.display = "none";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";

  mainEl.classList.remove("page__main-content_location_carousel");

  const decksList = document.querySelector(".gallery__list");
  decksList.innerHTML = "";

  function createDeckEl(item){
    const template = document.querySelector("#deck-template");
    const cloneEl = template.content.querySelector("li").cloneNode(true);
    const colorName = hexToString(item.color);
    const bemModifier = colorName ? "card_color_" + colorName : "card_color_green";
    cloneEl.classList.add(bemModifier);
    cloneEl.dataset.id = item.id;
    const titleEl = cloneEl.querySelector(".card__title");
    titleEl.textContent = item.name;
    const countEl = cloneEl.querySelector(".card__count");
    countEl.textContent = item.cards.length + " cards";
    const deckLinkEl = cloneEl.querySelector(".card__link");
    deckLinkEl.href = `#carousel/${item.id}`;
    return cloneEl;
  }

  function renderDeckEl(item){
    const el = createDeckEl(item);
    decksList.prepend(el);
  }

  decks.forEach(deck => {
    renderDeckEl(deck);
  });

  decksList.addEventListener("click", (e) => {
    if (e.target.closest(".card__delete-btn")) {
      const li = e.target.closest("li");
      li.remove();
    }
  });
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  aboutSection.style.display = "none";
  notFoundSection.style.display = "flex";
  carouselSection.style.display = "none";
  mainEl.classList.remove("page__main-content_location_carousel");
}
function renderAboutView() {
  aboutSection.style.display = "flex";
  homeSection.style.display = "none";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
  mainEl.classList.remove("page__main-content_location_carousel");
}

function renderCarouselViewById(deckId) {
  const deck = getDeckByID(deckId);
  mainEl.classList.add("page__main-content_location_carousel");
  if (deck) {
    carouselSection.style.display = "flex";
    homeSection.style.display = "none";
    aboutSection.style.display = "none";
    notFoundSection.style.display = "none";
    renderCarouselView(deck);
  } else {
    renderNotFoundView();
  }
}
function router() {
  const hash = window.location.hash.slice(1) || "home";

  if (hash === "home" || hash === "") {
    renderDecksView();
  } else if (hash === "about") {
    renderAboutView();
  } else if (hash.startsWith("carousel/")) {
    const deckId = hash.slice("carousel/".length);
    renderCarouselViewById(deckId);
  } else {
    renderNotFoundView();
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);