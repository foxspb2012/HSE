// Создание обработчиков клика на карточки
const models = document.querySelectorAll(".model__item");
let currentSelect = 0;

for (let i = 0; i < models.length; i++) {
  const model = models[i];
  model.addEventListener('click', setClickedItem, false);
  model.itemid = i;
}

models[currentSelect].classList.add("model--main");


// Создание обработчика клика на машину для запуска анимации
function setClickedItem(evt) {
  document.querySelector(".model--main").classList.remove("model--main");

  let clickedLink = evt.target;
  while (clickedLink.className !== "model__item") {
    clickedLink = clickedLink.parentNode;
  }
  currentSelect = clickedLink.itemid;

  models[currentSelect].classList.add("model--main");
}

const car = document.querySelector('.car');
car.addEventListener('click', setClickItem);

function addClass(wheels, carBody) {

  car.classList.remove("fadeOutRightBig");
  car.classList.add("fadeInLeftBig");

  for (let i = 0; i < wheels.length; i++) {
    const wheel = wheels[i];
    wheel.classList.add("wheel-spin");
  }

  carBody.classList.add("car-shake");
}

function setClickItem() {

  car.classList.remove("fadeInLeftBig");

  const carBody = car.querySelector(".car__body");
  carBody.classList.remove("car-shake");

  const wheels = car.querySelectorAll(".wheel-spin");

  for (let i = 0; i < wheels.length; i++) {
    const wheel = wheels[i];
    wheel.classList.remove("wheel-spin");
  }

  car.classList.add("fadeOutRightBig");

  setTimeout(() => addClass(wheels, carBody), 1000);
}


