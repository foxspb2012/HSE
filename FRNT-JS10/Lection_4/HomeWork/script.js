/**
 * Задание 1 - Имитируем работу с сервером - Promise
 *
 * 1. Написать функцию getList, которая возвращает Promise с данными о списке задач, иммитируя
 * задержку перед получением в 2 секунды:
 * [
 * { id: 1, title: 'Task 1', isDone: false },
 * { id: 2, title: 'Task 2', isDone: true },
 * ]
 * 2. Написать скрипт который получит данные из функции getList и выведет на экран список задач.
 * 3. Изменить промис так, чтобы он возвращал ошибку
 * 4. Дополнить скрипт так, чтобы если промис возвращает ошибку выводилось сообщение об ошибке
 */


/**
 * Задание 2 - Чейнинг (цепочки) промисов
 *
 * Написать функцию которая будет соберет строку "Я использую цепочки обещаний", конкотенируя каждое
 * слово через отдельный then блок с задержкой в 1 секунду на каждой итерации.
 * Результат вывести в консоль.
 */

/**
 * Задание 3 - Параллельные обещания
 *
 * Написать функцию которая будет соберет строку "Я использую вызов обещаний параллельно",
 * используя функцию Promise.all(). Укажите следующее время задержки для каждого
 * промиса возвращаего слова:
 * Я - 1000,
 * использую - 800
 * вызов - 1200
 * обещаний - 700
 * параллельно - 500
 * Результат вывести в консоль.
 */

/**
 * Задание 4 - Напишите функцию delay(ms), которая возвращает промис,
 * переходящий в состояние "resolved" через ms миллисекунд.
 *
 * delay(2000).then(() => console.log('Это сообщение вывелось через 2 секунды'))
 */

/**
 * Задание 5 - Решите 3 задачу, используя, функцию delay
 */

/**
 * Задание 6 - Напишите функцию, которая загрузит данные по первому фильму в котором встретилась планета Татуин, используя
 * предоставленный API (https://swapi.dev)
 */

/**
 * Задание 7 - Напишите функцию, которая выведет название транспортного средства на котором впервые ехал Anakin Skywalker, используя
 * предоставленный API (https://swapi.dev)
 */

/**
 * Задание 8 - Напишите эхо-сервер, который на запрос POST /echo будет возвращать тело запроса.
 * Напишите функцию которая посылает запрос на http://localhost:3000 POST /echo со следующей
 * полезной нагрузкой:
 * { message: "Привет сервис, я жду от тебя ответа"}
 * Примите ответ от сервера и выведите результат в консоль, используя синтаксис async/await.
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 1 - Имитируем работу с сервером - Promise *****/

const taskList = [
  {id: 1, title: 'Task 1', isDone: false},
  {id: 2, title: 'Task 2', isDone: true},
];

function getList(taskList) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(taskList), 2000);
    setTimeout(() => reject(new Error('Данные по "taskList" не были получены')), 2000);
  });
}

function addRows(result) {
  const tbody = document.querySelector('#task1').querySelector('tbody');

  for (let i = 0; i < result.length; i++) {
    const {id, title, isDone} = result[i];
    const row = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(id));

    const td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(title));

    const td3 = document.createElement("td");
    td3.appendChild(document.createTextNode(isDone));

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);

    tbody.appendChild(row);
  }
}

document.querySelector('#button1')
  .addEventListener('click', () => {
    getList(taskList)
      .then(result => addRows(result))
      .catch(error => alert(error));
  });


/***** Задание 2 - Чейнинг (цепочки) промисов *****/
function later(value) {
  return new Promise((resolve) => setTimeout(resolve, 1000, value));
}

function collectString() {
  return new Promise(resolve => later(resolve('Я')))
    .then(resolve => later(resolve + ' использую'))
    .then(resolve => later(resolve + ' цепочки'))
    .then(resolve => later(resolve + ' обещаний'))
}

collectString()
  .then(value => console.log(value))
  .catch(error => console.log(error.message));


/***** Задание 3 - Параллельные обещания *****/
function laterAll(value, delay) {
  return new Promise(resolve => setTimeout(resolve, delay, value));
}

const promises = [
  new Promise(resolve => resolve(laterAll('Я', 1000))),
  new Promise(resolve => resolve(laterAll('использую', 800))),
  new Promise(resolve => resolve(laterAll('вызов', 1200))),
  new Promise(resolve => resolve(laterAll('обещаний', 700))),
  new Promise(resolve => resolve(laterAll('параллельно', 500))),
];

async function getPromiseAll() {
  return Promise
    .all(promises)
}

getPromiseAll()
  .then(res => console.log(res.join(' ')))
  .catch(error => console.log(error.message));


/***** Задание 4 - Напишите функцию delay(ms), которая возвращает промис *****/
/*****      переходящий в состояние "resolved" через ms миллисекунд.    *****/
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(2000).then(() => console.log('Это сообщение вывелось через 2 секунды'));


/***** Задание 5 - Решите 3 задачу, используя, функцию delay *****/
delay(5000).then(() => getPromiseAll()
  .then(res => console.log(res.join(' ')))
  .catch(error => console.log(error.message)));


/*****    Задание 6 - Напишите функцию, которая загрузит данные по первому фильму     *****/
/***** в котором встретилась планета Татуин, предоставленный API (https://swapi.dev)  *****/
// Мне показалось что для получения данных о планетах в фильмах не стоит каждый раз запрашивать
// данные по планете, если мы получим все фильмы и будем обходить их в цикле и получать данные по планетам.
// Для этого решения воспользуемся API сервера и получим ссылку на искомую планету и сами фильмы,
// а уже потом будем в массиве ссылок на планеты искать подходящий нам первый фильм.


// Общая функция получения ресурса
async function getResource(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`)
  }
  return await res.json();
}

const findingPlanet = 'Tatooine';

(async () => {
  try {
    const [planet, films] = await Promise.all([
      getResource(`https://swapi.dev/api/planets/?name=${findingPlanet}`),
      getResource('https://swapi.dev/api/films')
    ]);

    const planetURL = planet.results[0].url;
    const filmsRes = films.results;
    const findingFilms = () => {
      for (let i = 0; i <= filmsRes.length - 1; i++) {
        const planets = filmsRes[i].planets;
        if (planets.indexOf(planetURL) !== -1) {
          return filmsRes[i];
        }
      }
    }

    console.log(findingFilms());
  } catch (error) {
    console.error(error.message);
  }
})
();


/*****       Задание 7 - Напишите функцию, которая выведет название транспортного средства         *****/
/***** на котором впервые ехал Anakin Skywalker, используя предоставленный API (https://swapi.dev) *****/

const findingPeople = 'Anakin Skywalker';

(async () => {
  try {
    const connectionString = `https://swapi.dev/api/people/?search=${findingPeople}`;
    const answer = await getResource(connectionString)
      .then(response => response.results)
      .then(people => people[0].vehicles)
      .then(result => getResource(result[0]))
      .then(vehicle => vehicle.name);

    console.log(answer);
  } catch (error) {
    console.error(error.message);
  }
})();


/*****  Задание 8 - НаНапишите функцию которая посылает запрос на http://localhost:3000 POST /echo  *****/
/*****      со следующей полезной нагрузкой: { message: "Привет сервис, я жду от тебя ответа"}      *****/
/*****   Примите ответ от сервера и выведите результат в консоль, используя синтаксис async/await.  *****/
// сервер создан, его необходимо запустить - файл server.js в директории server

async function postData(url = '', data = {}) {

  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });

  return await res.json();
}

postData('http://localhost:3000/echo', {message: "Привет сервис, я жду от тебя ответа"})
  .then(res => console.log(res)
  );

