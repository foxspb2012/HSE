'use strict';

// Константы
const pageSize = 10;

// Шаблоны разметки
const getCardTemplate = (planet) => {
  const {diameter, population, gravity, terrain, climate} = planet;

  return `
   <p class="card-text">
      <span>diameter:</span> ${diameter}
    </p>
    <p class="card-text">
      <span>population:</span> ${population}
    </p>
    <p class="card-text">
      <span>gravity:</span> ${gravity}
    </p>
    <p class="card-text">
      <span>terrain:</span> ${terrain}
    </p>
    <p class="card-text">
      <span>climate:</span> ${climate}
    </p>`;
}

const getFilmTemplate = (filmRow) => {
  return `
    <table>
      <colgroup span="3"></colgroup>
      <tbody>
      <tr>
        <th>Episode</th>
        <th>Title</th>
        <th>Release date</th>
      </tr>
      ${filmRow}
      </tbody>
    </table>`
}

const getCharacterTable = (characterRow) =>{
  return `
    <table>
      <colgroup span="4"></colgroup>
      <tbody>
      <tr>
        <th>Name</th>
        <th>Gender</th>
        <th>Birth date</th>
        <th>Homeworld</th>
      </tr>
      ${characterRow}
      </tbody>
    </table>`
}

// Функция для работы с сервером данных - https://swapi.dev
const swapi = async function (url) {
  const resource =  await fetch(url);

  if (!resource.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`)
  }

  return await resource.json();
}

// Функция отрисовки модального окна
async function renderPlanetInModal(planet) {
  let filmRow = '';
  let characterRow = '';
  let filmTable = '';
  let characterTable = '';

  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = 'Waiting information...';
  document.querySelector('.modal-title').innerHTML = `Planet ${planet.name}`;

  const cardHead = getCardTemplate(planet);

  if (planet.films.length > 0) {
    for (const film of planet.films) {
      const {episode_id, title, release_date, characters} = await swapi(film);
      filmRow +=
        `<tr>
          <td>${episode_id}</td>
          <td>${title}</td>
          <td>${release_date}</td>
        </tr>`;

      for (const character of characters) {
        const {name, gender, birth_year, homeworld} = await swapi(character);
        const homeworldDesc = await swapi(homeworld);
        characterRow +=
          `<tr>
            <td>${name}</td>
            <td>${gender}</td>
            <td>${birth_year}</td>
            <td>${homeworldDesc}</td>
          </tr>`;
      }
    }

    filmTable = getFilmTemplate(filmRow);
    characterTable = getCharacterTable(characterRow);
  }

  modalBody.innerHTML = [cardHead, filmTable, characterTable].join('');
}

// Обработчик клика на кнопку в карточке для показа модального окна
function handleModal() {
  const card = document.querySelectorAll('.js-open-modal');

  card.forEach(card => card.addEventListener(
    'click',
    async evt => {
      evt.preventDefault();
      const link = evt.target.getAttribute('href');
      const planet = await swapi(link);
      await renderPlanetInModal(planet);
    }
  ));
}

// Функция отрисовки карточек планет
 function renderPlanets(planets) {
  const cardsEl = document.querySelector('.cards');

  cardsEl.innerHTML = planets.map(planet =>
    `<div class="card"">
    <div class="card-body">
     <div class="card-wrapper">
      <h5 class="card-title">Planet ${planet.name}</h5>
      ${getCardTemplate(planet)}
     </div>
      <a href=${planet.url} class="btn btn-primary js-open-modal"
        data-bs-toggle="modal" data-bs-target="#exampleModal">Go to planet!
      </a>
    </div>
  </div>`).join('');
  handleModal();
}

// Обработчик изменения значения чекбокса
function handleShowAll() {
  document.querySelector('.show_all input').addEventListener(
    'change',
    async evt => {
      const label = document.querySelector('.show_all label');
      if (evt.target.checked) {
        await fillAllPage();
        document.querySelector('.pagination').innerHTML = '';
        document.querySelector('.paginator nav').classList.remove('m-right');
        label.textContent = 'Restore pages';
      } else {
        await fillPage();
        label.textContent = 'Show all';
        document.querySelector('.paginator nav').classList.add('m-right');
      }
    }
  )
}

// Функция отрисовки чекбокса
function renderShowAll() {
  const showAll = document.querySelector('.show_all');
  showAll.innerHTML = `<input type="checkbox" class="btn-check" id="btncheck1" autoComplete="off">
    <label class="btn btn-outline-primary" for="btncheck1">Show all</label>`;

  handleShowAll();
}

// Функция отрисовки всех карточек с планетами
async function fillAllPage() {
  const allPlanets = [];
  let link = 'https://swapi.dev/api/planets/?page=1';

  while (link !== null) {
    const {results, next} = await swapi(link);
    link = next;
    allPlanets.push(...results);
  }

  await renderPlanets(allPlanets);
}

// Обработчик клика на элемент в пагинации
function handlePaginator() {
  document.querySelector('.pagination').addEventListener(
    'click',
    async evt => {
      evt.preventDefault();
      if (!evt.target.classList.contains('page-link')) {
        return;
      }
      const pageNumber = Number(evt.target.getAttribute('data-page'));
      await fillPage(pageNumber);
    }
  )
}

// Функция отрисовки пагинации
function renderPaginator(count, next, previous, currentPage) {
  const paginationEl = document.querySelector('.pagination');

  const pageCount = Math.round(count / pageSize);
  const hasNext = Boolean(next);
  const hasPrevious = Boolean(previous);
  const link = 'https://swapi.dev/api/planets/?page=';

  let lis = '';
  for (let i = 1; i <= pageCount; i++) {
    lis +=
      `<li class="page-item ${currentPage === i ? 'active' : ''}">
          <a class="page-link" ${currentPage === i ? '' : `href=${link}${i}`}
            data-page=${i}>${i}</a>
      </li>`;
  }

  paginationEl.innerHTML =
    `<li class="page-item ${hasPrevious ? '' : 'disabled'}">
      <a class="page-link" ${hasPrevious ? `href=${previous}` : ''} data-page=${currentPage - 1}>Backward</a>
    </li>
    ${lis}
    <li class="page-item ${hasNext ? '' : 'disabled'}">
      <a class="page-link" ${hasNext ? `href=${next}` : ''} data-page=${currentPage + 1}>Forvard</a>
    </li>`;

   handlePaginator();
}

// Функция отрисовки страницы
async function fillPage(pageNumber = 1) {
  const {results, count, next, previous} = await swapi(`https://swapi.dev/api/planets/?page=${pageNumber}`);
  renderPlanets(results);
  renderPaginator(count, next, previous, pageNumber);
  renderShowAll();
  handleModal();
}

fillPage();
