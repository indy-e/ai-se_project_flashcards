import { decks, getDeckByID } from "./decks.js";
import{ stringToHex, hexToString, removeColorClasses } from "./colorMap.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckViewById } from "./deck-view.js";

const homeSection = document.querySelector("#home");
const mainEl = document.querySelector(".page__main-content");
const aboutSection = document.querySelector("#about");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector("#carousel");
const deckViewSection = document.querySelector("#deck-view");
const homeDecksList = document.querySelector("#home .gallery__list");
let currentDeck = null;

const handleHomeDecksListClick = (e) => {
  if (e.target.closest(".card__btn_type_delete")) {
    const li = e.target.closest("li");
    if (li) li.remove();
  }
};

if (homeDecksList) {
  homeDecksList.addEventListener("click", handleHomeDecksListClick);
}

function renderDecksView() {
  currentDeck = "home";
  homeSection.style.display = "block";
  aboutSection.style.display = "none";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
  if (deckViewSection) deckViewSection.style.display = "none";

  mainEl.classList.remove("page__main-content_location_carousel");

  const decksList = homeDecksList;
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
    deckLinkEl.href = `#deck/${item.id}`;
    return cloneEl;
  }

  function renderDeckEl(item){
    const el = createDeckEl(item);
    decksList.prepend(el);
  }

  decks.forEach(deck => {
    renderDeckEl(deck);
  });
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  aboutSection.style.display = "none";
  notFoundSection.style.display = "flex";
  carouselSection.style.display = "none";
  if (deckViewSection) deckViewSection.style.display = "none";
  mainEl.classList.remove("page__main-content_location_carousel");
}
function renderAboutView() {
  aboutSection.style.display = "flex";
  homeSection.style.display = "none";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
  if (deckViewSection) deckViewSection.style.display = "none";
  mainEl.classList.remove("page__main-content_location_carousel");
}

function renderCarouselViewById(deckId) {
  currentDeck = deckId;
  const deck = getDeckByID(deckId);
  mainEl.classList.add("page__main-content_location_carousel");
  if (deck) {
    carouselSection.style.display = "flex";
    homeSection.style.display = "none";
    aboutSection.style.display = "none";
    notFoundSection.style.display = "none";
    if (deckViewSection) deckViewSection.style.display = "none";
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
  } else if (hash.startsWith("deck/")) {
    const deckId = hash.slice("deck/".length);
    renderDeckViewById(deckId);
  } else if (hash.startsWith("carousel/")) {
    const deckId = hash.slice("carousel/".length);
    renderCarouselViewById(deckId);
  } else {
    renderNotFoundView();
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);