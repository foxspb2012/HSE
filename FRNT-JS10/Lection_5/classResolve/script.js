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

// Класс для состояния приложения
class State {
  constructor(pageSize) {
    this.currentPage = 1;
    this.pageSize = pageSize;
    this.data = {
      count: null,
      next: null,
      previous : null,
      planets : null,
    }
  }
}

// Класс для работы с сервером
class PlanetService {
  constructor(state) {
    this.state = state;
    this.baseUrl = 'https://swapi.dev/api/planets/?page=';
  }
  async swapi (url) {
    const response =  await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`)
    }

    return await response.json();
  }

   async getPlanets() {
    const url = `${this.baseUrl}${this.state.currentPage}`;
    this.state.data = await (this.swapi(url));
  }

  async getAllPlanets() {
    const allPlanets = [];
    let link = 'https://swapi.dev/api/planets/?page=1';

    while(link !== null){
      const {next, results} = await this.swapi(link);
      allPlanets.push(...results);
      link = next;
    }

    this.state.data.results = allPlanets;
  }
}

// Класс для работы с карточками планет
class PlanetComponent {
  constructor(state) {
    this.state = state;
  }

   render() {
    const cardsEl = document.querySelector('.cards');

    cardsEl.innerHTML = this.state.data.results.map(planet =>
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
  }
}

// Класс для работы с модальным окном
class ModalComponent {
  constructor(state, planetsService) {
    this.state = state;
    this.planetsService = planetsService;
  }

  getFilmTemplate = (filmRow) => {
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

  getCharacterTable = (characterRow) =>{
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

  async render() {
    const planet = this.state.planetInfo;
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
        const {episode_id, title, release_date, characters} = await this.planetsService.swapi(film);
        filmRow +=
          `<tr>
          <td>${episode_id}</td>
          <td>${title}</td>
          <td>${release_date}</td>
        </tr>`;

        for (const character of characters) {
          const {name, gender, birth_year, homeworld} = await this.planetsService.swapi(character);
          const homeworldDesc = await this.planetsService.swapi(homeworld);
          characterRow +=
          `<tr>
            <td>${name}</td>
            <td>${gender}</td>
            <td>${birth_year}</td>
            <td>${homeworldDesc.name}</td>
          </tr>`;
        }
      }

      filmTable = this.getFilmTemplate(filmRow);
      characterTable = this.getCharacterTable(characterRow);
    }

    modalBody.innerHTML = [cardHead, filmTable, characterTable].join('');
  }
}

// Класс для работы с пагинацией
class PaginatorComponent {
  constructor(state) {
    this.state = state;
  }

   render() {
    const {currentPage} = this.state;
    const {count, next, previous} = this.state.data;

    const paginationEl = document.querySelector('.pagination');

    const pageCount = Math.round(count / this.state.pageSize);
    const hasNext = Boolean(next);
    const hasPrevious = Boolean(previous);
    const link = 'https://swapi.dev/api/planets/?page=';

    let lis = '';
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
      lis +=
        `<li class="page-item ${currentPage === pageNumber ? 'active' : ''}">
          <a class="page-link" ${currentPage === pageNumber ? '' : `href=${link}${pageNumber}`}
            data-page=${pageNumber}>${pageNumber}</a>
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
  }
}

// Класс для работы с кнопкой "Показать ещё"
class LoadMoreComponent {
  constructor(state) {
    this.state = state;
  }

  render() {
    const loadMore = document.querySelector('.load-more');
    loadMore.innerHTML =
      `<input type="checkbox" class="btn-check" id="btncheck1" autoComplete="off">
       <label class="btn btn-outline-primary" for="btncheck1">Load more</label>`;
  }
}

// Основной класс приложения
class App {
  constructor(pageSize) {
    this.state = new State(pageSize);
    this.planetService = new PlanetService(this.state);
    this.planetComponent = new PlanetComponent(this.state);
    this.paginatorComponent = new PaginatorComponent(this.state);
    this.modalComponent = new ModalComponent(this.state, this.planetService);
    this.loadMoreComponent = new LoadMoreComponent(this.state);
    this.components = [this.planetComponent, this.paginatorComponent, this.loadMoreComponent];
  }

  // Обработчик изменения значения чекбокса
    handleLoadMore() {
    document.querySelector('.load-more input').addEventListener(
      'change',
      async evt => {
        const label = document.querySelector('.load-more label');
        label.classList.add("disabled");
        if (evt.target.checked) {
          await this.planetService.getAllPlanets();
          this.planetComponent.render();
          this.handleModal();
          document.querySelector('.pagination').innerHTML = '';
          document.querySelector('.paginator nav').classList.remove('m-right');
          label.textContent = 'Restore pages';
        } else {
          await this.bootstrap();
          document.querySelector('.paginator nav').classList.add('m-right');
          label.textContent = 'Show all';
        }
        label.classList.remove("disabled");
      }
    )
  }

  // Обработчик клика на кнопку в карточке для показа модального окна
   handleModal() {
    const card = document.querySelectorAll('.js-open-modal');

    card.forEach(card => card.addEventListener(
      'click',
      async evt => {
        evt.preventDefault();
        const link = evt.target.getAttribute('href');
        this.state.planetInfo = await this.planetService.swapi(link);
        await this.modalComponent.render();
      }
    ));
  }

  // Обработчик клика на элемент в пагинации
   handlePaginator() {
    document.querySelector('.pagination').addEventListener(
      'click',
      async evt => {
        evt.preventDefault();
        if (!evt.target.classList.contains('page-link')) {
          return;
        }
        this.state.currentPage =  Number(evt.target.getAttribute('data-page'));
        await this.bootstrap();
      }
    )
  }
  async bootstrap() {
    await this.planetService.getPlanets();
    this.components.forEach(item => item.render());
    this.handlePaginator();
    this.handleModal();
    this.handleLoadMore();
  }
}

const app = new App(pageSize);
app.bootstrap();
