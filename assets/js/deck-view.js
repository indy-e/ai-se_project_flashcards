import { getDeckByID } from "./decks.js";
import { hexToString } from "./colorMap.js";

const homeSection = document.querySelector("#home");
const mainEl = document.querySelector(".page__main-content");
const aboutSection = document.querySelector("#about");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector("#carousel");
const deckViewSection = document.querySelector("#deck-view");

function renderDeckViewById(deckId) {
  const deck = getDeckByID(deckId);
  if (!deck) {
    homeSection.style.display = "none";
    aboutSection.style.display = "none";
    notFoundSection.style.display = "flex";
    carouselSection.style.display = "none";
    if (deckViewSection) deckViewSection.style.display = "none";
    mainEl.classList.remove("page__main-content_location_carousel");
    return false;
  }

  // show deck view, hide others
  if (deckViewSection) deckViewSection.style.display = "block";
  homeSection.style.display = "none";
  aboutSection.style.display = "none";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
  mainEl.classList.remove("page__main-content_location_carousel");

  // set title text and practice link
  const titleTextEl = deckViewSection.querySelector(".gallery__title-text");
  if (titleTextEl) titleTextEl.textContent = deck.name;
  const practiceLink = deckViewSection.querySelector(".gallery__practice-link");
  if (practiceLink) practiceLink.href = `#carousel/${deckId}`;

  const listEl = deckViewSection.querySelector(".gallery__list");
  listEl.innerHTML = "";

  const template = document.querySelector("#flashcard-template");
  deck.cards.forEach(card => {
    const clone = template.content.querySelector("li").cloneNode(true);
    const title = clone.querySelector(".card__title");
    const answer = clone.querySelector(".card__answer");
    if (title) title.textContent = card.question;
    if (answer) answer.textContent = card.answer;

    // apply deck color to card
    const colorName = hexToString(deck.color);
    const bemModifier = colorName ? "card_color_" + colorName : "card_color_green";
    clone.classList.add(bemModifier);

    // attach listeners for flip and delete
    const flipBtn = clone.querySelector(".card__btn_type_flip");
    const deleteBtn = clone.querySelector(".card__btn_type_delete");
    if (flipBtn) {
      flipBtn.addEventListener("click", () => {
        clone.classList.toggle("card_state_flipped");
        if (answer) answer.hidden = !answer.hidden;
        if (title) title.hidden = !title.hidden;
      });
    }
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        clone.remove();
      });
    }

    listEl.appendChild(clone);
  });

  return true;
}

export { renderDeckViewById };
