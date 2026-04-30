import{ hexToString, removeColorClasses } from "./colorMap.js";

function renderCarouselView(deck){
    let currentIndex = 0;
    let showingQuestion = true;

  const carouselEl = document.querySelector(".carousel");
  const carouselCardEl = carouselEl.querySelector(".carousel__card");
  const leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselEl.querySelector(".carousel__btn_type_right");
  const flipBtn = carouselEl.querySelector(".carousel__btn_type_flip");
  const carouselCardTextEl = carouselEl.querySelector(".carousel__card-text");
  const carouselTitleEl = carouselEl.querySelector(".carousel__title");

  removeColorClasses(carouselCardEl);
  const colorName = hexToString(deck.color);
  const bemModifier = colorName ? "carousel__card_color_" + colorName : "carousel__card_color_green";
  carouselCardEl.classList.add(bemModifier);

  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.disabled = true;
  }
  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

  function updateArrows() {
    if (currentIndex === 0) {
      disableButton(leftBtn);
    } else {
      enableButton(leftBtn);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightBtn);
    } else {
      enableButton(rightBtn);
    }
  }

  function updateDisplay() {
    const card = deck.cards[currentIndex];
    carouselCardTextEl.textContent = showingQuestion ? card.question : card.answer;
    carouselTitleEl.textContent = deck.name + " \u00B7 " + (currentIndex + 1) + "/" + deck.cards.length;

    if (showingQuestion) {
      carouselCardEl.classList.remove("carousel__card_color_white");
    } else {
      carouselCardEl.classList.add("carousel__card_color_white");
    }

    updateArrows();
  }

  rightBtn.addEventListener("click", () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  });

  leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  });

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  });

  updateDisplay();
}

export { renderCarouselView };