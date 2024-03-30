const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture'); // Находим шаблон, и его содержимое записываем в переменную

const container = document.querySelector('.pictures'); // Находим в разметке элемент, который будем заполнять копиями шаблонов с данными

const createThumbnail = ({url, description, comments, likes, id}) => { // Создаем функцию отрисовки фотографии
  const thumbnail = thumbnailTemplate.cloneNode(true); // записываем в переменную копию содержимого шаблона

  thumbnail.querySelector('.picture__img').src = url; // Указываем адрес фотографии
  thumbnail.querySelector('.picture__img').alt = description; // описание фотографии
  thumbnail.querySelector('.picture__comments').textContent = comments.length; // количество комментариев
  thumbnail.querySelector('.picture__likes').textContent = likes; // количество лайков
  thumbnail.dataset.thumbnailId = id;

  return thumbnail; // возвращаем копию, заполненную данными
};

export const renderThumbnails = (pictures) => { // Создаем функцию, которая аргументом принимает функцию генерации массива с данными
  const fragment = document.createDocumentFragment(); // Создаем фрагмент (она же коробочка или контейнер для хранения данных)

  pictures.forEach((picture) => { // применяем метод forEach и перебираем массив сгенерированных данных (к каждому элементу массива применяем функцию callback)
    const thumbnail = createThumbnail(picture); // результат работы функции для каждомо элемента, записываем в переменную
    fragment.append(thumbnail); // и добавляем ее в фрагмент
  });
  container.append(fragment);
};


