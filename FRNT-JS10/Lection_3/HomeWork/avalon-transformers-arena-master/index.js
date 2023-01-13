/**
 * Задание 5 - Трансформеры и ООП
 *
 * 1. Создать класс Transformer со свойствами name и health (по умолчанию
 *    имеет значение 100) и методом attack()
 * 2. Создать класс Autobot, который наследуется от класса Transformer.
 *    - Имеет свойсто weapon, т.к. автоботы сражаются с использованием оружия.
 *    - Конструктор класса принимает 2 параметра: имя и оружее (Экземпляр класса
 *      Weapon).
 *    - Метод attack возвращает результат использования оружия weapon.fight()
 * 3. Создать класс Deceptikon, который наследуется от класса Transformer.
 *    - Десептиконы не пользуются оружием, поэтому у них нет свойства weapon. Зато
 *      они могут иметь разное количество здоровья.
 *    - Конструктор класса принимает 2 параметра: имя и количество здоровья health
 *    - Метод attack возвращает характеристики стандартного вооружения: { damage: 5, speed: 1000 }
 * 4. Создать класс оружия Weapon, на вход принимает 2 параметра: damage - урон
 *    и speed - скорость атаки. Имеет 1 метод fight, который возвразает характеристики
 *    оружия в виде { damage: 5, speed: 1000 }
 * 5. Создать 1 автобота с именем OptimusPrime с оружием, имеющим характеристики { damage: 100, speed: 1000 }
 * 6. Создать 1 десептикона с именем Megatron и показателем здоровья 10000
 * 7. Посмотреть что происходит при вызове метода atack() у траснформеров разного типа,
 *    посмотреть сигнатуры классов
 *
 * 8. ДЗ-Вопрос: Написаиь симуляцию. Сколько нужно автоботов чтобы победить Мегатрона если параметр speed в оружии это
 *    количество милсекунд до следующего удара?
 */

// Утилитарные функции
const getRandomCount = function () {
  const radioValue = document.querySelector('.manage__radio:checked').value;
  const {min, max} = autoBotChecked[radioValue];

  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Константы
const autoBotChecked = {
  autobots:
    {min: 7, max: 10},
  desepticons:
    {min: 1, max: 5},
  random:
    {min: 1, max: 10},
}

// Переменные
let intervalId;
let inProcess = false;

// Классы
class Transformer {
  constructor(name, health = 100) {
    this.name = name;
    this.health = health;
  }

  attack() {
  }

  hit(fight) {
    this.health = this.health - fight.damage;
  }
}

class AutoBot extends Transformer {
  constructor(name, weapon) {
    super(name);
    this.weapon = weapon;
  }

  attack() {
    return this.weapon.fight();
  }
}

class Deceptikon extends Transformer {
  attack() {
    return {damage: 5, speed: 1000}
  }
}

class Weapon {
  constructor(damage, speed) {
    this.damage = damage;
    this.speed = speed;
  }

  fight() {
    return {
      damage: this.damage,
      speed: this.speed
    }
  }
}

class Arena {
  constructor(side1, side2) {
    this.side1 = side1;
    this.side2 = side2;
  }

  start() {
    const {side1, side2} = this;
    intervalId = setInterval(() => runFight(side1, side2), 1000);
  }
}

// Функции
const fillRadio = function fillRadio() {
  const items = Object.keys(autoBotChecked);

  for (let i = 0; i <= items.length - 1; i++) {
    const template = document.querySelector('#inputItem').content.querySelector('.manage__input-wrapper');
    const inputNode = template.cloneNode(true);
    const inputRadio = inputNode.querySelector('.manage__radio');
    const inputLabel = inputNode.querySelector('.manage__label-radio');
    const text = items[i];
    inputRadio.checked = i === 0 ? true : '';
    inputRadio.value = items[i];
    inputRadio.setAttribute('id', items[i]);
    inputLabel.textContent = text.charAt(0).toUpperCase() + text.slice(1);
    inputLabel.setAttribute('for', items[i]);
    document.querySelector('.manage__content-wrapper').append(inputNode);
  }
}

fillRadio();

const runFight = function (side1, side2) {
  const bot1 = side1[side1.length - 1];
  const bot2 = side2[side2.length - 1];
  const arenaDiv = document.querySelector('.arena');
  const lastAutobot = arenaDiv.querySelector('.arena-side-1').lastChild;
  const lastDesepticon = arenaDiv.querySelector('.arena-side-2').lastChild;

  if (side1.length > 0 && side2.length > 0) {
    bot1.hit(bot2.attack());
    if (bot1.health === 0) {
      side1.pop();
      lastAutobot.remove()
    } else {
      lastAutobot.querySelector('span').textContent = `${bot1.health} hp`;
    }

    bot2.hit(bot1.attack());
    if (bot2.health === 0) {
      side2.pop();
      lastDesepticon.remove()
    } else {
      lastDesepticon.querySelector('span').textContent = `${bot2.health} hp`;
    }
  } else {
    myStopFunction()
  }
}

const fillBots = function (items, selector) {
  for (let i = 0; i <= items.length - 1; i++) {
    const template = document.querySelector('#bot').content.querySelector('.bot');
    const bot = template.cloneNode(true);
    bot.querySelector('span').textContent = `${items[i].health} hp`;
    document.querySelector(selector).append(bot);
  }
}

function myStopFunction() {
  clearInterval(intervalId);
}

const createAutobot = function (count = 1) {
  const botArray = [];
  for (let i = 0; i < count; i++) {
    botArray.push(
      new AutoBot(`OptimusPrime${i + 1}`, new Weapon(100, 1000)));
  }

  return botArray;
}

const createDeceptikon = function (count = 1) {
  const deceptikonArray = [];
  for (let i = 0; i < count; i++) {
    deceptikonArray.push(
      new Deceptikon(`Megatron${i + 1}`, 10000));
  }

  return deceptikonArray;
}

const createBots = function () {
  restartBattle(false);
  inProcess = true;
  const count = getRandomCount();
  const side1 = createAutobot(count);
  const side2 = createDeceptikon();

  fillBots(side1, '.arena-side-1');
  fillBots(side2, '.arena-side-2');
  const arena = new Arena(side1, side2);
  arena.start();
}

const restartBattle = function (restart = true) {
  myStopFunction(intervalId);
  const arenaDiv = document.querySelector('.arena');
  arenaDiv.querySelector('.arena-side-1').innerHTML = '';
  arenaDiv.querySelector('.arena-side-2').innerHTML = '';
  if (restart) {
    document.querySelector('input').checked = true;
  }
  inProcess = false;
}

document.querySelector('.restart-battle')
  .addEventListener('click', () => restartBattle());
document.querySelector('.start-battle')
  .addEventListener('click', () => createBots());
