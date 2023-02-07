/***** Задание 1 - Активная ссылка *****/
const list1 = document.querySelector('#list_1');
const links = list1.querySelectorAll('a');

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', setClickedItem, false);
}

function setClickedItem(evt) {
  evt.preventDefault(); // Отменяем действие браузера по умолчанию
  removeActiveLinks();  // Вызовем функцию для удаления установленного класса 'active'
  evt.target.classList.add('active');  // Добавим выбранной ссылке класс 'active'
}

function removeActiveLinks() {
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if(link.classList.contains('active')) {
      link.classList.remove('active');
    }

  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 2 - Добавление и удаление элементов списка *****/
const list2 = document.querySelector('#list_2');
const buttonAdd = document.querySelector('#button_add');
const buttonRemove = document.querySelector('#button_remove');

buttonAdd.addEventListener('click', setClickButtonAdd, false);
buttonRemove.addEventListener('click', setClickButtonRemove, false);

function setClickButtonAdd() {
  let newLi = document.createElement('li');
  newLi.textContent = `Item ${list2.childElementCount + 1}`;
  list2.appendChild(newLi);
}

function setClickButtonRemove() {
  const deletedLi = list2.children[list2.childElementCount - 1];
  if (deletedLi !== undefined) {
    list2.removeChild(deletedLi);
  }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 3 - Перетаскивание элемента *****/
const PIN_WIDTH = 65;
const PIN_HEIGHT = 84;
const PIN_LOCATION_X_MIN = 0;
const PIN_LOCATION_X_MAX = 1200;
const PIN_LOCATION_Y_MIN = 100;
const PIN_LOCATION_Y_MAX = 760;

const pin = document.querySelector('.map__pin--main');
pin.addEventListener('mousedown', function (evt) {
  let startCoordinates = {
    x: evt.clientX,
    y: evt.clientY,
  };

  const onMouseMove = function (moveEvt) {
    const shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY,
    };
    if (pin.offsetLeft - shift.x + Math.round(PIN_WIDTH / 2) < PIN_LOCATION_X_MIN) {
      shift.x = pin.offsetLeft - PIN_LOCATION_X_MIN + Math.round(PIN_WIDTH / 2);
    }
    if (pin.offsetLeft - shift.x + Math.round(PIN_WIDTH / 2) > PIN_LOCATION_X_MAX) {
      shift.x = pin.offsetLeft - PIN_LOCATION_X_MAX + Math.round(PIN_WIDTH / 2);
    }
    if (pin.offsetTop - shift.y + Math.round(PIN_HEIGHT) < PIN_LOCATION_Y_MIN) {
      shift.y = pin.offsetTop - PIN_LOCATION_Y_MIN + Math.round(PIN_HEIGHT);
    }
    if (pin.offsetTop - shift.y + Math.round(PIN_HEIGHT) > PIN_LOCATION_Y_MAX) {
      shift.y = pin.offsetTop - PIN_LOCATION_Y_MAX + Math.round(PIN_HEIGHT);
    }
    startCoordinates = {
      x: moveEvt.clientX,
      y: moveEvt.clientY,
    };
    pin.style.top = pin.offsetTop - shift.y + 'px';
    pin.style.left = pin.offsetLeft - shift.x + 'px';
  };

  const onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

