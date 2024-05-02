const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let currentFilter = Filter.DEFAULT;
let pictures = [];

const imagesFiltersContainer = document.querySelector('.img-filters');

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (a, b) => b.comments.length - a.comments.length;

export const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setOnFilterClick = (cb) => {
  imagesFiltersContainer.addEventListener('click', (evt) => {
    const clickedButton = evt.target;

    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    if (clickedButton.id === currentFilter) {
      return;
    }

    imagesFiltersContainer.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;

    cb(getFilteredPictures());
  });
};

export const init = (loadedPictures, cb) => {
  imagesFiltersContainer.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(cb);
};
