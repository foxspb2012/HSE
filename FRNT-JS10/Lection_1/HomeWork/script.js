// Объявление вспомогательных переменных
const separator = '-----------------------------------------------------------------------------------';
const arrMessages = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 1 *****/
const arrSource_1 = ['Я короткая строка', 'Я вроде бы тоже короткая', 'А я длинная строка'];

const arrModified_1 = arrSource_1.filter((item) => (item.length < 20));

arrMessages.push(arrModified_1);
////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 2 *****/
const arrSource_2 = [
    {name: 'shark', likes: 'ocean'},
    {name: 'turtle', likes: 'pond'},
    {name: 'otter', likes: 'fish biscuits'},
]

const arrModified_2 = arrSource_2.map(item => `${item.name} likes ${item.likes}`);

arrMessages.push(arrModified_2);
////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 3 *****/
const obj1Source_3 = {name: 'Алиса'};
const obj2Source_3 = {age: 11};

const commonObjTask3 = {...obj1Source_3, ...obj2Source_3};

arrMessages.push(JSON.stringify(commonObjTask3));
////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 4 *****/
const arrSource_4 = [1, 2, 3, 4];

const arrModified_4 = Math.min(...arrSource_4);

arrMessages.push(arrModified_4);
////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 5 *****/
const arrSource_5 = [1, 2, 3, 4];

const arrModified_5 = arrSource_5
    .reduce((acc, item) => {
        item % 2 !== 0 ? acc.push(item) : '';
        return acc;
    }, []);

arrMessages.push(arrModified_5);
////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 6 *****/
const arrSource_6= [
    {price: 10, count: 2},
    {price: 100, count: 1},
    {price: 2, count: 5},
    {price: 15, count: 6},
];

const arrModified_6 = arrSource_6
    .reduce((acc, item) => acc + item.count * item.price, 0);

arrMessages.push(arrModified_6);
////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 7 *****/
const arrSource_7= [1, 2, 2, 4, 5, 5];

const arrModified_7 = arrSource_7
    .reduce((acc, item) => {
        acc.indexOf(item) === -1 ? acc.push(item) : '';
        return acc;
    }, []);

arrMessages.push(arrModified_7);
////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 8 *****/
const httpErrorsArray = [500, 401, 402, 403, 404]; // Массив ошибок

const getHttpErrorMessage = (httpError) => {
    switch (httpError) {
        case 500:
            return 'Ошибка сервера';
        case 401:
            return 'Ошибка авторизации';
        case 402:
            return 'Ошибка сервера';
        case 403:
            return 'Доступ запрещен';
        case 404:
            return 'Не найдено';
        default:
            return 'Описание ошибки не найдено';
    }
};
const idx = Math.floor(Math.random() * (httpErrorsArray.length) + 1); // Получение случайного индекса из массива
const httpError = httpErrorsArray[idx];

arrMessages.push(getHttpErrorMessage(httpError));
////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 9 *****/
const arrSource_9 = [4, 3, 2, 1];

const arrModified_9 = arrSource_9
    .sort()
    .slice(0, 2);

arrMessages.push(arrModified_9);
////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 10 *****/
const objSource_10 = {
    firstName: 'Петр',
    secondName: 'Васильев',
    patronymic: 'Иванович'
};

const values = Object.values(objSource_10);
const message = `ФИО: ${values[0]} ${values[2]} ${values[1]}`;
// Или так : const message = `ФИО: ${objSource_10.firstName} ${objSource_10.patronymic} ${objSource_10.secondName}`;

arrMessages.push(message);
////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 11 *****/
const arrSource_11 = [1, 2, 3, 4];
const multiplier = 5;

const arrModified_11= arrSource_11.map(item => item * multiplier);

arrMessages.push(arrModified_11);
////////////////////////////////////////////////////////////////////////////////////////////////////////

/***** Задание 12 *****/
const arrSource_12 = [
    {name: 'Batman', franchise: 'DC'},
    {name: 'Ironman', franchise: 'Marvel'},
    {name: 'Thor', franchise: 'Marvel'},
    {name: 'Superman', franchise: 'DC'}
];

const arrayFranchise = ['Marvel', 'DC'];
const filterValue = arrayFranchise[Math.floor(Math.random() * arrayFranchise.length)];  // Получение значения фильтра

const arrModified_12= arrSource_12
    .filter(item => item.franchise === filterValue)
    .map(item => item.name)
    .join(', ');

arrMessages.push(arrModified_12);
/////////////////////////////////////////////////////////////////////////////////////////////////

/***** Вывод сообщений по результатам обработок *****/
arrMessages.forEach((item, index) => console.log(`Задание: ${index + 1} \n ${item}\n${separator}`));
